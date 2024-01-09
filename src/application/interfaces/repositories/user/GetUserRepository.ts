export interface GetUserRepository {
  getUsers(params: GetUserRepository.Request): Promise<GetUserRepository.Response>;
}

export namespace GetUserRepository {
  export type Request = { page: number; paginationLimit: number };
  export type Response = { data: any; page: number; total: number; totalPages: number };
}
