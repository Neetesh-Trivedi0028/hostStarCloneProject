import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

const requireId = Joi.object().keys({
  id: Joi.objectId().valid().required(),
});

const requirebody = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required.',
    'string.empty': 'Name cannot be empty.',
  }),

  email: Joi.string().trim().email().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Invalid email format.',
    'string.empty': 'Email cannot be empty.',
  }),

  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must not exceed 32 characters.',
      'string.pattern.base':
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      'any.required': 'Password is required.',
    }),

  role: Joi.string()
    .valid('superadmin', 'admin', 'moderator')
    .required()
    .messages({
      'any.required': 'Role is required.',
      'any.only': 'Role must be one of [superadmin, admin, moderator].',
    }),

  permissions: Joi.array()
    .items(
      Joi.object({
        module: Joi.string().trim().required().messages({
          'any.required': 'Module name is required.',
          'string.empty': 'Module name cannot be empty.',
        }),

        actions: Joi.array()
          .items(
            Joi.string().trim().valid('full_access', 'read', 'write', 'delete')
          )
          .min(1)
          .required()
          .messages({
            'any.required': 'Actions array is required.',
            'array.min': 'At least one action is required.',
            'string.empty': 'Action cannot be empty.',
            'any.only':
              'Invalid action. Allowed values: full_access, read, write, delete.',
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      'any.required': 'Permissions array is required.',
      'array.min': 'At least one permission module is required.',
    }),
});
export default {
  requireId,
  requirebody,
};
