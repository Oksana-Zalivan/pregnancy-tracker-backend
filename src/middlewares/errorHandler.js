export const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    const errors = err.details.map((e) => e.message);

    return res.status(400).json({
      message: "Помилка валідації",
      errors,
    });
  }

  const status = err.status || 400;
  const message = err.message || "Щось пішло не так";

  res.status(status).json({
    message,
  });
};
