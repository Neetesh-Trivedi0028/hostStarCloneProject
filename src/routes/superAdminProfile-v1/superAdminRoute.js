import express from 'express';
import SuperAdminController from './superAdminController.js';
import ValidationSchema from './superAdminValidation.js';
import validateRequest from '../../middleware/requestValidation.js';
const router = express.Router();

router
  .route('/add')
  .get(SuperAdminController.getCreatedData)
  .post(
    validateRequest(ValidationSchema.requirebody),
    SuperAdminController.createData
  );

export default router;

// router.post(
//   "/notes",
//   protectRoute,
//   validationfun(requirebody, "body"),
//   NotesController.createNotes
// );
