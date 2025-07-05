import { Role, User } from '@prisma/client';

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  token?: string;
  role: Role;
};

export type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
  password: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
