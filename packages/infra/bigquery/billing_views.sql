-- GCP Cost Monitoring Dashboard - BigQuery Views
-- Project: digital-africa-ai4su
-- Dataset: billing_management
--
-- Views created and tested via bq CLI
-- Prerequisites: Billing export configured to this dataset

--------------------------------------------------------------------------------
-- 1. vw_daily_cost_summary
-- Daily cost aggregation with running totals for trend analysis
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW `digital-africa-ai4su.billing_management.vw_daily_cost_summary` AS
WITH daily AS (
  SELECT
    DATE(usage_start_time) AS date,
    service.description AS service_name,
    SUM(cost) AS daily_cost,
    currency
  FROM `digital-africa-ai4su.billing_management.gcp_billing_export_v1_*`
  WHERE cost > 0
  GROUP BY date, service.description, currency
)
SELECT
  date,
  service_name,
  daily_cost,
  SUM(daily_cost) OVER (
    PARTITION BY service_name
    ORDER BY date
  ) AS cumulative_cost,
  currency
FROM daily
ORDER BY date DESC, daily_cost DESC;

--------------------------------------------------------------------------------
-- 2. vw_cost_by_service
-- Breakdown by GCP service (Cloud Run, Cloud Build, etc.)
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW `digital-africa-ai4su.billing_management.vw_cost_by_service` AS
SELECT
  service.description AS service_name,
  service.id AS service_id,
  sku.description AS sku_description,
  DATE_TRUNC(DATE(usage_start_time), MONTH) AS month,
  SUM(cost) AS total_cost,
  SUM(usage.amount) AS usage_amount,
  usage.unit AS usage_unit,
  currency
FROM `digital-africa-ai4su.billing_management.gcp_billing_export_v1_*`
WHERE cost > 0
GROUP BY
  service.description,
  service.id,
  sku.description,
  month,
  usage.unit,
  currency
ORDER BY month DESC, total_cost DESC;

--------------------------------------------------------------------------------
-- 3. vw_cloud_run_costs
-- Cloud Run specific costs with app identification via labels
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW `digital-africa-ai4su.billing_management.vw_cloud_run_costs` AS
SELECT
  DATE(usage_start_time) AS date,
  DATE_TRUNC(DATE(usage_start_time), MONTH) AS month,
  COALESCE(
    (SELECT value FROM UNNEST(labels) WHERE key = 'goog-resource-type'),
    'unknown'
  ) AS resource_type,
  COALESCE(
    (SELECT value FROM UNNEST(labels) WHERE key = 'run.googleapis.com/service_name'),
    project.name
  ) AS service_name,
  location.region AS region,
  sku.description AS cost_type,
  SUM(cost) AS cost,
  SUM(usage.amount) AS usage_amount,
  usage.unit AS usage_unit,
  currency
FROM `digital-africa-ai4su.billing_management.gcp_billing_export_v1_*`
WHERE
  service.description = 'Cloud Run'
  AND cost > 0
GROUP BY
  date, month, resource_type, service_name,
  region, sku.description, usage.unit, currency
ORDER BY date DESC, cost DESC;

--------------------------------------------------------------------------------
-- 4. vw_cloud_build_costs
-- Cloud Build costs for CI/CD monitoring
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW `digital-africa-ai4su.billing_management.vw_cloud_build_costs` AS
SELECT
  DATE(usage_start_time) AS date,
  DATE_TRUNC(DATE(usage_start_time), MONTH) AS month,
  sku.description AS build_type,
  SUM(cost) AS cost,
  SUM(usage.amount) AS build_minutes,
  usage.unit AS usage_unit,
  currency
FROM `digital-africa-ai4su.billing_management.gcp_billing_export_v1_*`
WHERE
  service.description = 'Cloud Build'
  AND cost > 0
GROUP BY date, month, sku.description, usage.unit, currency
ORDER BY date DESC, cost DESC;

--------------------------------------------------------------------------------
-- 5. vw_monthly_summary
-- High-level monthly summary with gross/net cost breakdown
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW `digital-africa-ai4su.billing_management.vw_monthly_summary` AS
SELECT
  DATE_TRUNC(DATE(usage_start_time), MONTH) AS month,
  service.description AS service_name,
  SUM(cost) AS gross_cost,
  SUM((SELECT SUM(c.amount) FROM UNNEST(credits) c)) AS credits,
  SUM(cost) + COALESCE(SUM((SELECT SUM(c.amount) FROM UNNEST(credits) c)), 0) AS net_cost,
  COUNT(DISTINCT DATE(usage_start_time)) AS active_days,
  currency
FROM `digital-africa-ai4su.billing_management.gcp_billing_export_v1_*`
WHERE cost > 0
GROUP BY month, service.description, currency
ORDER BY month DESC, net_cost DESC;

--------------------------------------------------------------------------------
-- 6. vw_cost_alerts
-- Anomaly detection for cost spikes (z-score based)
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW `digital-africa-ai4su.billing_management.vw_cost_alerts` AS
WITH daily_costs AS (
  SELECT
    DATE(usage_start_time) AS date,
    service.description AS service_name,
    SUM(cost) AS daily_cost
  FROM `digital-africa-ai4su.billing_management.gcp_billing_export_v1_*`
  WHERE cost > 0
  GROUP BY date, service.description
),
stats AS (
  SELECT
    service_name,
    AVG(daily_cost) AS avg_cost,
    STDDEV(daily_cost) AS stddev_cost
  FROM daily_costs
  WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  GROUP BY service_name
)
SELECT
  d.date,
  d.service_name,
  d.daily_cost,
  s.avg_cost AS avg_30d_cost,
  ROUND((d.daily_cost - s.avg_cost) / NULLIF(s.stddev_cost, 0), 2) AS z_score,
  CASE
    WHEN d.daily_cost > s.avg_cost + (2 * s.stddev_cost) THEN 'HIGH'
    WHEN d.daily_cost > s.avg_cost + s.stddev_cost THEN 'ELEVATED'
    ELSE 'NORMAL'
  END AS alert_level
FROM daily_costs d
JOIN stats s ON d.service_name = s.service_name
WHERE d.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
ORDER BY d.date DESC, alert_level DESC;

--------------------------------------------------------------------------------
-- 7. vw_free_tier_usage
-- Track free tier consumption with percentage used and status alerts
-- SKU patterns match actual GCP billing export names
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW `digital-africa-ai4su.billing_management.vw_free_tier_usage` AS
WITH monthly_usage AS (
  SELECT
    DATE_TRUNC(DATE(usage_start_time), MONTH) AS month,
    service.description AS service_name,
    sku.description AS sku_name,
    usage.unit AS usage_unit,
    SUM(usage.amount) AS total_usage,
    SUM(cost) AS gross_cost,
    SUM((SELECT SUM(c.amount) FROM UNNEST(credits) c)) AS credits_applied,
    SUM(cost) + COALESCE(SUM((SELECT SUM(c.amount) FROM UNNEST(credits) c)), 0) AS net_cost
  FROM `digital-africa-ai4su.billing_management.gcp_billing_export_v1_*`
  GROUP BY month, service.description, sku.description, usage.unit
),
free_tier_limits AS (
  -- Cloud Run free tier (monthly): 180,000 vCPU-sec, 360,000 GB-sec, 2M requests
  SELECT 'Cloud Run' AS service_name, 'Services CPU' AS sku_pattern, 180000.0 AS monthly_limit, 'seconds' AS limit_unit, 'vCPU-seconds' AS display_unit UNION ALL
  SELECT 'Cloud Run', 'Services Memory', 360000.0 * 1073741824.0, 'byte-seconds', 'GB-seconds' UNION ALL  -- 360K GB to bytes
  SELECT 'Cloud Run', 'Requests', 2000000.0, 'requests', 'requests' UNION ALL
  -- Cloud Build free tier (120 min/day = 7200 sec/day * 30 = 216000 sec/month)
  SELECT 'Cloud Build', 'E2 cpu utilization', 216000.0, 'seconds', 'minutes' UNION ALL
  -- Cloud Storage: 5GB-month (converted to byte-seconds)
  SELECT 'Cloud Storage', 'Standard Storage', 5.0 * 1073741824.0 * 86400.0 * 30.0, 'byte-seconds', 'GB-month'
)
SELECT
  u.month,
  u.service_name,
  u.sku_name,
  u.total_usage,
  u.usage_unit,
  f.monthly_limit,
  f.display_unit AS limit_unit,
  ROUND(SAFE_DIVIDE(u.total_usage, f.monthly_limit) * 100, 2) AS pct_of_free_tier,
  u.gross_cost,
  COALESCE(u.credits_applied, 0) AS credits_applied,
  u.net_cost,
  CASE
    WHEN SAFE_DIVIDE(u.total_usage, f.monthly_limit) > 0.9 THEN 'NEAR_LIMIT'
    WHEN SAFE_DIVIDE(u.total_usage, f.monthly_limit) > 0.75 THEN 'WARNING'
    ELSE 'OK'
  END AS free_tier_status
FROM monthly_usage u
LEFT JOIN free_tier_limits f
  ON u.service_name = f.service_name
  AND u.sku_name LIKE CONCAT('%', f.sku_pattern, '%')
  AND u.usage_unit = f.limit_unit
WHERE f.monthly_limit IS NOT NULL
ORDER BY u.month DESC, pct_of_free_tier DESC;

--------------------------------------------------------------------------------
-- 8. vw_cost_with_credits
-- Gross vs net cost breakdown showing free tier coverage
--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW `digital-africa-ai4su.billing_management.vw_cost_with_credits` AS
SELECT
  DATE_TRUNC(DATE(usage_start_time), MONTH) AS month,
  service.description AS service_name,
  SUM(cost) AS gross_cost,
  SUM((SELECT SUM(c.amount) FROM UNNEST(credits) c)) AS total_credits,
  SUM(cost) + COALESCE(SUM((SELECT SUM(c.amount) FROM UNNEST(credits) c)), 0) AS net_cost,
  ROUND(
    SAFE_DIVIDE(
      ABS(SUM((SELECT SUM(c.amount) FROM UNNEST(credits) c))),
      SUM(cost)
    ) * 100, 2
  ) AS pct_covered_by_free_tier,
  currency
FROM `digital-africa-ai4su.billing_management.gcp_billing_export_v1_*`
WHERE cost > 0
GROUP BY month, service.description, currency
ORDER BY month DESC, gross_cost DESC;

--------------------------------------------------------------------------------
-- Verification queries (uncomment and run to test)
--------------------------------------------------------------------------------
-- SELECT * FROM `digital-africa-ai4su.billing_management.vw_monthly_summary` LIMIT 10;
-- SELECT * FROM `digital-africa-ai4su.billing_management.vw_daily_cost_summary` LIMIT 10;
-- SELECT * FROM `digital-africa-ai4su.billing_management.vw_cost_by_service` LIMIT 10;
-- SELECT * FROM `digital-africa-ai4su.billing_management.vw_cloud_run_costs` LIMIT 10;
-- SELECT * FROM `digital-africa-ai4su.billing_management.vw_cloud_build_costs` LIMIT 10;
-- SELECT * FROM `digital-africa-ai4su.billing_management.vw_cost_alerts` LIMIT 10;
-- SELECT * FROM `digital-africa-ai4su.billing_management.vw_free_tier_usage` LIMIT 10;
-- SELECT * FROM `digital-africa-ai4su.billing_management.vw_cost_with_credits` LIMIT 10;
