const fs = require("node:fs");

const usersPath = "./data/users";
const sessionsPath = "./data/sessions";
const videoPath = "./data/videos";

class DB {
  constructor() {
    this.users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
    this.sessions = JSON.parse(fs.readFileSync(sessionsPath, "utf8"));
    this.videos = JSON.parse(fs.readFileSync(videoPath, "utf-8"));
  }

  update() {
    this.users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
    this.sessions = JSON.parse(fs.readFileSync(sessionsPath, "utf8"));
    this.videos = JSON.parse(fs.readFileSync(videoPath, "utf-8"));
  }

  save() {
    fs.writeFileSync(usersPath, JSON.stringify(this.users));
    fs.writeFileSync(sessionsPath, JSON.stringify(this.sessions));
    fs.writeFileSync(videoPath, JSON.stringify(this.videos));
  }
}

const db = new DB();

module.exports = db;
