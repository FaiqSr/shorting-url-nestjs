export class UserRegisterRequest {
  username: string;
  password: string;
  name: string;
}

export class UserResponse {
  username: string;
  name: string;
  token?: string;
}

export class UserLoginRequest {
  username: string;
  password: string;
}

export class UserUpdateRequest {
  username?: string;
  password?: string;
  name?: string;
}
