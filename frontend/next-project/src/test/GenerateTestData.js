import axios from "axios";
import { getApiRoute } from "../global";

/* Functions */

export const generateData = () => {
  getUser(8);
};

/* Token Config */

export const getTokenConfig = () => {
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
    .post(`${getApiRoute("sessions/")}signin`, {
      name: username,
      password: userpassword
    })
    .then(result => {
      const access_token = result.data.data.access_token;
      console.log(access_token);
      localStorage.setItem("userToken", access_token);
      localStorage.setItem("userData", JSON.stringify(username));
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
  const config = getTokenConfig();

  axios
    .post(
      `${getApiRoute("users/")}${id}`,
      {
        name: username,
        email: useremail,
        password: userpassword
      },
      config
    )
    .then(result => {
      console.log(result.data.data);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const signUpUser = () => {
  axios
    .post(`${getApiRoute("users/")}signup`, {
      name: "5",
      email: "5@email.com",
      password: "123"
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

export const createSkill = skill => {
  axios
    .post(`${getApiRoute("skills/create/")}`, {
      skill: skill
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
