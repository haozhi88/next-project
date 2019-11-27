import axios from "axios";

/* Functions */

export const generateData = () => {
  getAllLessons();
};

export const signin = () => {
  const name = "111";
  const password = "123";
  signInUser(name, password);
};

export const signout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userData");
};

export const editprofile = () => {
  const id = "8";
  const name = "1";
  const email = "1@email.com";
  const password = "123";
  updateUser(id, name, email, password);
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
    .post(`http://127.0.0.1:5000/api/v1/sessions/signin`, {
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
    .get(`http://127.0.0.1:5000/api/v1/users/`)
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
    .get(`http://127.0.0.1:5000/api/v1/users/${id}`)
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
      `http://127.0.0.1:5000/api/v1/users/${id}`,
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
    .post(`http://127.0.0.1:5000/api/v1/users/signup`, {
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
    .get(`http://127.0.0.1:5000/api/v1/lessons/`)
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
    .post(`http://127.0.0.1:5000/api/v1/skills/create`, {
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
    .get(`http://127.0.0.1:5000/api/v1/skills/`)
    .then(result => {
      const skills = result.data;
      console.log(skills);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};
