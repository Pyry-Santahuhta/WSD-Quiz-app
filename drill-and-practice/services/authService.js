import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    `INSERT INTO users
      (email, password, admin)
        VALUES ($email, $password, $admin)`,
    { email: email, password: password, admin: false },
  );
};

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email = $email",
    { email: email },
  );

  return result.rows;
};

export { addUser, findUserByEmail };
