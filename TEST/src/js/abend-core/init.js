var curSession;
var app;
$(document).ready(function () {
  init();
});
function init() {
  app = new Application("http://localhost:5000/");
}

function initMenu() {
  if (curSession.test.admin == true) {
    $("#nav").append('<div class="nav-item" id="admin">Admin</div>');
  }
  $("#nav").append('<div class="nav-item" id="logout">Déconnexion</div>');
  $("#login", "#nav").remove();
}
