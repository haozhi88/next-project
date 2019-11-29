/* Configurations */
const LOCAL = true;
const LOCAL_ROUTE = "http://127.0.0.1:5000/api/v1/";
const SERVER_ROUTE = "https://meetmymentor02.herokuapp.com/api/v1/";

/* Constants */
export const VERSION = 1;

export const route = {
  close: 0,
  inboxListPage: 1,
  eventListPage: 2,
  teachListPage: 3,
  learnListPage: 4,
  bookmarkListPage: 5,
  signinPage: 6,
  signupPage: 7,
  profilePage: 8,
  lessonPage: 9,
  createLearnPage: 10,
  createTeachPage: 11,
  createEventPage: 12,
  ratingPage: 13,
  eventPage: 14,
  versionPage: 15,
  todo: 16
};

export const subTitle = [
  "", //0
  "Inbox", //1
  "Event List", //2
  "Teach List", //3
  "Learn List", //4
  "Bookmark List", //5
  "Sign In", //6
  "Sign Up", //7
  "Profile", //8
  "Lesson", //9
  "Create Learn", //10
  "Create Teach", //11
  "Create Event", //12
  "Rating", //13
  "Event", //14
  "Version", //15
  "Todo" //16
];

export const getApiRoute = route => {
  return (LOCAL ? LOCAL_ROUTE : SERVER_ROUTE) + route;
};
