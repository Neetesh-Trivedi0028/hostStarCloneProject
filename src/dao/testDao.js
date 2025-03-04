import AppError from '../utils/appError.js';
import { model } from '../../common/models/index.js';
const { Test } = model;

const createDataDao = async (data, _next) => {
  try {
    const createdRecord = await Test.create(data);
    return createdRecord;
  } catch (error) {
    console.error('Database Error in createDataDao:', error.message);
    throw new AppError('SOMETHING_WORNG', 500);
  }
};

const getDataDao = async (_next) => {
  try {
    const getRecord = await Test.find();
    return getRecord;
  } catch (error) {
    console.error('Database Error in getDataDao:', error.message);
    throw new AppError('SOMETHING_WORNG', 500);
  }
};

export default {
  createDataDao,
  getDataDao,
};
