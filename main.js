const sqlite3 = require("sqlite3");
const initDB = require("./initDB");

const db = new sqlite3.Database("./db/test.db", err => {
  if (err) console.error(err.message);
  console.log("Connected to database.");
});

if (process.argv[2] === "INIT") {
  console.log("Initializing database...");
  initDB(db);
}

db.close((err) => {
  if (err) console.error(err.message);
  console.log("Closed database connection.");
});
