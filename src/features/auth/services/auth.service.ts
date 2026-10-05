import bcrypt from "bcrypt";
import { signToken } from "../../../utils/jwt";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.types";
import { userRepository } from "../repositories/user.repository";
import { logger } from "../../../utils/logger";

const SALT_ROUNDS = 10;

export class AuthService {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const existingUsername = await userRepository.findByUsername(data.username);
    if (existingUsername) {
      throw new Error("Username sudah digunakan");
    }

    const existingEmail = await userRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error("Email sudah digunakan");
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const now = new Date().toISOString();
    const user = await userRepository.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      displayName: data.displayName || data.username,
      createdAt: now,
      updatedAt: now,
    });

    logger.info("User registered", { uid: user.uid, username: user.username });

    return {
      uid: user.uid,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
    };
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Email atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email atau password salah");
    }

    const token = signToken({ username: user.username });
    return { token, username: user.username };
  }
}
