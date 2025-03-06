import catchAsync from '../../utils/catchAsync.js';
import Dao from '../../dao/superAdminDao.js';

class SuperAdminController {
  getCreatedData = catchAsync(async (_req, res, _next) => {
    const getData = await Dao.getDataDao();
    res.status(200).json({
      status: 'success',
      message: res.__('API_RUN'),
      data: { getData },
    });
  });

  createData = catchAsync(async (req, res, _next) => {
    console.log('chekc req.body', req.body);
    const createData = await Dao.createAdminsDao(req.body);
    res.status(201).json({
      status: 'success',
      message: res.__('API_RUN'),
      data: { createData },
    });
  });
}

export default new SuperAdminController();

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
