const db = require("../config/db.config");
const config = require("../config/auth.config");
const User = db.user;
const People = db.people;
const sendEmail = require("./email")

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  // Save User to Database
  console.log("SIGNUP: reqbody: ", req.body)
  return Promise.all([
    People.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      username2: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role
  }),
  ]).then( user =>{
    sendEmail({firstName: req.body.firstname, lastName: req.body.lastname, email: req.body.email, message: "Register"});
    res.send({ message: `User registered successfully!"\\n"
      A email has been sent out to Web Admin for "Activation"`})
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  // Save User to Database
  console.log("update>>reqbody: ", req.body)
  People.findOne({
    where: {
      email: req.body.email
      // username2: req.body.username
      // username: req.body.username
    }
  }).then(user =>{
    if (!user) {
      console.log(">>user not true!")
      return res.status(404).send({ message: "User Not found." });
    }else{
      return People.update(
        { 
          username2: req.body.username,
          password: bcrypt.hashSync(req.body.password, 8)
         },
        { where: {IDpeople: user.IDpeople } }
      )
    }
  }).then( user =>{
    sendEmail({firstName: req.body.firstname, lastName: req.body.lastname, email: req.body.email, message: "Reset Password"});
    res.send({ message: `User Password Updated successfully!` })
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  console.log("SIGNIN>>reqbody: ", req.body)
  // User.findOne({
    People.findOne({
    where: {
      username2: req.body.username
      // username: req.body.username
    }
  })
    .then(user => {
      console.log("backend: user from au_admin_controller>>user: ", user)
      console.log("webactive? ", user["webapp"])
      if (!user) {
        console.log(">>user not true!")
        return res.status(404).send({ message: "User Not found." });
      }else if (user["webapp"] != 'ACTIVE'){
        console.log(">>user is NOT ACTIVATED YET!")
        return res.status(404).send({ message: "User is Not ACTIVATED YET!" });
      }else{}
      // console.log("req.body.password: ", req.body.password);
      console.log("password retrieved from db: ", user.password)
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 43200 //86400 // 24 hours
      });

      res.status(200).send({
        id: user.IDpeople,
        // username: user.username,
        username: user.username2,
        email: user.email,
        role: user.role,
        accessToken: token,
        signature: user.signature
      })

/*       var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      }); */
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
