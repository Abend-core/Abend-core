class Application {
  constructor(path) {
    this.path = path;
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
