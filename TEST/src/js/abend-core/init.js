var curSession;
var app;
$(document).ready(function () {
  init();
});
function init() {
  app = new Application("http://localhost:5000/");
}

function initMenu() {
  if (curSession.token) {
    if (curSession.test.admin == true) {
      $("#nav").append(
        '<div class="nav-item" id="admin" onclick="initPage(admin)">Admin</div>'
      );
    }
    $("#nav").append(
      '<div class="nav-item" id="profil" onclick="">Profil</div>'
    );
    $("#nav").append(
      '<div class="nav-item" id="logout" onclick="logout()">Déconnexion</div>'
    );
    $("#login", "#nav").remove();
  } else {
    $("#nav").append(
      '<div class="nav-item" id="login" onclick="modalOpen($(this))">Connexion</div>'
    );
    $("#admin", "#nav").remove();
    $("#profil", "#nav").remove();
    $("#logout", "#nav").remove();
  }
}

function initPage(page) {
  if (page == admin) {
    $("#content").load("../pages/admin/index.html", function () {
      $("#admin-content").load("../pages/admin/user.html");
      loadUser();
    });
  }
}
