import express from 'express';
import TestController from './testController.js';
import ValidationSchema from './testValidation.js';
import validateRequest from '../../middleware/requestValidation.js';
const router = express.Router();

router
  .route('/test')
  .get(TestController.getCreatedData)
  .post(
    validateRequest(ValidationSchema.requirebody),
    TestController.createData
  );

export default router;

// router.post(
//   "/notes",
//   protectRoute,
//   validationfun(requirebody, "body"),
//   NotesController.createNotes
// );
