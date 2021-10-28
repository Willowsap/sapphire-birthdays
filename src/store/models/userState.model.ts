export interface UserState {
  user: {
    token: string;
    signedIn: boolean;
    email: string;
  };
}
