import { Router } from 'express';
import type { IJwtAdapter } from '../../adapters/types.js';
import { createAuthenticateMiddleware } from '../../middleware/authenticate.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import type { UserController } from './user.controller.js';

export function createUserRouter(
  userController: UserController,
  jwtAdapter: IJwtAdapter,
): Router {
  const router = Router();
  const authenticate = createAuthenticateMiddleware(jwtAdapter);

  router.use(authenticate);

  router.get(
    '/',
    asyncHandler(async (req) => userController.getUsers(req)),
  );

  router.patch(
    '/me/password',
    asyncHandler(async (req) => userController.changePassword(req)),
  );

  router.get(
    '/:id',
    asyncHandler(async (req) => userController.getUserById(req)),
  );

  router.post(
    '/',
    asyncHandler(async (req) => userController.createUser(req)),
  );

  router.put(
    '/:id',
    asyncHandler(async (req) => userController.updateUser(req)),
  );

  router.delete(
    '/:id',
    asyncHandler(async (req) => userController.deleteUser(req)),
  );

  return router;
}
