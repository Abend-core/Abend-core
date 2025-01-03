module.exports = (req, res, next) => {
  const role = req.headers.role;

  if (role != 0) {
    return res.status(401).json({
      message:
        "L'utilisateur n'est pas administrateur, donc il n'est pas autorisé à accéder à cette ressource.",
    });
  } else {
    next();
  }
};
