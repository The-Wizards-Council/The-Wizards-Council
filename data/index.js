const { database } = require("../db");
const { Spell, Wizard } = require("../models/index");
const { spell } = require("./spellData");
const { wizard } = require("./wizardData");
const bcrypt = require("bcrypt");

let seed = async () => {
  await database.sync({ force: true });
  //loops through all wizard entries starts at i, then selects password within i. 
for(let i=0;i<=wizard.length-1;i++){
 let password= wizard[i].password
 //use bcrypt to hash the password and reassingn in wizardData
 let salt = await bcrypt.genSalt(5);
  wizard[i].password = await bcrypt.hash(password, salt);
}
  // Create the entries for them in their Models
  let wizardEntries = await Wizard.bulkCreate(wizard);
 let spellEntries = await Spell.bulkCreate(spell);

  let firstSpell = await spellEntries[0];
  let secondWizard = await wizardEntries[1];

  console.log("Test 1: ", firstSpell);
  console.log("Test 2: ", secondWizard);

  console.log("The database is populated... Test it out using a Local Server!");
};
//seed()
module.exports = {
  seed,
};
