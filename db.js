const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection
    }
    getDepts() {
        return this.connection.query("SELECT * FROM departments")
    }
    addDept(name) {
        return this.connection.query("INSERT INTO departments SET ?", { dept_name: name })
    }
    // getRole() {
    //     return this.connection.query("SELECT * FROM roles")
    // }
    // addRole(title, salary, deptId) {
    //     return this.connection.query("INSERT INTO roles SET ?", 
    //     { 
    //         title: title,
    //         salary: salary,
    //         dept_id: deptId
    //      })
    // }
}

module.exports = new DB(connection);