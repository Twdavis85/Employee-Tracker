const inquirer = require("inquirer");
const DB = require("./db");
require("dotenv").config();
const { printTable } = require("console-table-printer");

function startProg() {
  console.log("Welcome to Employee Tracker!");
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "MAIN MENU?",
      choices: [
        "Work with Employees",
        "Work with Positions",
        "Work with Departments",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.menu) {
        case "Work with Employees":
          employeePrompt();
          break;
        case "Work with Positions":
          rolePrompt();
          break;
        case "Work with Departments":
          deptPrompt();
          break;
        default:
          theEnd();
      }
    });
}

function employeePrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "emplMenu",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add New Employee",
        "View Employees by Department",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.emplMenu) {
        case "View All Employees":
          allEmployees();
          break;
        case "Add New Employee":
          newEmployee();
          break;
        case "View Employees by Department":
          emplByDept();
          break;
        default:
          theEnd();
      }
    });
}

function rolePrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "roleMenu",
      message: "What would you like to do?",
      choices: ["View All Positions", "Add New Position", "Exit"],
    })
    .then(function (answer) {
      switch (answer.roleMenu) {
        case "View All Positions":
          allRoles();
          break;
        case "Add New Position":
          newRole();
          break;
        default:
          theEnd();
      }
    });
}

function deptPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "deptMenu",
      message: "What would you like to do?",
      choices: ["View All Departments", "Add New Department", "Exit"],
    })
    .then(function (answer) {
      switch (answer.deptMenu) {
        case "View All Departments":
          allDepts();
          break;
        case "Add New Department":
          newDept();
          break;
        default:
          theEnd();
      }
    });
}

function allDepts() {
  console.log("Here is a list of all departments");
  DB.getDepts().then((dept) => {
    printTable(dept);
    startProg();
    //   console.log(dept);
  });
}

DB.addDept("social media").then((res) => {
  //   console.log(res);
});

function allRoles() {
  console.log("Here is a list of all positions");
  DB.getRole().then((role) => {
    printTable(role);
    startProg();
    //   console.log(role);
  });
}

DB.addRole("Receptionist", 50000, 4).then((res) => {
  //   console.log(res);
});

function allEmployees() {
  console.log("Here is a list of all employees");
  DB.getEmployee().then((employee) => {
    printTable(employee);
    startProg();
    //   console.log(employee);
  });
}

async function newEmployee() {
  const roles = await DB.getRole();
  const roleList = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const man = await DB.getEmployee();
  const manList = man.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter the employee's first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter the employee's last name",
      },
      {
        type: "list",
        name: "roleId",
        message: "Please select the employee's position",
        choices: roleList,
      },
      {
        type: "list",
        name: "manId",
        message: "Please enter the employee's manager",
        choices: manList,
      },
    ])
    .then((answers) => {
      DB.addEmployee(
        answers.firstName,
        answers.lastName,
        answers.roleId,
        answers.manId
      ).then((res) => {
        allEmployees();
        //   console.log(res);
      });
    });
}

function theEnd() {
  console.log("the end");
  process.exit()
}

startProg();
