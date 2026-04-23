export const getCurrentUserController = (req, res) => {
  res.json({
    message: "Поточний користувач успішно отриманий",
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};
