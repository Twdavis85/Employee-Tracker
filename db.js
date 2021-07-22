const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  getDepts() {
    return this.connection.query('SELECT departments.id AS "ID", departments.dept_name AS "Department" FROM departments');
  }
  addDept(name) {
    return this.connection.query("INSERT INTO departments SET ?", {
      dept_name: name,
    });
  }
  getRole() {
    return this.connection.query('SELECT roles.id AS "ID", roles.title AS "Title", roles.salary AS "Salary", roles.dept_id AS "Department ID" FROM roles;');
  }
  addRole(title, salary, deptId) {
    return this.connection.query("INSERT INTO roles SET ?", {
      title: title,
      salary: salary,
      dept_id: deptId,
    });
  }
  getEmployee() {
      return this.connection.query('SELECT employee.id AS "ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", roles.title AS "Title", departments.dept_name AS "Department", roles.salary AS "Salary", CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN departments on roles.dept_id = departments.id LEFT JOIN employee manager on manager.id = employee.man_id;');
  }
  addEmployee(firstName, lastName, roleId, manId) {
      return this.connection.query("INSERT INTO employee SET ?", {
         first_name: firstName,
         last_name: lastName,
         role_id: roleId,
         man_id: manId, 
      });
  }
}

module.exports = new DB(connection);
