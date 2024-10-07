const inquirer = require('inquirer');
const db = require('./db/queries');

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Exit'],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      const departments = await db.getAllDepartments();
      console.table(departments);
      break;
    case 'View All Roles':
      const roles = await db.getAllRoles();
      console.table(roles);
      break;
    case 'View All Employees':
      const employees = await db.getAllEmployees();  
      console.table(employees);
      break;
    case 'Add Department':
      const { departmentName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the new department:',
        },
      ]);
      await db.addDepartment(departmentName);
      console.log('Department added successfully!');
      break;
    case 'Add Role':
      const { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt([
        { type: 'input', name: 'roleTitle', message: 'Enter the title of the new role:' },
        { type: 'input', name: 'roleSalary', message: 'Enter the salary for the new role:' },
        { type: 'input', name: 'roleDepartment', message: 'Enter the department ID for the new role:' },
      ]);
      await db.addRole(roleTitle, roleSalary, roleDepartment);
      console.log('Role added successfully!');
      break;
    case 'Add Employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
        { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID for the employee:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID for the employee (if any):' },
      ]);
      await db.addEmployee(firstName, lastName, roleId, managerId);
      console.log('Employee added successfully!');
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  mainMenu();
};

mainMenu();