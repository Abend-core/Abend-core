function login() {
  const data = {
    login: $("#inputLogin").val(),
    password: $("#inputPassword").val(),
  };
  app.post("login", data).then((value) => {
    curSession = new Session(value.UUID, value.token);
    modalClose();
  });
}
