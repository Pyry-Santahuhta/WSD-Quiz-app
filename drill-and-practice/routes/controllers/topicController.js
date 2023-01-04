import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";
import * as tools from "../../tools/tools.js";
const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};
const questionValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};
const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};
const showTopics = async ({ render, user }) => {
  const topics = await topicService.getTopics();
  const loggedIn = tools.getLoggedin(user);
  const data = {
    loggedIn: loggedIn,
    user: user,
    topics: topics,
  };
  render("topics.eta", data);
};

const showTopic = async ({ params, render, user }) => {
  const loggedIn = tools.getLoggedin(user);
  const topic = await topicService.getTopic(`${params.id}`);
  const questions = await topicService.getQuestions(`${params.id}`);
  const data = {
    loggedIn: loggedIn,
    topic: topic,
    questions: questions,
  };
  render("topic.eta", data);
};

const addTopic = async ({ request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const bodyParams = await body.value;
  const topics = await topicService.getTopics();
  const loggedIn = tools.getLoggedin(user);

  const data = {
    loggedIn: loggedIn,
    topics: topics,
    name: bodyParams.get("name"),
  };

  const [passes, errors] = await validasaur.validate(
    data,
    topicValidationRules,
  );

  if (!passes) {
    data.validationErrors = errors;
    console.log(errors);

    render("topics.eta", data);
  } else {
    if (user.admin) {
      await topicService.addTopic(
        user.id,
        bodyParams.get("name"),
      );
      response.redirect("/topics");
    }
  }
};

const deleteTopic = async ({ params, response, user }) => {
  if (user.admin) {
    await topicService.deleteTopic(`${params.id}`);
    response.redirect(`/topics`);
  }
};

const showQuestion = async ({ params, render, user }) => {
  const loggedIn = tools.getLoggedin(user);
  const topic = await topicService.getTopic(`${params.id}`);
  const question = await topicService.getQuestion(
    `${params.id}`,
    `${params.qId}`,
  );
  const options = await topicService.getOptions(`${params.qId}`);
  const data = {
    loggedIn: loggedIn,
    topic: topic,
    question: question,
    options: options,
  };
  render("question.eta", data);
};

const addQuestion = async ({ params, request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const bodyparams = await body.value;
  const loggedIn = tools.getLoggedin(user);
  const topic = await topicService.getTopic(`${params.id}`);
  const questions = await topicService.getQuestions(`${params.id}`);

  const data = {
    loggedIn: loggedIn,
    questions: questions,
    topic: topic,
    question_text: bodyparams.get("question_text"),
  };

  const [passes, errors] = await validasaur.validate(
    data,
    questionValidationRules,
  );

  if (!passes) {
    data.validationErrors = errors;
    render("topic.eta", data);
  } else {
    await topicService.addQuestion(
      user.id,
      `${params.id}`,
      bodyparams.get("question_text"),
    );
    response.redirect(`/topics/${params.id}`);
  }
};

const deleteQuestion = async ({ params, response }) => {
  await topicService.deleteQuestion(`${params.qId}`);
  response.redirect(`/topics/${params.id}`);
};

const addOption = async ({ params, request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const bodyparams = await body.value;
  const topic = await topicService.getTopic(`${params.id}`);
  const question = await topicService.getQuestion(
    `${params.id}`,
    `${params.qId}`,
  );
  const options = await topicService.getOptions(`${params.qId}`);
  const loggedIn = tools.getLoggedin(user);

  const data = {
    loggedIn: loggedIn,
    topic: topic,
    question: question,
    options: options,
    option_text: bodyparams.get("option_text"),
  };
  const [passes, errors] = await validasaur.validate(
    data,
    optionValidationRules,
  );
  if (!passes) {
    data.validationErrors = errors;
    render("question.eta", data);
  } else {
    let is_correct;
    if (bodyparams.get("is_correct") === "on") {
      is_correct = true;
    } else {
      is_correct = false;
    }
    await topicService.addOption(
      `${params.qId}`,
      bodyparams.get("option_text"),
      is_correct,
    );
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
  }
};

const deleteOption = async ({ params, response }) => {
  await topicService.deleteOption(`${params.oId}`);
  response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

export {
  addOption,
  addQuestion,
  addTopic,
  deleteOption,
  deleteQuestion,
  deleteTopic,
  showQuestion,
  showTopic,
  showTopics,
};
