import * as mainService from "../../services/mainService.js";
import * as tools from "../../tools/tools.js";
const showMain = async ({ render, user }) => {
  const topicCount = await mainService.getCountOfTopics();
  const questionCount = await mainService.getCountOfQuestions();
  const answerCount = await mainService.getCountOfAnswers();
  const loggedIn = tools.getLoggedin(user);

  const data = {
    loggedIn: loggedIn,
    topicCount: topicCount.count,
    questionCount: questionCount.count,
    answerCount: answerCount.count,
  };
  render("main.eta", data);
};

export { showMain };
