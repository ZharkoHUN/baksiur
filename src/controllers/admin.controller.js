import pool from "../database";
import * as helpers from "../lib/helpers";

export const renderAddLink = (req, res) => {
  res.render("admin/add");
};

export const addLink = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { fullname, username, phone, contact, email, webpage, password } = req.body;
  const newLink = {
    fullname,
    username,
    phone: phone || "Nincs megadva",
    contact: contact || "Nincs megadva",
    email: email || "Nincs megadva",
    webpage: webpage || "Nincs megadva",
    password: await helpers.encryptPassword(password),
  };
  await pool.query("INSERT INTO users set ?", [newLink]);
  req.flash("success", "Sikeres hozzáadás");
  res.redirect("/admin");
};

export const renderLinks = async (req, res) => {
  const { page } = req.params;

  const [rows] = await pool.query(`SELECT * FROM users`);
  res.render("admin/list", { users: rows, paginate: {total: rows.length} });
};


export const redirectLinks = async (req, res) => {
  res.redirect("/admin/1");
};

export const deleteLink = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE ID = ?", [id]);
  req.flash("success", "Sikeres törlés");
  res.redirect("/admin");
};

export const renderEditLink = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  res.render("admin/edit", { admin: rows[0] });
};

export const editLink = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id } = req.params;
  const { username, fullname, phone, contact, admin, email, webpage } = req.body;
  const newLink = {
    username,
    fullname,
    phone,
    contact,
    email,
    webpage,
    admin: (admin == "on") ? 1 : 0,
  };
  await pool.query("UPDATE users set ? WHERE id = ?", [newLink, id]);
  req.flash("success", "Sikeres szerkesztés");
  res.redirect("/admin");
};
