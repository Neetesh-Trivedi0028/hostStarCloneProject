import AppError from '../utils/appError.js';
import { model } from '../../common/models/index.js';
const { Permission } = model;

const createPermissionDao = async (data, _next) => {
  try {
    const createdRecord = await Permission.create(data);
    return createdRecord;
  } catch (error) {
    console.error('Database Error in createDataDao:', error.message);
    throw new AppError('SOMETHING_WORNG', 500);
  }
};

const createNewActionInManagerDao = async (data, _next) => {
  try {
    const { slug, action } = data;
    const addActionRecord = await Permission.updateOne(
      {
        slug,
      },
      {
        $push: {
          action,
        },
      }
    );
    return addActionRecord;
  } catch (error) {
    console.error('Database Error in createDataDao:', error.message);
    throw new AppError('SOMETHING_WORNG', 500);
  }
};

const getPermissionDao = async (_next) => {
  try {
    const getRecord = await Permission.find();
    return getRecord;
  } catch (error) {
    console.error('Database Error in getDataDao:', error.message);
    throw new AppError('SOMETHING_WORNG', 500);
  }
};

export default {
  createPermissionDao,
  createNewActionInManagerDao,
  getPermissionDao,
};
