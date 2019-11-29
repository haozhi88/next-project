import { observable, decorate } from "mobx";

class UserStore {
  currentUser = {
    name: "none",
    id: -1,
    profile_picture: "",
    email: "",
    loggedIn: false
  };

  login = (name, id, profile_picture, email) => {
    // Just hardcode for now to demonstrate function
    // Use axios call later
    this.currentUser.name = name;
    this.currentUser.id = id;
    this.currentUser.profile_picture = profile_picture;
    this.currentUser.email = email;
    this.currentUser.loggedIn = true;
  };

  logout = () => {
    // Just hardcode for now to demonstrate function
    // Use axios call later
    this.currentUser.name = "none";
    this.currentUser.id = -1;
    this.currentUser.profile_picture = "";
    this.currentUser.email = "";
    this.currentUser.loggedIn = false;
  };
}

decorate(UserStore, {
  currentUser: observable
});

const userStore = new UserStore();

export default userStore;
