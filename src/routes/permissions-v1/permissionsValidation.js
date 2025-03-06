import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

const requireId = Joi.object().keys({
  id: Joi.objectId().valid().required(),
});
const permissionBody = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required.',
  }),

  slug: Joi.string()
    .trim()
    .regex(/^[a-z0-9_]+$/) // Slug format: lowercase, numbers, underscores
    .required()
    .messages({
      'string.empty': 'Slug is required.',
      'string.pattern.base':
        'Slug can only contain lowercase letters, numbers, and underscores.',
    }),

  action: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required().messages({
          'string.empty': 'Action name is required.',
        }),

        slug: Joi.string()
          .trim()
          .regex(/^[a-z0-9_]+$/)
          .required()
          .messages({
            'string.empty': 'Action slug is required.',
            'string.pattern.base':
              'Action slug can only contain lowercase letters, numbers, and underscores.',
          }),
      })
    )
    .min(1) // At least one action is required
    .required()
    .messages({
      'array.min': 'At least one action is required.',
      'array.base': 'Action must be an array of objects.',
    }),
});
const requirebody = Joi.object({
  username: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'))
    .optional()
    .allow('')
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must not exceed 32 characters.',
      'string.pattern.base':
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
});

export default {
  requireId,
  permissionBody,
  requirebody,
};
