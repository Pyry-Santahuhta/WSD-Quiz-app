const getLoggedin = (user) => {
  let loggedIn = false;
  if (user) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }
  return loggedIn;
};

export { getLoggedin };
