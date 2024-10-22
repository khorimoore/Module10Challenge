import pool from './connection'; 

async function getAllDepartments() {
  try {
    const result = await pool.query('SELECT * FROM departments');
    return result.rows;
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
}

async function getAllRoles() {
  try {
    const result = await pool.query('SELECT * FROM roles');
    return result.rows;
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
}


async function getAllEmployees() {
  try {
    const result = await pool.query('SELECT * FROM employees');
    return result.rows;
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

async function addDepartment(departmentName) {
  try {
    const result = await pool.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [departmentName]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

async function addRole(roleTitle, roleSalary, roleDepartment) {
  try {
    const result = await pool.query(
      'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
      [roleTitle, roleSalary, roleDepartment]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error adding role:', error);
  }
}


async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    const result = await pool.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, roleId, managerId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}
module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
};