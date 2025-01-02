function login(event) {
  event.preventDefault();
  const data = {
    login: $("#inputLogin").val(),
    password: $("#inputPassword").val(),
  };
  app
    .post("login", data)
    .then((value) => {
      if (value.token) {
        curSession = new Session(value.UUID, value.token);
        app
          .get("users/" + curSession.id, curSession.token)
          .then((userData) => {
            if (userData.user) {
              curSession.user = {
                nom: userData.user.name,
                prenom: userData.user.firstname,
                admin: userData.user.isAdmin,
              };
              if (userData.user.isAdmin == true) {
                curSession.admin = {
                  dataUser: {
                    total: [],
                    select: [],
                  },
                  dataModule: {
                    total: [],
                    select: [],
                  },
                };
              }
              initMenu();
              modalClose();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        $("#error").attr("style", "display:block;");
        $("#error").text(value.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function logout() {
  curSession = {};
  initMenu();
}
