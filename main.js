const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./db/test.db", err => {
  if (err) console.error(err.message);
  console.log("Connected to database.");
});

const petTableSQL = `CREATE TABLE IF NOT EXISTS Pet (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT NOT NULL,
  owner_id INTEGER,
  FOREIGN KEY (owner_id) REFERENCES Owner (id)
)`;
const ownTableSQL = `CREATE TABLE IF NOT EXISTS Owner (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  phone INTEGER NOT NULL,
  address TEXT
)`;
const vetTableSQL = `CREATE TABLE IF NOT EXISTS Veterinarian (
  id INTEGER PRIMARY KEY,
  name text
)`;
// NOTE: We will apply UNIX epoch time in our table!
const appTableSQL = `CREATE TABLE IF NOT EXISTS Appointment (
  id INTEGER PRIMARY KEY,
  date INTEGER NOT NULL,
  pet_id INTEGER NOT NULL,
  vet_id INTEGER NOT NULL,
  FOREIGN KEY (vet_id) REFERENCES Veterinarian (id),
  FOREIGN KEY (pet_id) REFERENCES Pet (id)
)`;

db.serialize(() => {
  db.run(petTableSQL, err => {
    if (err) console.error(err.message);
  });
  db.run(vetTableSQL, err => {
    if (err) console.error(err.message);
  });
  db.run(ownTableSQL, err => {
    if (err) console.error(err.message);
  });
  db.run(appTableSQL, err => {
    if (err) console.error(err.message);
  });
});

db.close((err) => {
  if (err) console.error(err.message);
  console.log("Closed database connection.");
});
