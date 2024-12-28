class Application {
  constructor(path) {
    this.path = path;
  }
  getPath() {
    return this.path;
  }
  get(route, data) {
    return fetch(this.getPath() + route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
  post(route, data) {
    return fetch(this.getPath() + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
