function loadUser() {
  app.get("users", curSession.token).then((value) => {
    for (i = 0; i < value.user.length; i++) {
      curSession.admin.dataUser.total.push(value.user[i]);
    }
    showUser();
  });
}

function showUser() {
  var rows;
  var actions = '<button id="more" onclick="modalOpen($(this))">More</button>';
  actions += '<button id="update" onclick="modalOpen($(this))">Edit</button>';
  actions += '<button id="delete">Delete</button>';
  var users = curSession.admin.dataUser.total;
  for (i = 0; i < users.length; i++) {
    rows += "<tr>";
    rows +=
      "<td><input id='id' type='hidden' value='" +
      users[i]["id"] +
      "'/>" +
      users[i]["name"] +
      "</td>";
    rows += "<td>" + users[i]["firstname"] + "</td>";
    rows += "<td>" + users[i]["mail"] + "</td>";
    rows += "<td>" + convertDate(users[i]["birth"], "date") + "</td>";
    rows += "<td>" + users[i]["login"] + "</td>";
    if (users[i]["isAdmin"] == true) {
      rows +=
        "<td><span class='statut' style='background:#f43636;'>Administrateur</span></td>";
    } else {
      rows +=
        "<td><span class='statut' style='background:rgb(7, 94, 165);'>Utilisateur</span></td>";
    }

    rows += "<td>" + convertDate(users[i]["createdAt"], "datetime") + "</td>";
    rows += "<td>" + convertDate(users[i]["updatedAt"], "datetime") + "</td>";
    rows += "<td>" + actions + "</td>";
    rows += "</tr>";
  }

  $("tbody").append(rows);
}
