import { observable, decorate } from "mobx";

class UserStore {
  currentUser = {
    name: "none",
    id: -1,
    profile_picture: "",
    email: "",
    loggedIn: false
  };

  login = (name, id, profile_picture, email, access_token) => {
    this.currentUser.name = name;
    this.currentUser.id = id;
    this.currentUser.profile_picture = profile_picture;
    this.currentUser.email = email;
    this.currentUser.loggedIn = true;
    localStorage.setItem("userName", JSON.stringify(name));
    localStorage.setItem("userID", JSON.stringify(id));
    localStorage.setItem("userPic", JSON.stringify(profile_picture));
    localStorage.setItem("userEmail", JSON.stringify(email));
    localStorage.setItem("userToken", access_token);
  };

  logout = () => {
    this.currentUser.name = "none";
    this.currentUser.id = -1;
    this.currentUser.profile_picture = "";
    this.currentUser.email = "";
    this.currentUser.loggedIn = false;
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    localStorage.removeItem("userPic");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userToken");
  };

  checkUserLoggedIn = () => {
    const name = JSON.parse(localStorage.getItem("userName"));
    const id = JSON.parse(localStorage.getItem("userID"));
    const profile_picture = JSON.parse(localStorage.getItem("userPic"));
    const email = JSON.parse(localStorage.getItem("userEmail"));
    const token = localStorage.getItem("userToken");
    if (name && token) {
      console.log("already signed in");
      this.currentUser.name = name;
      this.currentUser.id = id;
      this.currentUser.profile_picture = profile_picture;
      this.currentUser.email = email;
      this.currentUser.loggedIn = true;
    }
  };

  getToken = () => {
    const token = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    return config;
  };
}

decorate(UserStore, {
  currentUser: observable
});

const userStore = new UserStore();

export default userStore;
