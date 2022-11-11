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

const selectOwnerFromAppsSQL = `SELECT (Owner.name) FROM OWNER
  JOIN PET ON Pet.owner_id = Owner.id
  JOIN Appointment ON Appointment.pet_id = Pet.id
  JOIN Veterinarian ON Appointment.vet_id = Veterinarian.id
  WHERE Veterinarian.name = "Alice"`;

db.all(selectOwnerFromAppsSQL, (err, rows) => {
  console.log(selectOwnerFromAppsSQL);
  console.log(rows);
  if (err) console.error(err.message);
});

db.close((err) => {
  if (err) console.error(err.message);
  console.log("Closed database connection.");
});
