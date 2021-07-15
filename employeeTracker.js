const inquirer = require("inquirer");
const DB = require("./db");

DB.getDepts().then(dept => {
    console.log(dept)
});

DB.addDept("social media").then(res => {
    console.log(res)
});

DB.getRole().then(role => {
    console.log(role)
});

DB.addRole("Receptionist", 50000, 4).then(res => {
    console.log(res)
});