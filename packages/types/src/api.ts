/**
 * API-related types
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

export interface AsyncJobResponse {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  estimatedCompletion?: string;
}

export interface JobStatusResponse extends AsyncJobResponse {
  result?: unknown;
  error?: string;
  progress?: number;
}
