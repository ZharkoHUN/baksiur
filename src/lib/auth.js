
export const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated())
  if (req.isAuthenticated())
  {
    return next();
  }
  res.redirect("/signin");
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated())
  {
    if(req.user.admin == 1) return next();
    else return res.redirect("/");
  } else return res.redirect("/");
};

export const isAdminUser = (req, res, next) => {
  if (req.isAuthenticated())
  {
    if(req.user.admin == 1) return true;
    else return false;
  } else return false;
};

