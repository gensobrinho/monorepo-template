import { Router } from 'express';
import type { IJwtAdapter } from '../../adapters/types.js';
import { createAuthenticateMiddleware } from '../../middleware/authenticate.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import type { DemoController } from './demo.controller.js';

export function createDemoRouter(
  demoController: DemoController,
  jwtAdapter: IJwtAdapter,
): Router {
  const router = Router();
  const authenticate = createAuthenticateMiddleware(jwtAdapter);

  router.use(authenticate);

  router.get(
    '/',
    asyncHandler(async (req) => demoController.getDemoItems(req)),
  );

  router.get(
    '/:id',
    asyncHandler(async (req) => demoController.getDemoItemById(req)),
  );

  router.post(
    '/',
    asyncHandler(async (req) => demoController.createDemoItem(req)),
  );

  router.put(
    '/:id',
    asyncHandler(async (req) => demoController.updateDemoItem(req)),
  );

  router.delete(
    '/:id',
    asyncHandler(async (req) => demoController.deleteDemoItem(req)),
  );

  return router;
}
