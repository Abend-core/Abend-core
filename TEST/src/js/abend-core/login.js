function login() {
  const data = {
    login: $("#inputLogin").val(),
    password: $("#inputPassword").val(),
  };
  app.post("login", data).then((value) => {
    console.log(value);
    curSession = new Session(value.UUID, value.token);
    console.log(curSession);
    modalClose();
  });
}
