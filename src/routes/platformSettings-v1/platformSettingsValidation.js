import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

const requireId = Joi.object().keys({
  id: Joi.objectId().valid().required(),
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
  requirebody,
};
