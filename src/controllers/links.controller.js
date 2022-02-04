import pool from "../database";

export const renderAddLink = (req, res) => {
  res.render("links/add");
};

export const addLink = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { title, type, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
    type,
    creator: req.user.fullname,
    user_id: req.user.id,
  };
  await pool.query("INSERT INTO links set ?", [newLink]);
  req.flash("success", "Sikeres hozzáadás");
  res.redirect("/links");
};

export const renderLinks = async (req, res) => {
  const { page } = req.params;
  const [rows] = await pool.query(`SELECT * FROM links`);
  res.render("links/list", { links: rows, paginate: {total: rows.length} });
};

export const redirectLinks = async (req, res) => {
  res.redirect("/links/1");
};

export const deleteLink = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID = ?", [id]);
  req.flash("success", "Sikeres törlés");
  res.redirect("/links");
};

export const renderEditLink = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  res.render("links/edit", { link: rows[0] });
};

export const editLink = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id } = req.params;
  const { title, description, url, type } = req.body;
  const newLink = {
    title,
    description,
    url,
    type,
  };
  await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
  req.flash("success", "Sikeres szerkesztés");
  res.redirect("/links");
};
