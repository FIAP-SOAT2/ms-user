export interface GetUserByFiltersRepository {
  getUserByFilters(queryString: GetUserByFiltersRepository.Request);
}
export namespace GetUserByFiltersRepository {
  export type Request = { email?: string; cpf?: string };
}
