const AUTH_SESSION_KEY = "auth";
class Helper {
  getAuthSession = () => {
    const sessionJson = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!!sessionJson) return JSON.parse(sessionJson);
    return null;
  };

  setAuthSession = (value: any) =>
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(value));

  removeItemSession = (key: string) => {
    sessionStorage.removeItem(key);
  };

  clearSession = () => sessionStorage.clear();
}

export default new Helper();
