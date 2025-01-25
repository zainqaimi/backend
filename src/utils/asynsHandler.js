const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// ager try catch wala code rakhna chaho to wo bhi kr sakte hen
// const asyncHandler = (fn) => async (req ,res , next)=>{
//     try {
//         await fn(req, res, next);
//     } catch (err) {
//         req.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         });
//         next(err);
//     }
// }
