export interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}

export function success<T>(message: string, data: T): SuccessResponse<T> {
  return { success: true, message, data };
}

export function error(message: string, errors?: unknown): ErrorResponse {
  return { success: false, message, errors };
}
