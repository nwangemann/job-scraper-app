const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res, next) => {
    const db = req.app.get("db");
    let { password, email } = req.body;
    const foundUser = await db.find_user(email).catch(err => console.log(err));
    if (!foundUser.length) {
      res.status(401).send("That user does not exist");
    } else {
      const matchPasswords = await bcrypt
        .compare(password, foundUser[0].password)
        .catch(err => console.log(err));
      if (matchPasswords) {
        req.session.user = {
          email: foundUser[0].email,
          user_id: foundUser[0].user_id
        };
        res.status(200).send(req.session.user);
      } else {
        res.status(401).send("Incorrect email and/or password combination");
      }
    }
  },
  registerUser: async (req, res, next) => {
    const db = req.app.get("db");
    const { password, email } = req.body;
    const foundUser = await db.find_user(email);
    if (foundUser.length) {
      res
        .status(409)
        .json(
          "That user exists already, please register with another email address."
        );
    } else {
      const saltRounds = 12;
      bcrypt.genSalt(saltRounds).then(salt => {
        bcrypt.hash(password, salt).then(hashedPassword => {
          db.register_user([email, hashedPassword]).then(([user]) => {
            req.session.user = user;
            res.status(200).send(req.session.user);
          });
        });
      });
    }
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  userSession: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  editEmail: async (req, res, next) => {
    const db = req.app.get("db");
    let { email } = req.body;
    let { user_id } = req.params;
    const editedEmail = await db.edit_email(email, user_id);
    res.status(200).send(editedEmail);
  },
  editPassword: async (req, res, next) => {
    const db = req.app.get("db");
    let { user_id } = req.params;
    let { password } = req.body;
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds).then(salt => {
      bcrypt.hash(password, salt).then(hashedPassword => {
        db.edit_password([hashedPassword, user_id]).then(([user]) => {
          req.session.user = user;
          res.status(200).send(req.session.user);
        });
      });
    });
  }
};
