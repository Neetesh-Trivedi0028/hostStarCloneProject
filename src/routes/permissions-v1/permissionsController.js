import catchAsync from '../../utils/catchAsync.js';
import Dao from '../../dao/permissionDao.js';

class PermissionController {
  getCreatedData = catchAsync(async (_req, res, _next) => {
    const getData = await Dao.getPermissionDao();
    res.status(200).json({
      status: 'success',
      message: res.__('API_RUN'),
      data: { getData },
    });
  });

  createPermission = catchAsync(async (req, res, _next) => {
    const permissionCreated = await Dao.createPermissionDao(req.body);
    console.info('req.body', req.body);
    res.status(201).json({
      status: 'success',
      message: res.__('API_RUN'),
      data: { permissionCreated },
    });
  });

  addPermissionAction = catchAsync(async (req, res, _next) => {
    const permissionCreated = await Dao.createNewActionInManagerDao(req.body);
    console.info('req.body', req.body);
    res.status(201).json({
      status: 'success',
      message: res.__('API_RUN'),
      data: { permissionCreated },
    });
  });
}

export default new PermissionController();

// for reference

// const getCreatedData = catchAsync(async (_req, res, _next) => {
//   const getData = await Dao.getDataDao();
//   res.status(200).json({
//     status: 'success',
//     message: res.__('API_RUN'),
//     data: {
//       getData,
//     },
//   });
// });

// const createData = catchAsync(async (req, res, _next) => {
//   const createData = await Dao.createDataDao(req.body);
//   res.status(201).json({
//     status: 'success',
//     message: res.__('API_RUN'),
//     data: { createData },
//   });
// });

// export default {
//   getCreatedData,
//   createData,
// };
