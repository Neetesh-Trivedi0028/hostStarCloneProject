import express from 'express';
import PermissionController from './permissionsController.js';
import ValidationSchema from './permissionsValidation.js';
import validateRequest from '../../middleware/requestValidation.js';
const router = express.Router();

router
  .route('/permission')
  .get(PermissionController.getCreatedData)
  .put(PermissionController.addPermissionAction)
  .post(
    validateRequest(ValidationSchema.permissionBody),
    PermissionController.createPermission
  );

export default router;

// router.post(
//   "/notes",
//   protectRoute,
//   validationfun(requirebody, "body"),
//   NotesController.createNotes
// );
