function login() {
  const data = {
    login: $("#inputLogin").val(),
    password: $("#inputPassword").val(),
  };
  app.post("login", data).then((value) => {
    curSession = new Session(value.UUID, value.token);
    console.log(curSession);
    modalClose();
    app.get("users/" + curSession.id, curSession.token).then((value) => {
      curSession.nom = value.user.name;
      curSession.prenom = value.user.firstname;
      curSession.test = {
        nom: value.user.name,
        prenom: value.user.firstname,
        admin: value.user.isAdmin,
      };
      initMenu();
    });
  });
}
