import { executeQuery } from "../database/database.js";

const getTopics = async () => {
  const res = await executeQuery(
    `SELECT * FROM topics ORDER BY name ASC`,
  );
  return res.rows;
};

const getTopic = async (id) => {
  const res = await executeQuery(
    `SELECT * FROM topics WHERE id=$id`,
    {
      id: id,
    },
  );
  return res.rows[0];
};

const addTopic = async (userId, name) => {
  await executeQuery(
    `INSERT INTO topics
      (user_id, name)
        VALUES ($userId, $name)`,
    {
      userId: userId,
      name: name,
    },
  );
};

const deleteTopic = async (id) => {
  await executeQuery(
    `DELETE FROM topics WHERE id=$id`,
    {
      id: id,
    },
  );
};

const getQuestions = async (topic_id) => {
  const res = await executeQuery(
    `SELECT * FROM questions where topic_id=$topic_id `,
    {
      topic_id: topic_id,
    },
  );
  return res.rows;
};

const getQuestion = async (topic_id, id) => {
  const res = await executeQuery(
    `SELECT * FROM questions WHERE topic_id=$topic_id AND id=$id`,
    {
      topic_id: topic_id,
      id: id,
    },
  );
  return res.rows[0];
};

const addQuestion = async (user_id, topic_id, question_text) => {
  await executeQuery(
    `INSERT INTO questions
    (user_id, topic_id, question_text)
      VALUES ($user_id, $topic_id, $question_text)`,
    {
      user_id: user_id,
      topic_id: topic_id,
      question_text: question_text,
    },
  );
};

const deleteQuestion = async (id) => {
  await executeQuery(
    `DELETE FROM questions WHERE id=$id`,
    {
      id: id,
    },
  );
};

const getOptions = async (question_id) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options where question_id=$question_id `,
    {
      question_id: question_id,
    },
  );
  return res.rows;
};

const addOption = async (question_id, option_text, is_correct) => {
  await executeQuery(
    `INSERT INTO question_answer_options
      (question_id, option_text, is_correct)
        VALUES ($question_id, $option_text, $is_correct)`,
    {
      question_id: question_id,
      option_text: option_text,
      is_correct: is_correct,
    },
  );
};

const getOption = async (id) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options WHERE id=$id`,
    {
      id: id,
    },
  );
  return res.rows[0];
};

const deleteOption = async (id) => {
  await executeQuery(
    `DELETE FROM question_answer_options WHERE id=$id`,
    {
      id: id,
    },
  );
};

export {
  addOption,
  addQuestion,
  addTopic,
  deleteOption,
  deleteQuestion,
  deleteTopic,
  getOption,
  getOptions,
  getQuestion,
  getQuestions,
  getTopic,
  getTopics,
};
