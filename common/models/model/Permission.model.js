import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g., "User Manager"
    slug: { type: String, required: true, unique: true }, // e.g., "user_manager"
    action: [
      {
        name: { type: String, required: true }, // create, edit, view, delete, banded,
        slug: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Permission = mongoose.model('Permission', PermissionSchema);

/*
function checkPermission(requiredPermission) {
  return async (req, res, next) => {
    const admin = await Admin.findById(req.user.id).populate('permissions');

    if (admin.role === 'Super Admin') {
      return next();
    }

    const hasPermission = admin.permissions.some((perm) =>
      perm.actions.some((action) => action.slug === requiredPermission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    next();
  };
}


*/
