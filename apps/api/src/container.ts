import { env } from './config/env.js';
import { BcryptHashAdapter, JwtAdapter, createPrismaClient } from './adapters/index.js';
import { AuthRepository } from './features/auth/auth.repository.js';
import { AuthService } from './features/auth/auth.service.js';
import { AuthController } from './features/auth/auth.controller.js';
import { UserRepository } from './features/users/user.repository.js';
import { UserService } from './features/users/user.service.js';
import { UserController } from './features/users/user.controller.js';
import { DemoRepository } from './features/demo/demo.repository.js';
import { DemoService } from './features/demo/demo.service.js';
import { DemoController } from './features/demo/demo.controller.js';

export type AppContainer = ReturnType<typeof createContainer>;

export function createContainer() {
  const prisma = createPrismaClient();
  const hashAdapter = new BcryptHashAdapter(env.bcryptSaltRounds);
  const jwtAdapter = new JwtAdapter(env.jwtSecret, env.jwtExpiresIn);

  const authRepository = new AuthRepository(prisma);
  const userRepository = new UserRepository(prisma);
  const demoRepository = new DemoRepository(prisma);

  const authService = new AuthService(authRepository, hashAdapter, jwtAdapter);
  const userService = new UserService(userRepository, hashAdapter);
  const demoService = new DemoService(demoRepository);

  const authController = new AuthController(authService);
  const userController = new UserController(userService);
  const demoController = new DemoController(demoService);

  return {
    prisma,
    hashAdapter,
    jwtAdapter,
    authController,
    userController,
    demoController,
  };
}
