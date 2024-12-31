function loadUser() {
  app.get("users", curSession.token).then((value) => {
    var rows;
    var actions =
      '<button id="more" onclick="modalOpen($(this))">More</button>';
    actions += '<button id="update" onclick="modalOpen($(this))">Edit</button>';
    actions += '<button id="delete">Delete</button>';

    for (i = 0; i < value.user.length; i++) {
      rows += "<tr>";
      rows +=
        "<td><input id='id' type='hidden' value='" +
        value.user[i]["id"] +
        "'/>" +
        value.user[i]["name"] +
        "</td>";
      rows += "<td>" + value.user[i]["firstname"] + "</td>";
      rows += "<td>" + value.user[i]["mail"] + "</td>";
      rows += "<td>" + convertDate(value.user[i]["birth"], "date") + "</td>";
      rows += "<td>" + value.user[i]["login"] + "</td>";
      if (value.user[i]["isAdmin"] == true) {
        rows +=
          "<td><span class='statut' style='background:#f43636;'>Administrateur</span></td>";
      } else {
        rows +=
          "<td><span class='statut' style='background:rgb(7, 94, 165);'>Utilisateur</span></td>";
      }

      rows +=
        "<td>" + convertDate(value.user[i]["createdAt"], "datetime") + "</td>";
      rows +=
        "<td>" + convertDate(value.user[i]["updatedAt"], "datetime") + "</td>";
      rows += "<td>" + actions + "</td>";
      rows += "</tr>";
    }

    $("tbody").append(rows);
  });
}
