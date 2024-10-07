import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'employee_tracker',
  password: 'your_password',
  port: 5432,
});

export default pool;