import axios from "axios";

const url = "https://sapphire-birthdays-server.herokuapp.com/api/user";
let timer: number;

export default {
  async signUp(
    context: any,
    userData: { email: string; password: string }
  ): Promise<void> {
    await axios.post(url + "/signup", userData).then((res) => {
      if (res.status === 201) {
        context.dispatch("signIn", userData);
      }
    });
  },
  async signIn(
    context: any,
    userData: { email: string; password: string }
  ): Promise<void> {
    await axios.post(url + "/login", userData).then((res) => {
      if (res.status === 200) {
        const expiresIn = +res.data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", userData.email);
        localStorage.setItem("tokenExpiration", expirationDate.toString());
        timer = setTimeout(() => {
          context.dispatch("logout");
        }, expiresIn);
        context.commit("signUserIn", {
          user: {
            signedIn: true,
            email: userData.email,
            token: res.data.token,
          },
        });
      } else if (res.status === 404) {
        alert("could not find user");
      }
    });
  },
  autoLogIn(context: any): void {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (token && tokenExpiration) {
      const expiresIn = +tokenExpiration - new Date().getTime();
      if (expiresIn > 0) {
        timer = setTimeout(() => {
          context.dispatch("logout");
        }, expiresIn);
        context.commit("signUserIn", {
          user: {
            signedIn: true,
            email: localStorage.getItem("email"),
            token: token,
          },
        });
      }
    }
  },
  logout(context: any): void {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("tokenExpiration");
    clearTimeout(timer);
    context.commit("logUserOut");
  }
};
