import { User } from "./user.model";

export interface AuthenticationResponse {
  user: User;
  access_token?: string;

}
