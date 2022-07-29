//mysql connection
const inquirer = require("inquirer");
const mysql = require("mysql2")
const cTable = require('console.table');
//inquirer list including view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role
const initArr = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an Employee", "Update Employee", "Exit"]

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

//runs queries based on user input
const init = async () => {
    try {
        const res = await inquirer.prompt([
            {
                type: "list",
                name: "startQ",
                Message: "Please choose one of the following to proceed:",
                choices: initArr
            }
        ])

        if (res.startQ == initArr[0]) { viewDepts() }
        else if (res.startQ == initArr[1]) { viewRoles() }
        else if (res.startQ == initArr[2]) { viewEmps() }
        else if (res.startQ == initArr[3]) { addDepts() }
        else if (res.startQ == initArr[4]) { roleUpdateQueryBuilder() }
        else if (res.startQ == initArr[5]) { managerQueryBuilder() }
        else if (res.startQ == initArr[6]) { empInqBuild() }
        else { process.exit(0) }
    } catch (err) {
        console.log(err)
    }
}

//view all departments, formatted table with dept names and dept ids
const viewDepts = function () {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) { console.log(err) }
        else {
            console.table(res)
            init();
        }
    })
}

//view all roles, job title, role id, the department the role is in, and role salary
const viewRoles = function () {
    db.query("SELECT * FROM role", (err, res) => {
        if (err) { console.log(err) }
        else {
            console.table(res)
            init();
        }
    })
}

//view employees, employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewEmps = function () {
    db.query("SELECT employee.id, first_name, last_name, manager_id, role.title, role.salary, department.dept_name FROM employee JOIN role on employee.role_id = role.id JOIN department on role.department_id = department.id;", (err, res) => {
        if (err) { console.log(err) }
        else {
            console.table(res)
            init();
        }
    })
}

//add a department
//enter dept name and add to database
const addDepts = async () => {
    try {
        const res = await inquirer.prompt([
            {
                type: "input",
                name: "deptName",
                message: "Please type the name of the new department"
            }
        ])

        db.query("INSERT INTO department (dept_name) VALUES (?);", `${res.deptName}`, (err, result) => {
            if (err) { console.log(err) }
            else { console.log(`New department ${res.deptName} has been added to the database`) }
        })

    } catch (err) {
        console.log(err)
    }
    init()
}

//add a role, 

let roleUpdateArr = []
const roleUpdateQueryBuilder = () => {
    db.query("SELECT id FROM department", (err, sqlRes) => {
        if (err) { console.log(err) }
        else {
           
            const resArr = Object.values(sqlRes)  
            for (i = 0; i < resArr.length; i++) {
                let valArr = Object.values(resArr[i])
                console.log(valArr.toString())
                roleUpdateArr.push(valArr.toString())
            }  
            
           addRoles()
            
        }
    })
}
//enter role name, salary, and department
const addRoles = async () => {
    try {
        const res = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Please type the name of the new role:"
            },
            {
                type: "input",
                name: "salary",
                message: "Please type the new role's salary:"
            },
            {
                type: "list",
                name: "department_id",
                choices: roleUpdateArr,
                message: "Please choose the department id under which this role falls:"
            }
        ])

        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [`${res.title}`, `${res.salary}`, `${res.department_id}`], (err, result) => {
            if (err) { console.log(err) }
            else { console.log(`New role ${res.title} has been added to the database`) }
        })

    } catch (err) {
        console.log(err)
    }
    init()
}

//add an employee


let empAddManagerArr = []
const managerQueryBuilder = () => {
    db.query("SELECT id FROM employee WHERE manager_id IS null", (err, sqlRes) => {
        if (err) { console.log(err) }
        else {
           
            const resArr = Object.values(sqlRes)  
            for (i = 0; i < resArr.length; i++) {
                let valArr = Object.values(resArr[i])
              
                empAddManagerArr.push(valArr.toString())
            }  
            
            roleIDQueryBuilder()
            
        }
    })
}

let empAddRoleArr = []
const roleIDQueryBuilder = () => {
    db.query("SELECT id FROM role", (err, sqlRes) => {
        if (err) { console.log(err) }
        else {
           
            const resArr = Object.values(sqlRes)    
           
            for (i = 0; i < resArr.length; i++) {
                let valArr = Object.values(resArr[i])
             
                empAddRoleArr.push(valArr.toString())
            }
           
            addEmps()
        }
    })
}
//first name, last name, role, and manager
const addEmps = async () => {
    try {
        const res = await inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Please type the new employee's first name:"
            },
            {
                type: "input",
                name: "last_name",
                message: "Please type the new employee's last name:"
            },
            {
                type: "list",
                name: "role_id",
                choices: empAddRoleArr,
                message: "Please choose the id of the employee's role:"
            },
            {
                type: "list",
                name: "manager_id",
                choices: empAddManagerArr,
                message: "Please choose the employee id of the new employee's manager:"
            }
        ])

        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [`${res.first_name}`, `${res.last_name}`, `${res.role_id}`, `${res.manager_id}`], (err, result) => {
            if (err) { console.log(err) }
            else { console.log(`New employee ${res.first_name} ${res.last_name} has been added to the database`) }
        })

    } catch (err) {
        console.log(err)
    }
    init()
}

//update role
//select an employee and and update their role in the db.

//function chain to avoid complex callbacks
let finEmpArr = []

const empInqBuild = async () => {
    //sets up  employee choice array
    db.query("SELECT first_name, last_name FROM employee", (err, sqlRes) => {
        if (err) { console.log(err) }
        else {
            const resArr = Object.values(sqlRes)

            for (i = 0; i < resArr.length; i++) {
                let valArr = Object.values(resArr[i])


                let joinArr = valArr.join(" ")
                finEmpArr.push(joinArr)

            }
            roleInqBuild()
        }
    }
    )

}

let finRoleArr = []
const roleInqBuild = async () => {
    //sets up role and role id array
    db.query("Select title, id FROM role", (err, sqlRes) => {
        if (err) { console.log(err) }
        else {
            const resArr = Object.values(sqlRes)

            for (i = 0; i < resArr.length; i++) {
                let valArr = Object.values(resArr[i])

                let joinArr = valArr.join("-")
                finRoleArr.push(joinArr)

            }
            updateEmps()
        }
    })

}

let splName = (x) => {
    const splitArr = x.split(" ")
    const splicedArr = splitArr.splice(0, 1)
    const newString = splicedArr.toString()
    return newString
}

let splRole = (x) => {
    const splitArr = x.split("-")
    const splicedArr = splitArr.splice(1, 1)
    const newString = splicedArr.toString()
    return parseInt(newString)
}



const updateEmps = async () => {

    try {
        const res = await inquirer.prompt([
            {
                type: "list",
                name: "empList",
                Message: "Please choose the employee whose role you'd like to update:",
                choices: finEmpArr
            },
            {
                type: "list",
                name: "roleList",
                Message: "Please choose the role you'd like to assign to your previously chosen employee:",
                choices: finRoleArr
            }
        ])

        db.query("UPDATE employee SET role_id= ?, manager_id=? WHERE first_name = ?", [splRole(res.roleList), splRole(res.roleList), splName(res.empList)], (err) => {
            if (err) { console.log(err) }
            else {
                console.log("Employee's role successfully updated")
            }
        }
        
        )

    } catch (err) {
        console.log(err)
    }
    init()
}


init();