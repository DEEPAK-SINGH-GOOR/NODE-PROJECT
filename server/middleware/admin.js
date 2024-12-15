const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
      next();
    } else {
      res.status(403).send({ message: "Access denied: Not an admin" });
    }
  };
  
  const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === "SUPERADMIN") {
      next();
    } else {
      res.status(403).send({ message: "Access denied: Not a super admin" });
    }
  };
  
  module.exports = { isAdmin, isSuperAdmin };
  