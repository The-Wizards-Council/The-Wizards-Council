const Sequelize = require("sequelize");
const { database } = require("../db");

const Wizard = database.define("wizard", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    student_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isStudent: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
});

module.exports = {
    Wizard
};