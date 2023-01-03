import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as authController from "./controllers/authController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";
const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.showTopics);
router.get("/topics/:id", topicController.showTopic);
router.get("/topics/:id/questions/:qId", topicController.showQuestion);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);
router.post("/topics/:id/questions", topicController.addQuestion);
router.post(
  "/topics/:id/questions/:qId/delete",
  topicController.deleteQuestion,
);
router.post("/topics/:id/questions/:qId/options", topicController.addOption);
router.post(
  "/topics/:id/questions/:qId/options/:oId/delete",
  topicController.deleteOption,
);

router.get("/quiz", quizController.showTopics);
router.get("/quiz/:tId", quizController.getRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showQuestion);
router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  quizController.answer,
);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);
router.get("/auth/register", authController.showRegistrationForm);
router.get("/auth/login", authController.showLoginForm);
router.get("/auth/logout", authController.logout);
router.post("/auth/register", authController.registerUser);
router.post("/auth/login", authController.login);

router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.answer);

export { router };
