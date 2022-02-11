// Module
export const users = require("../models/data.js");
const { writeFileSync } = require("fs");

interface userz {
  id: number;
  fname: string;
  lname: string;
}

// Find User
export const findUser = (id: number) => {
  const singleUser = users.find((user: userz) => user.id === id);
  return singleUser;
};

// POST
export const addUser = (fname: string, lname: string) => {
  const user = users.slice(-1);
  const id = user[0].id + 1;
  users.push({ id, fname, lname });
  storeData();
};

// PUT
export const updateUser = (fname: string, lname: string, id: number) => {
  const index = users.findIndex((user: userz) => user.id === id);
  users[index].fname = fname;
  users[index].lname = lname;
  storeData();
};

//DELETE
export const deleteUser = (id: number) => {
  const index = users.findIndex((user: userz) => user.id === id);
  users.splice(index, 1);
  storeData();
};

export function storeData() {
  writeFileSync(
    "./models/data.js",
    `const users = ${JSON.stringify(users, null, 2)} \n module.exports = users`
  );
}
