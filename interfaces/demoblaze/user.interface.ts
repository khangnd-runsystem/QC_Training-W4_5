/**
 * Interface for user credentials
 */
export interface User {
  username: string;
  password: string;
}

/**
 * Interface for users data structure
 */
export interface UsersData {
  validUser: User;
  invalidUser?: User;
}
