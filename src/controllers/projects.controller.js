import pool from "../database";
import * as helpers from "../lib/helpers";
import { isAdminUser } from "../lib/auth";
import fs, { appendFile } from "fs";

export const renderAddProject = (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  res.render("projects/add");
};

export const downloadFile = async (req, res) => {
  const file = `${__dirname}/../../uploads/project_${req.params.id}/${req.params.name}`;
  res.download(file); 
};

export const deleteFile = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const file = `${__dirname}/../../uploads/project_${req.params.id}/${req.params.name}`;
  fs.unlink(file, (err) => {
    if (err) {
      console.error(err)
      return;
    }
    req.flash("success", "Sikeres törlés: "+req.params.name);
    return res.redirect("/projects/show/"+req.params.id+"#project-csatolmanyok");
  })
};

export const deleteImage = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const file = `${__dirname}/../../uploads/project_${req.params.id}/img/${req.params.name}`;
  fs.unlink(file, (err) => {
    if (err) {
      console.error(err)
      return;
    }
    req.flash("success", "Sikeres törlés: "+req.params.name);
    return res.redirect("/projects/show/"+req.params.id+"#project-kepek");
  })
};



export const renderProject = async (req, res) => {
  const testFolder = './uploads/project_'+req.params.id;
  let folderArray = [];
  fs.readdir(testFolder, (err, files) => {
    if(files)
    {
      files.forEach(file => {
        var re = /(?:\.([^.]+))?$/;
        var xt = re.exec(file)[1]; 
        if(xt !== undefined) folderArray.push({file: file, ext: xt})
      });
    }
  });

  let imageArray = [];
  fs.readdir(testFolder+'/img', (err, files) => {
    if(files)
    {
      files.forEach(file => {
        let dir = `/../../uploads/project_${req.params.id}/img/${file}`
        imageArray.push({file:file, dir: dir})
      });
    }
  });

  const { id } = req.params;
  const [rows] = await pool.query(`SELECT * FROM projects WHERE id = ?`, [id]);
  const [staterows] = await pool.query(`SELECT * FROM states WHERE project_id = ? ORDER BY id DESC`, [id]);
  for(let i = 0; i < staterows.length; i++)
  {
    staterows[i].fullname = await getFullnameFromID(staterows[i].creator)
  }
  if(rows[0].finished == 1)
  {
    rows[0].color = "#2c2c2c";
    rows[0].statusz = "Befejezett"
  }
  else{
    [rows[0].color, rows[0].statusz] = checkDateColors(rows[0].expire);
  }
  let sendStates = (staterows.length > 0) ? staterows : "nincs";
  res.render("projects/show", { 
    project: rows[0], 
    admin: req.user.admin, 
    state:sendStates, 
    folder: (folderArray.length > 0) ? folderArray : "nincs",
    imagefolder: (imageArray.length > 0) ? imageArray : "nincs",
  });
};

function formatLines(str)
{
  let lines = str.split("\r\n");
  return JSON.stringify(lines);
}

export const getFullnameFromID = async (id) => {

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  if(rows.length > 0)
  {
    return rows[0].fullname;
  }
}

import path from 'path'
import files from 'express-fileupload'

export function createDir (req, res, next) { // This is just for my Controller same as app.post(url, function(req,res,next) {....
  if(req.user.admin == 0) { return res.redirect('/')}
  const uploadDir = path.join(__dirname, '../../uploads/project_'+req.params.id+'/')
  if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    req.flash("success", "Nincsenek kiválasztva fájlok!");
    return res.redirect("/projects/show/"+req.params.id+"#project-csatolmanyok");
  }
  let names = [];
  
  sampleFile = req.files.filer;
  let keys = Object.keys(sampleFile);
  if(typeof sampleFile.name === "undefined")
  {
    for (let i = 0; i < keys.length; i++) {
      
      let val = sampleFile[keys[i]];
        uploadPath = uploadDir + val.name;
        val.mv(uploadPath, function(err) {
        

        });
        names.push(val.name);
    }
  } else 
  {
    uploadPath = uploadDir + sampleFile.name;
    sampleFile.mv(uploadPath, function(err) {
    

    });
    names.push(sampleFile.name);
  }
  let strer = JSON.stringify(names);
  names = strer;
  names = names.replaceAll('"', '');
  names = names.replaceAll('[', '')
  names = names.replaceAll(']', '')
  names = names.replaceAll(',', ', ')
  req.flash("success", "Sikeres hozzáadás: "+names);
  return res.redirect("/projects/show/"+req.params.id+"#project-csatolmanyok");
}

const request = require('request');

export function uploadImages (req, res, next) { // This is just for my Controller same as app.post(url, function(req,res,next) {....
  if(req.user.admin == 0) { return res.redirect('/')}
  const uploadDir = path.join(__dirname, '../../uploads/project_'+req.params.id+'/img/')
  if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    req.flash("success", "Nincsenek kiválasztva képek!");
    return res.redirect("/projects/show/"+req.params.id+"#project-kepek");
  }
  let names = [];
  
  sampleFile = req.files.filer;
  let keys = Object.keys(sampleFile);
  if(typeof sampleFile.name === "undefined")
  {
    for (let i = 0; i < keys.length; i++) {
      
      let val = sampleFile[keys[i]];
        uploadPath = uploadDir + val.name;
        val.mv(uploadPath, function(err) {
        

        });
        names.push(val.name);
    }
  } else 
  {
    uploadPath = uploadDir + sampleFile.name;
    sampleFile.mv(uploadPath, function(err) {
    

    });
    names.push(sampleFile.name);
  }
  let strer = JSON.stringify(names);
  names = strer;
  names = names.replaceAll('"', '');
  names = names.replaceAll('[', '')
  names = names.replaceAll(']', '')
  names = names.replaceAll(',', ', ')

  req.flash("success", "Sikeres feltöltés: "+names);
  return res.redirect("/projects/show/"+req.params.id+"#project-kepek");
}

export const addProject = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { name, contact, description, expire, reward } = req.body;
  const newProject = {
    name: name || "Nincs megadva",
    contact: contact || "Nincs megadva",
    description: description || "Nincs megadva",
    expire: expire || "Nincs megadva",
    reward: reward || "Nincs megadva",
    owners: "[]",
  };
  await pool.query("INSERT INTO projects set ?", [newProject]);
  req.flash("success", "Sikeres hozzáadás");
  res.redirect("/projects");
};

export const addState = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id } = req.params;
  const { state } = req.body;
  const newState = {
    project_id: id,
    state,
    creator: req.user.id,
  };

  await pool.query("INSERT INTO states set ?", [newState]);
  req.flash("success", "Sikeres hozzáadás");
  res.redirect("/projects/show/"+id+"#project-statusz");
};

function checkDateColors(date)
{
  if(date > Date.now())
  {
    if(date-Date.now() < (60*1000)*60*24*10)
    {
      return ["#744b0e", "10 napon belül lejár"];
    }
    return ["#365733", "Aktív"];
  }
  else{
    return ["#751212", "LEJÁRT HATÁRIDŐ"];
  }
}



export const renderProjects = async (req, res) => {
  const { page } = req.params;
  let rows;
  if(req.user.admin == 1) 
  { 
    [rows] = await pool.query(`SELECT * FROM projects`); 
  }
  else 
  {
    [rows] = await pool.query(`SELECT * from projects WHERE JSON_CONTAINS(owners, ?, '$')`, [req.user.id]);
  }
  if(rows.length > 0)
  {
    for(let i = 0; i < rows.length; i++)
    {
      if(rows[i].finished == 1)
      {
        rows[i].color = "#2c2c2c";
        rows[i].statusz = "Befejezett"
      }
      else{
        [rows[i].color, rows[i].statusz] = checkDateColors(rows[i].expire);
      }
    }
  } 
  res.render("projects/list", { project: rows, paginate: {total: rows.length}, isadmin: req.user.admin });
};

export const redirectProjects = async (req, res) => {
  res.redirect("/projects/1");
};

export const deleteState = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { projectid, id } = req.params;
  
  await pool.query("DELETE FROM states WHERE id = ?", [id]);
  req.flash("success", "Sikeres törlés");
  return res.redirect("/projects/show/"+projectid+"#project-statusz");
};

export const deleteProject = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id } = req.params;
  await pool.query("DELETE FROM projects WHERE ID = ?", [id]);
  req.flash("success", "Sikeres törlés");
  res.redirect("/projects/show");
};

export const renderEditProject = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
  let [users] = await pool.query("SELECT * FROM users");
  for(let i = 0; i < users.length; i++)
  {
    if(await userIsOnProject(id, users[i].id) == true)
    {
      users[i].onproject = true;
      
    }
    else
    {
      users[i].onproject = false;
    }
  }

  if(rows[0].finished == 1)
  {
    rows[0].color = "#2c2c2c";
    rows[0].statusz = "Befejezett"
  }
  else{
    [rows[0].color, rows[0].statusz] = checkDateColors(rows[0].expire);
  }
  res.render("projects/edit", { project: rows[0], users: users });
};

export const editProject = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id } = req.params;
  const { name, contact, description, expire, reward, finished } = req.body;
  const newProject = {
    name,
    contact,
    description,
    expire,
    reward,
    finished: (finished == "on") ? 1 : 0,
  };
  await pool.query("UPDATE projects set ? WHERE id = ?", [newProject, id]);
  req.flash("success", "Sikeres szerkesztés");
  res.redirect("/projects/show/"+id);
};

// Felhasználó hozzáadása projkthez
export const addUserToProject = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id, userid } = req.params;
  const [rows] = await pool.query("SELECT owners FROM projects WHERE id = ?", [id]);
  let newProject = {};
  if(rows[0].owners == "[]")
  {
    let arr = [userid];
    await pool.query("UPDATE projects SET owners = ? WHERE id = ?", [JSON.stringify(arr).replaceAll('"', ''), id]);
    req.flash("success", `${await getFullnameFromID(userid)} sikeresen hozzáadva ehhez a projecthez: ${id}`);
    res.redirect("/projects/edit/"+id);
  }
  else
  {
    let arr = JSON.parse(rows[0].owners)
    arr.push(userid);
    await pool.query("UPDATE projects SET owners = ? WHERE id = ?", [JSON.stringify(arr).replaceAll('"', ''), id]);
    req.flash("success", `${await getFullnameFromID(userid)} sikeresen hozzáadva ehhez a projecthez: ${id}`);
    res.redirect("/projects/edit/"+id);
  }
};

export const removeUserFromProject = async (req, res) => {
  if(req.user.admin == 0) { return res.redirect('/')}
  const { id, userid } = req.params;
  let [owners] = await pool.query(`SELECT owners from projects WHERE id = ?`, [id]);
  let arr = JSON.parse(owners[0].owners)
  const index = arr.indexOf(Number(userid));
  if (index > -1) {
    arr.splice(index, 1);
  }

  await pool.query("UPDATE projects SET owners = ? WHERE id = ?", [JSON.stringify(arr).replaceAll('"', ''), id]);
  req.flash("success", `${await getFullnameFromID(userid)} sikeresen kitörölve ebből a projectből: ${id}`);
  res.redirect("/projects/edit/"+id);

};

async function userIsOnProject(p, u)
{
  let [rows] = await pool.query(`SELECT * from projects WHERE JSON_CONTAINS(owners, ?, '$')`, [u]);
  let retval = false;
  if(rows)
  {
    for(let i = 0; i < rows.length; i++)
    {
      if(rows[i].id == p) 
      {
        retval = true
        break;
      }
    }
  }
  return retval;
}