function modalOpen(obj) {
  $("#modal").show();
  $("#modal-core").load("../modals/" + $(obj).attr("id") + ".html");
  var ligne = $(obj).closest("tr");
  var id = $("#id", ligne);
}

function modalClose() {
  $("#modal").hide();
}
