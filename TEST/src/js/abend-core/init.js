var curSession;
var app;
$(document).ready(function () {
  init();
});
function init() {
  app = new Application("http://localhost:5000/");
}
