import { executeQuery } from "../database/database.js";

const getCountOfTopics = async () => {
  const res = await executeQuery(
    `SELECT COUNT(*) FROM topics`,
  );
  return res.rows[0];
};

const getCountOfQuestions = async () => {
  const res = await executeQuery(
    `SELECT COUNT(*) FROM questions`,
  );
  return res.rows[0];
};

const getCountOfAnswers = async () => {
  const res = await executeQuery(
    `SELECT COUNT(*) FROM question_answers`,
  );
  return res.rows[0];
};
export { getCountOfAnswers, getCountOfQuestions, getCountOfTopics };
