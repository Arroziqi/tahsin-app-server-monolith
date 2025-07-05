import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from '../models/userModel';
import { Validation } from '../common/type/validation';
import { UserSchemaValidation } from '../schemas/userSchemaValidation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { hashPassword, verifyPassword } from '../common/provider/hash';
import { generateToken } from '../common/provider/generateToken';
import { User } from '@prisma/client';

export class UserService {
  static async register(req: CreateUserRequest): Promise<UserResponse> {
    const validRequest = Validation.validate(
      UserSchemaValidation.REGISTER,
      req,
    );

    const totalUserWithSameUsername = await dbClient.user.count({
      where: {
        username: validRequest.username,
      },
    });

    if (totalUserWithSameUsername !== 0) {
      throw new BadRequest('username already taken');
    }

    validRequest.password = await hashPassword(validRequest.password);

    const data = await dbClient.user.create({
      data: validRequest,
    });

    return toUserResponse(data);
  }

  static async login(req: LoginUserRequest): Promise<UserResponse> {
    const validRequest = Validation.validate(UserSchemaValidation.LOGIN, req);

    let existingUser = await dbClient.user.findFirst({
      where: {
        username: validRequest.username,
      },
    });

    if (!existingUser) {
      throw new BadRequest('user not found');
    }

    if (!(await verifyPassword(validRequest.password, existingUser.password))) {
      throw new BadRequest('invalid credentials');
    }

    existingUser = await dbClient.user.update({
      where: {
        username: validRequest.username,
      },
      data: {
        token: generateToken(),
      },
    });

    const response = toUserResponse(existingUser);
    response.token = existingUser.token!;
    return response;
  }

  static async update(
    user: User,
    req: UpdateUserRequest,
  ): Promise<UserResponse> {
    const validRequest: UpdateUserRequest = Validation.validate(
      UserSchemaValidation.UPDATE,
      req,
    );

    if (validRequest.username) {
      user.username = validRequest.username;
    }

    if (validRequest.password) {
      user.password = await hashPassword(validRequest.password);
    }

    const result = await dbClient.user.update({
      where: {
        email: user.email,
      },
      data: user,
    });

    return toUserResponse(result);
  }

  static async logout(user: User): Promise<string> {
    await dbClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return 'OK';
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async getAll(): Promise<UserResponse[]> {
    const users: User[] = await dbClient.user.findMany();

    return users.map((user: User): UserResponse => toUserResponse(user));
  }

  static async create(
    user: User,
    req: CreateUserRequest,
  ): Promise<UserResponse> {
    const validRequest: CreateUserRequest = Validation.validate(
      UserSchemaValidation.REGISTER,
      req,
    );

    const totalUserWithSameUsername: number = await dbClient.user.count({
      where: {
        username: validRequest.username,
      },
    });

    if (totalUserWithSameUsername !== 0) {
      throw new BadRequest('username already taken');
    }

    validRequest.password = await hashPassword(validRequest.password);

    const data = await dbClient.user.create({
      data: { ...validRequest, createdBy: user.id },
    });

    return toUserResponse(data);
  }
}
