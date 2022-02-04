export const renderIndex = (req, res) => {
  res.render("index", {loggedin: req.isAuthenticated()});
};
