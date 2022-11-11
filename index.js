const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("./db/test.db");
console.log("Hello, world!");
