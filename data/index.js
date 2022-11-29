const {database} = require('../db');
const {Spell, Wizard} = require('../models/index');
const {spell} = require("./SpellData");
const {wizard} = require("./WizardData");

let seed = async () => {
    await database.sync({force:true});

        // Create the entries for them in their Models
    let spellEntries = await Spell.bulkCreate(spell);
    let wizardEntries = await Wizard.bulkCreate(wizard);

    let firstSpell = await spellEntries[0];
    let secondWizard = await wizardEntries[1];

    console.log("Test 1: ", firstSpell);
    console.log("Test 2: ", secondWizard);

    console.log("The database is populated... Test it out using a Local Server!")
}

module.exports = {
    seed
}
