export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  firstname: string;
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  role: string;
  token: string;
}

