import express from 'express';
import validateRequest from '../../maddwares/validRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validtion';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
