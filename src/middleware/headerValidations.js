import Joi from 'joi';
import i18n from '../../common/languages/index.js';
import { enums } from '../../common/models/index.js';
import validateRequest from './requestValidation.js';
// import { DeviceType } from '../../common/models/enums/index.js';
const { Platform, DeviceType } = enums;
const supportedLocales = i18n.getLocales();
const headerValidations = Joi.object({
  'accept-language': Joi.string()
    .valid(...supportedLocales)
    .required(),
  'x-myapp-platform': Joi.string()
    .valid(...Object.values(Platform))
    .required(),
  'x-myapp-device-type': Joi.string()
    .valid(...Object.values(DeviceType))
    .required(),
  'x-myapp-version': Joi.string()
    .regex(/^[\d]+\.[\d]+\.[\d]+$/, 'Semantic Version')
    .required(),
}).required();

const headerValidationMiddleware = validateRequest(
  headerValidations,
  'headers'
);

export default headerValidationMiddleware;
