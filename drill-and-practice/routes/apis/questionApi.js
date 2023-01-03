import { executeQuery } from "../../database/database.js";
import * as topicService from "../../services/topicService.js";

const getRandomQuestion = async ({ response }) => {
  const res = await executeQuery(
    `SELECT * FROM questions ORDER BY random() LIMIT 1`,
  );
  const optionsResponse = await topicService.getOptions(res.rows[0].id);
  const options = [];
  optionsResponse.forEach((option) => {
    options.push({ optionId: option.id, optionText: option.option_text });
  });
  if (res.rows.length === 0) {
    response.body = {};
  } else {
    const data = {
      questionId: res.rows[0].id,
      questionText: res.rows[0].question_text,
      answerOptions: options,
    };
    response.body = data;
  }
};

const answer = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const answer = await topicService.getOption(`${document.optionId}`);

  if (answer.is_correct) {
    response.body = { correct: true };
  } else {
    response.body = { correct: false };
  }
};

export { answer, getRandomQuestion };
