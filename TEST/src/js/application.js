class Application {
  constructor(path) {
    this.path = path;
    this.menu = false;
  }
  getPath() {
    return this.path;
  }
  get(route, token) {
    return fetch(this.getPath() + route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((responseData) => {
        return responseData;
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error);
      });
  }
  post(route, data, token) {
    return fetch(this.getPath() + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        return responseData;
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error);
      });
  }
}

function convertDate(date, format) {
  var split = date.split("-");
  var jour = split[2];
  jour = jour.substr(0, 2);
  var mois = split[1];
  var annee = split[0];
  if (format.includes("time")) {
    var temps = split[2];
    temps = temps.split(":");
    var heure = temps[0];
    heure = heure.substr(-2, 2);
    var minute = temps[1];
    var seconde = temps[2];
    seconde = seconde.substr(0, 2);
    if (format == "datetime") {
      return (
        jour +
        "/" +
        mois +
        "/" +
        annee +
        " " +
        heure +
        ":" +
        minute +
        ":" +
        seconde
      );
    } else if (format == "time") {
      return heure + ":" + minute + ":" + seconde;
    }
  } else {
    return jour + "/" + mois + "/" + annee;
  }
}
