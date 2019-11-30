import axios from "axios";
import { getApiRoute, VERSION } from "../global";

/* Functions */
export const generateData = () => {
  // getVersion();
  // getAllUsers();
  // getAllLessons();
  // getAllSkills();
  // getUser(3);
  // getAllEvents();
  // generateSkillList();
  generateLessonList();
  // getAllLessonsWithFilter(false);
  // createLesson("Machine Learning", "no description", "True", 3);
  // signUpUser("test1112", "test1112@email.com", "123");
  // createEvent(4, 13, "2019-11-26 14:58:03.603560");
};

/* Token Config */
const getTokenConfig = () => {
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  return config;
};

/* Session */
export const signInUser = (username, userpassword) => {
  axios
    .post(`${getApiRoute("sessions/signin")}`, {
      name: username,
      password: userpassword
    })
    .then(result => {
      const id = result.data.data.id;
      const name = result.data.data.name;
      const profile_picture = result.data.data.profile_picture;
      const email = result.data.data.email;
      const access_token = result.data.data.access_token;
      // console.log(access_token);
      localStorage.setItem("userName", JSON.stringify(name));
      localStorage.setItem("userID", JSON.stringify(id));
      localStorage.setItem("userPic", JSON.stringify(profile_picture));
      localStorage.setItem("userEmail", JSON.stringify(email));
      localStorage.setItem("userToken", access_token);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

/* User */
export const getAllUsers = () => {
  axios
    .get(`${getApiRoute("users/")}`)
    .then(result => {
      const users = result.data;
      console.log(users);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const getUser = id => {
  axios
    .get(`${getApiRoute("users/")}${id}`)
    .then(result => {
      const user = result.data;
      console.log(user);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const updateUser = (id, username, useremail, userpassword) => {
  axios
    .post(
      `${getApiRoute("users/")}${id}`,
      {
        name: username,
        email: useremail,
        password: userpassword
      },
      getTokenConfig()
    )
    .then(result => {
      console.log(result.data.data);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const signUpUser = (newName, newEmail, newPassword) => {
  axios
    .post(`${getApiRoute("users/")}signup`, {
      name: newName,
      email: newEmail,
      password: newPassword
    })
    .then(result => {
      console.log(result.data.data);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

/* Lessons */
export const getAllLessons = () => {
  axios
    .get(`${getApiRoute("lessons/")}`)
    .then(result => {
      const lessons = result.data;
      console.log(lessons);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const getAllLessonsWithFilter = teach => {
  axios
    .get(`${getApiRoute("lessons/filter?")}teach=${teach}`)
    .then(result => {
      const lessons = result.data;
      console.log(lessons);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const generateLessonList = () => {
  signInUser("test1112", "123");
  createLesson("Guitar", "Teach you how to play guitar in 5 mins", "false", 2);
  createLesson("Coding", "Teach you how to code in 5 seconds", "false", 2);
  createLesson(
    "Dancing",
    "Want to learn how to dance like Michael Jackson",
    "False",
    1
  );
  // signInUser("desmond", "123");
  // createLesson("Singing", "Teach you how to sing with your nose", "True", 2);
  // signInUser("melissa", "123");
  // createLesson("Sleeping", "No need to teach", "True", 3);
  // createLesson("Dota", "Want to learn how to play Dota", "False", 3);
  // createLesson(
  //   "Football",
  //   "Want to learn how to kick freekick like David Beckham",
  //   "False",
  //   3
  // );
};

export const createLesson = (newtitle, newdescription, newteach, newskill) => {
  let formData = new FormData();
  formData.append("title", newtitle);
  formData.append("description", newdescription);
  formData.append("skill", newskill);
  formData.append("teach", newteach);
  formData.append("image", null);

  axios
    .post(`${getApiRoute("lessons/create")}`, formData, getTokenConfig())
    .then(result => {
      console.log(result.data.data);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

/* Skills */
export const generateSkillList = () => {
  createSkill("Computer Science");
  createSkill("Cooking");
  createSkill("Literature");
  createSkill("Biology");
  createSkill("Chemistry");
  createSkill("Physics");
  createSkill("Language");
  createSkill("Mathematics");
  createSkill("Information Technology");
  createSkill("Travel");
  createSkill("Geography");
  createSkill("Health and Fitness");
};

export const createSkill = newSkill => {
  axios
    .post(`${getApiRoute("skills/create")}`, {
      skill: newSkill
    })
    .then(result => {
      console.log(result.data.data);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const getAllSkills = () => {
  axios
    .get(`${getApiRoute("skills/")}`)
    .then(result => {
      const skills = result.data;
      console.log(skills);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

/* Events */
export const getAllEvents = () => {
  axios
    .get(`${getApiRoute("events/")}`, getTokenConfig())
    .then(result => {
      const events = result.data.data;
      console.log(events);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const createEvent = (newLessonId, newUserId, newStartDatetime) => {
  axios
    .post(
      `${getApiRoute("events/create")}`,
      {
        lesson_id: newLessonId,
        user_id: newUserId,
        start_datetime: newStartDatetime
      },
      getTokenConfig()
    )
    .then(result => {
      console.log(result.data.data);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

/* Versions */
export const getVersion = () => {
  axios
    .get(`${getApiRoute("versions/")}`)
    .then(result => {
      const version = "v" + VERSION + "." + result.data; // v{frontend ver}.{backend ver}
      return version;
    })
    .catch(error => {
      console.log("ERROR: ", error);
      return "Version Error";
    });
};
