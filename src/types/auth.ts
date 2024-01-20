import { UserType } from "./user";

export interface AuthType extends UserType {
  exp: number;
  iat: number;
}
