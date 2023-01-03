import * as topicService from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js";
import * as tools from "../../tools/tools.js";

const showTopics = async ({ render, user }) => {
  const topics = await topicService.getTopics();
  const loggedIn = tools.getLoggedin(user);

  const data = {
    loggedIn: loggedIn,
    topics: topics,
  };
  render("quiz.eta", data);
};

const getRandomQuestion = async ({ params, response }) => {
  const question = await quizService.getRandomQuestion(`${params.tId}`);
  console.log(question);
  response.redirect(`/quiz/${params.tId}/questions/${question.id}`);
};

const showQuestion = async ({ params, render, user }) => {
  const loggedIn = tools.getLoggedin(user);
  const topic = await topicService.getTopic(`${params.tId}`);
  const question = await topicService.getQuestion(
    `${params.tId}`,
    `${params.qId}`,
  );
  const options = await topicService.getOptions(`${params.qId}`);
  const data = {
    loggedIn: loggedIn,
    topic: topic,
    question: question,
    options: options,
  };
  render("quizquestion.eta", data);
};

const answer = async ({ params, response, user }) => {
  await quizService.addAnswer(
    user.id,
    `${params.qId}`,
    `${params.oId}`,
  );

  const answer = await topicService.getOption(`${params.oId}`);

  if (answer.is_correct) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
  } else {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
  }
};

const showCorrect = ({ params, render, user }) => {
  const loggedIn = tools.getLoggedin(user);

  const data = {
    loggedIn: loggedIn,
    tId: `${params.tId}`,
  };
  render("correct.eta", data);
};

const showIncorrect = async ({ params, render, user }) => {
  const correctAnswers = await quizService.getCorrectAnswers(`${params.qId}`);
  const loggedIn = tools.getLoggedin(user);

  const data = {
    loggedIn: loggedIn,
    tId: `${params.tId}`,
    correctAnswers: correctAnswers,
  };
  render("incorrect.eta", data);
};

export {
  answer,
  getRandomQuestion,
  showCorrect,
  showIncorrect,
  showQuestion,
  showTopics,
};
