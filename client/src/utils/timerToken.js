export const startTokenTimer = (token, router, authStore) => {
  const expirationTime = 60 * 60 * 1000;
  const tokenExpirationTime = Date.now() + expirationTime;

  sessionStorage.setItem("tokenExpirationTime", tokenExpirationTime);

  const checkTokenExpiration = () => {
    const storedExpirationTime = sessionStorage.getItem("tokenExpirationTime");
    if (storedExpirationTime && Date.now() > storedExpirationTime) {
      authStore.logout();
      router.push("/");
    }
  };

  setTimeout(() => {
    checkTokenExpiration();
  }, expirationTime);
};
