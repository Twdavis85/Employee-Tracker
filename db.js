const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  getDepts() {
    return this.connection.query("SELECT * FROM departments");
  }
  addDept(name) {
    return this.connection.query("INSERT INTO departments SET ?", {
      dept_name: name,
    });
  }
  getRole() {
    return this.connection.query("SELECT * FROM roles");
  }
  addRole(title, salary, deptId) {
    return this.connection.query("INSERT INTO roles SET ?", {
      title: title,
      salary: salary,
      dept_id: deptId,
    });
  }
  getEmployee() {
      return this.connection.query("SELECT * FROM employee");
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
