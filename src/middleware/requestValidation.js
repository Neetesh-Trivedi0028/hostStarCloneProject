const validateRequest = (validationSchema, dataToValidate = 'body') => {
  return (req, res, next) => {
    const { error } = validationSchema.validate(req[dataToValidate], {
      allowUnknown: true,
    });

    if (error) {
      console.info('Validation error:', error.details);
      const fieldKey = error.details[0].context?.key || 'Field';
      const translatedFieldName =
        req.__ && req.__(`FIELDS.${fieldKey}`) !== `FIELDS.${fieldKey}`
          ? req.__(`FIELDS.${fieldKey}`)
          : fieldKey;

      let errorMessage = error.details[0].message;
      if (error.details[0].type === 'any.required') {
        const templateMessage = req.__
          ? req.__('REQUIRED_FIELD')
          : 'The field "{field}" is required!';
        errorMessage = templateMessage.replace('{field}', translatedFieldName);
      } else {
        errorMessage =
          req.__ && req.__(errorMessage) !== errorMessage
            ? req.__(errorMessage)
            : errorMessage;
      }
      return res.status(400).send({
        success: 'fail',
        data: {},
        message: errorMessage,
      });
    }
    next();
  };
};

export default validateRequest;
