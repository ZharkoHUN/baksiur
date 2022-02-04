import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import pool from "../database";
import * as helpers from "./helpers";
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Üdv itt, " + user.username));
        } else {
          done(null, false, req.flash("message", "Hibás jelszó"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "Ez a felhasználónév nem létezik.")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;

      let newUser = {
        fullname,
        username,
        password,
        admin: 0,
      };

      newUser.password = await helpers.encryptPassword(password);

      const [haveAcc] = await pool.query(`SELECT * FROM users WHERE username = ?`, newUser.username);
      if (!haveAcc[0]) {
        // Saving in the Database
        const [result] = await pool.query("INSERT INTO users SET ? ", newUser);
        newUser.id = result.insertId;
        return done(null, newUser);
      } else {
        return done(null, false, req.flash("message", "Ez a Felhasználónév már foglalt."));
      }
      
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
