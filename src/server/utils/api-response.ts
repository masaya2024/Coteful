import type {
  ApiItemResponse,
  ApiListResponse,
  ApiMutationResponse,
  ApiResponseMeta,
} from '../../types'

export function createMeta(
  filters?: Record<string, string | number | boolean | undefined>,
): ApiResponseMeta {
  return {
    timestamp: new Date().toISOString(),
    version: 'v1',
    filters,
  }
}

export function toListResponse<T>(
  items: T[],
  filters?: Record<string, string | number | boolean | undefined>,
): ApiListResponse<T> {
  return {
    items,
    total: items.length,
    meta: createMeta(filters),
  }
}

export function toItemResponse<T>(
  item: T,
  filters?: Record<string, string | number | boolean | undefined>,
): ApiItemResponse<T> {
  return {
    item,
    meta: createMeta(filters),
  }
}

export function toMutationResponse<T>(
  item: T,
  message: string,
): ApiMutationResponse<T> {
  return {
    item,
    message,
    meta: createMeta(),
  }
}
