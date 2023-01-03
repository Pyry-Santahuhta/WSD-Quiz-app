import { executeQuery } from "../database/database.js";

const getRandomQuestion = async (topic_id) => {
  const res = await executeQuery(
    `SELECT * FROM questions WHERE topic_id=$topic_id ORDER BY random() LIMIT 1`,
    {
      topic_id: topic_id,
    },
  );
  return res.rows[0];
};

const getCorrectAnswers = async (question_id) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id=$question_id AND is_correct=true`,
    {
      question_id: question_id,
    },
  );
  return res.rows;
};

const addAnswer = async (user_id, question_id, question_answer_option_id) => {
  await executeQuery(
    `INSERT INTO question_answers
      (user_id, question_id, question_answer_option_id)
        VALUES ($user_id, $question_id, $question_answer_option_id)`,
    {
      user_id: user_id,
      question_id: question_id,
      question_answer_option_id: question_answer_option_id,
    },
  );
};

export { addAnswer, getCorrectAnswers, getRandomQuestion };
