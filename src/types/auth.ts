import { User } from "firebase/auth";

export interface AuthState {
  currentUser: User | null;
}

export interface LoginAction {
  type: "LOGIN";
}

export interface LogoutAction {
  type: "LOGOUT";
}

export interface SetCurrentUserAction {
  type: "SET_CURRENT_USER";
  payload: User | unknown;
}
