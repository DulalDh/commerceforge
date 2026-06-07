import { AppError } from '../utils/AppError.js';

const DEFAULT_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const DEFAULT_MAX_FILE_SIZE = 2 * 1024 * 1024;

export const validateFileUpload = ({
  allowedMimeTypes = DEFAULT_ALLOWED_MIME_TYPES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE
} = {}) => (req, _res, next) => {
  const files = [
    ...(req.file ? [req.file] : []),
    ...(Array.isArray(req.files) ? req.files : []),
    ...(req.files && !Array.isArray(req.files) ? Object.values(req.files).flat() : [])
  ];

  for (const file of files) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return next(new AppError(`Unsupported file type: ${file.mimetype}`, 400));
    }

    if (file.size > maxFileSize) {
      return next(new AppError(`File is too large. Max size is ${maxFileSize} bytes`, 400));
    }
  }

  return next();
};
