/**
 * Common types used across all applications
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}
