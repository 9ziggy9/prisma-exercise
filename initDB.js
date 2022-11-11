// TABLE COMMANDS
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
  phone INTEGER NOT NULL UNIQUE,
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

// INSERTION COMMANDS
const ownSeedSQL =  `INSERT INTO Owner (name, phone, address) VALUES
  ("Ziggy", 5552349999, "123 Hello Lane"),
  ("Soon-Mi", 5552349922, "321 World Street"),
  ("Adrian", 5551108765, "312 Degraf Way")`;
const vetSeedSQL = `INSERT INTO Veterinarian (name) VALUES
  ("Alice"),
  ("Bob")`;
const petSeedSQL = `INSERT INTO Pet (name, species, breed, owner_id) VALUES
  ("Charlie", "cat", "Tabby", 1),
  ("Echo", "cat", "DSH", 1),
  ("Puppers", "dog", "German Shepherd", 2),
  ("Bubbles", "fish", "Goldfish", 3)`;
const appSeedSQL = `INSERT INTO Appointment (vet_id, pet_id, date) VALUES
  (1, 2, strftime("%s", "now")),
  (3, 1, strftime("%s", "now"))`;

function init(db) {
  db.serialize(() => {
    ["Pet", "Appointment", "Owner", "Veternarian"].forEach((tbl) => {
      db.run(`DROP TABLE IF EXISTS ${tbl}`, err => {
	console.log(`DROPPING TABLE: ${tbl}`);
	if (err) console.error(err.message);
      });
    });
    [petTableSQL, vetTableSQL, ownTableSQL, appTableSQL].forEach((sql) => {
      db.run(sql, err => {
	console.log(sql);
	if (err) console.error(err.message);
      });
    });
    [ownSeedSQL, vetSeedSQL, petSeedSQL, appSeedSQL].forEach((sql) => {
      db.run(sql, err => {
	console.log(sql);
	if (err) console.error(err.message);
      });
    });
  });
}

module.exports = init;
