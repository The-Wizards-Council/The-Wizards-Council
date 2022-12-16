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
    isSuperUser: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    hogwartsHouse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = {
    Wizard
};