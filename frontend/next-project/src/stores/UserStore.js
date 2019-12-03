import { observable, decorate } from "mobx";

class UserStore {
  currentUser = {
    name: "none",
    id: -1,
    profile_picture: "",
    email: "",
    loggedIn: false,
    latitude: "",
    longtitude: "",
    skills: ""
  };

  login = (
    name,
    id,
    profile_picture,
    email,
    access_token,
    latitude,
    longtitude,
    skills
  ) => {
    this.currentUser.name = name;
    this.currentUser.id = id;
    this.currentUser.profile_picture = profile_picture;
    this.currentUser.email = email;
    this.currentUser.loggedIn = true;
    this.currentUser.latitude = latitude;
    this.currentUser.longtitude = longtitude;
    this.currentUser.skills = skills;
    localStorage.setItem("userName", JSON.stringify(name));
    localStorage.setItem("userID", JSON.stringify(id));
    localStorage.setItem("userPic", JSON.stringify(profile_picture));
    localStorage.setItem("userEmail", JSON.stringify(email));
    localStorage.setItem("userToken", access_token);
    localStorage.setItem("userLatitude", JSON.stringify(latitude));
    localStorage.setItem("userLongtitude", JSON.stringify(longtitude));
    localStorage.setItem("userSkills", JSON.stringify(skills));
    // localStorage.setItem('userLatitude', 3.081580) //test values for Geolocation
    // localStorage.setItem('userLongtitude', 101.583552) //test values for Geolocation
  };

  logout = () => {
    this.currentUser.name = "none";
    this.currentUser.id = -1;
    this.currentUser.profile_picture = "";
    this.currentUser.email = "";
    this.currentUser.loggedIn = false;
    this.currentUser.latitude = "";
    this.currentUser.longtitude = "";
    this.currentUser.skills = "";
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    localStorage.removeItem("userPic");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userLatitude");
    localStorage.removeItem("userLongtitude");
    localStorage.removeItem("userSkills");
  };

  checkUserLoggedIn = () => {
    const name = JSON.parse(localStorage.getItem("userName"));
    const token = localStorage.getItem("userToken");
    if (name && token) {
      this.currentUser.name = name;
      this.currentUser.id = JSON.parse(localStorage.getItem("userID"));
      this.currentUser.profile_picture = JSON.parse(
        localStorage.getItem("userPic")
      );
      this.currentUser.email = JSON.parse(localStorage.getItem("userEmail"));
      this.currentUser.latitude = JSON.parse(
        localStorage.getItem("userLatitude")
      );
      this.currentUser.longtitude = JSON.parse(
        localStorage.getItem("userLongtitude")
      );
      this.currentUser.skills = JSON.parse(localStorage.getItem("userSkills"));
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
