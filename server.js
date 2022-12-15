const express = require("express");
const { seed } = require("./data/index");

const { Spell } = require("./models/Spell");
const { Wizard } = require("./models/Wizard");
// const bcrypt = require('bcrypt');

const app = express();
// const port = 3011;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//   // POST /register
// // TODO - takes req.body of { student_name, isStudent, hogwartsHouse,password} and creates a new user with the hashed password
// app.post("/register", async (req, res, next) => {
//   try {
//     let { student_name, isStudent, hogwartsHouse,password } = req.body;
//     //create the salt
//     let salt = await bcrypt.genSalt(5);

//     //use bcrypt to hash the password
//     const hashedPw = await bcrypt.hash(password, salt);

//     //add user to db
//    let createdUser= await Wizard.create( { student_name, isStudent, hogwartsHouse,password:hashedPw });
//    console.log(createdUser);
//    if(createdUser){
//     res.send(`successfully created new wizard ${student_name}`)
//    }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// app.post("/login", async (req, res, next) => {
//     try{
//       let { student_name, password } = req.body;
//       //search db and find where username matches what is passed in
//       let loginUser= await Wizard.findOne({
//          where: { student_name
//         }
//       });
//       if(loginUser){
//         let isMatching = await bcrypt.compare(password, loginUser.password);
//         if(isMatching){
//           res.send(`successfully logged in user ${student_name}`);
//         }else{
//           res.send(401, 'incorrect username or password');
//         }
//         }
//       }catch(error){
//         console.error(error);
//         next(error);
//       }
//     });

// Installed bcrypt and created the salt object
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(5);

// Installed jsonwebtoken
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { PORT, ACCESS_TOKEN_SECRET } = process.env;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // data are trasfered as url encoded form

// Middleware is just functions that run between your request and response.
// Middleware needs to know if it's finished, "next" is the way to let the middleware know it's finished

// Create custom middleware authWizard
let authWizard = async (req, res, next) => {
  // Authorization comes from the header of the request object, particularly in the "Authorization" part.
  const auth = req.header("Authorization");
  // console.log("Auth: ", auth);

  // If not authorized
  if (!auth) {
    console.log("The wizard isn't authorized...");
    next(); // move on to the next function
  } else {
    // In this case, the wizard is authorized
    console.log("The wizard is Authorized");

    // Array Deconstruction, we don't need the Bearer part, only need token
    const [, token] = auth.split(" "); // spliting the authentication string by space

    // Check the validity of the token
    const wizard = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.wizard = wizard;
    next();
  }
};


// If I'm making a route to register a wizard, what would be an endpoint for that?
// RESTful API needs to be pluralized
// first, we need to authenticate
// Two ways to authenticate -- 1. bcrypt 2. OAuth

app.post("/wizards/register", async (req, res) => {
  // Object Deconstruction
  const { student_name, isStudent, hogwartsHouse, password } = req.body;

  console.log("The student_name: ", student_name);
  console.log("The password: ", password);

  let hashedPw = bcrypt.hashSync(password, salt);

  console.log("The hashed PW: ", hashedPw);

  // Created the student data, which is the payload (student data that we're passing in)
  let createdWizard = await Wizard.create({
    student_name,
    isStudent,
    hogwartsHouse,
    password: hashedPw,
  });

  // To sign we must include:
  // 1. The object
  // 2. The secret
  const token = jwt.sign(
    { id: createdWizard.id, student_name: createdWizard.student_name },
    ACCESS_TOKEN_SECRET
  );

  res.send({ messge: "Wizard Successfully Registered", token });
});

// login route, use the custom middleware as the second argument
app.post("/wizards/login", authWizard, async (req, res) => {
  const { student_name, password } = req.body;

  let foundWizard = await Wizard.findOne({
    where: { student_name: student_name },
  });

  // Authenticate the Wizard
  // Returns True or False based on Password Matching or Not
  let isAuthenticated = bcrypt.compareSync(password, foundWizard.password);

  if (isAuthenticated) {
    // It True, the wizard successfully logged in.

    // I want to authorize your permissions now

    const { id, student_name } = foundWizard;

    let payload = { id: id, student_name: student_name };
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET);

    res.send({ message: "Successful Login", token });
  } else {
    res.send("Please enter the correct password and try again.");
  }
});

//Yohonna: get all wizards
app.get("/wizards", async (req, res) => {
  let wizard = await Wizard.findAll(req.params.id);
  res.send(wizard);
});

//Yohonna:get wizards by id
app.get("/wizards/:id", async (req, res) => {
  console.log(req.params.id);
  let wizard = await Wizard.findByPk(req.params.id);
  res.send(wizard);
});

//Yohonna:get spells by id
app.get("/spells/:id", async (req, res) => {
  console.log(req.params.id);
  let spell = await Spell.findByPk(req.params.id);
  res.send(spell);
});

//Yohonna:get all spells
app.get("/spells", async (req, res) => {
  let spell = await Spell.findAll(req.params.id);
  res.send(spell);
});

//Kris POST routes
//  Kris: POST new wizards
app.post("/wizards", async (req, res, next) => {
  try {
    const wizard = await Wizard.create(req.body);
    res.send(wizard);
  } catch (error) {
    next(error);
  }
});
//Kris: POST new spells
app.post("/spells", async (req, res, next) => {
  try {
    const spell = await Spell.create(req.body);
    res.send(spell);
  } catch (error) {
    next(error);
  }
});

//Kris: PUT wizards
//Update a single item to the Wizard and Spell database by id
app.put("/wizards/:id", async (req, res, next) => {
  try {
    await Wizard.update(req.body, {
      where: { id: req.params.id },
    });
    let putWizards = await Wizard.findAll();
    res.json(putWizards);
  } catch (error) {
    next(error);
  }
});
//Kris: PUT Spells
app.put("/spells/:id", async (req, res, next) => {
  try {
    await Spell.update(req.body, {
      where: { id: req.params.id },
    });
    let putSpells = await Spell.findAll();
    res.json(putSpells);
  } catch (error) {
    next(error);
  }
});

//delete route done by Ahn 12/2/2022
app.delete("/wizards/:id", async (req, res) => {
  const wizard = await Wizard.findByPk(req.params.id);
  const deletedWizard = await wizard.destroy();
  res.send(deletedWizard);
});

app.delete("/spells/:id", async (req, res) => {
  const spell = await Spell.findByPk(req.params.id);
  const deletedSpell = await spell.destroy();
  res.send(deletedSpell);
});


app.listen(PORT, () => {
  seed();
  console.log(`App listening on http://localhost:${PORT}`);
});
