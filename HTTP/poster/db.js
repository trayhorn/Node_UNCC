// A sample object here would look like
// {userId: 1, token: 1235324123}
const SESSIONS = [];

const USERS = [
  {
    id: 1,
    name: "Liam Brown",
    username: "liam23",
    password: "string",
  },
  {
    id: 2,
    name: "Liam Green",
    username: "green23",
    password: "string",
  },
  {
    id: 3,
    name: "Ben Poet",
    username: "poet007",
    password: "string",
  },
];

const POSTS = [
  {
    id: 1,
    title: "My title",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non felis sit amet risus luctus finibus a non lorem. Morbi ac diam accumsan, tincidunt ipsum et, auctor urna. Sed et nisl eget ex lacinia porta. Ut tempus ullamcorper ante id venenatis. Nulla vehicula commodo sollicitudin. Sed ac sodales arcu. Ut gravida sit amet elit eget sollicitudin. Sed efficitur fermentum tincidunt.",
    userId: 1,
  },
];

module.exports = { SESSIONS, USERS, POSTS };