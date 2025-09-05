export interface ApiError { message: string; status?: number }
export interface ApiResponse<T> { success?: boolean; data?: T }
export type Paginated<T> = { items: T[]; total: number; page: number; pageSize: number }
