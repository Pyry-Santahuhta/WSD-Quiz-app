import { bcrypt } from "../../deps.js";
import { validasaur } from "../../deps.js";
import * as authService from "../../services/authService.js";
import * as tools from "../../tools/tools.js";

const registerValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const registerUser = async ({ request, response, user, render }) => {
  const loggedIn = tools.getLoggedin(user);

  const body = request.body({ type: "form" });
  const params = await body.value;
  const data = {
    loggedIn: loggedIn,
    email: params.get("email"),
    password: params.get("password"),
  };

  const [passes, errors] = await validasaur.validate(
    data,
    registerValidationRules,
  );
  if (!passes) {
    data.validationErrors = errors;
    render("register.eta", data);
  } else {
    await authService.addUser(
      params.get("email"),
      await bcrypt.hash(params.get("password")),
    );

    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render, user }) => {
  const loggedIn = tools.getLoggedin(user);
  const data = {
    loggedIn: loggedIn,
  };
  render("register.eta", data);
};

const showLoginForm = ({ render, user }) => {
  const loggedIn = tools.getLoggedin(user);
  const data = {
    loggedIn: loggedIn,
  };
  render("login.eta", data);
};

const login = async ({ request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await authService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    response.redirect("/auth/login");
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    response.redirect("/auth/login");
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

const logout = async ({ state, response }) => {
  await state.session.deleteSession();
  response.redirect("/auth/login");
};

export { login, logout, registerUser, showLoginForm, showRegistrationForm };
