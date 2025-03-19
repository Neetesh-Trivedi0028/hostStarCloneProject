import express from 'express';
import PlatformSettingsController from './platformSettingsController.js';
import ValidationSchema from './platformSettingsValidation.js';
import validateRequest from '../../middleware/requestValidation.js';
const router = express.Router();

router
  .route('/test')
  .get(PlatformSettingsController.getCreatedData)
  .post(
    validateRequest(ValidationSchema.requirebody),
    PlatformSettingsController.createData
  );

export default router;

// router.post(
//   "/notes",
//   protectRoute,
//   validationfun(requirebody, "body"),
//   NotesController.createNotes
// );
