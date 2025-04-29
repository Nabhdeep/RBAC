export const successResponse = (status, data, res) => {
    return res.status(status).json(data);
  };
  
export const errorResponse = (status, message, res) => {
  return res.status(status).json({
    success: false,
    error: message,
  });
};