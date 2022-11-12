const sqlite3 = require("sqlite3");
const {MappingClient, Model} = require("./models");

const orm = new MappingClient(new sqlite3.Database("./db/test.db", err => {
  if (err) console.error(err.message);
  console.log("Connected to database.");
}));

const Pet = new Model("Pet", [
  {name:"id", type:"INTEGER", pk:true},
  {name:"name", type:"TEXT", nullable:false},
  {name:"species", type:"TEXT"},
  {name:"breed", type:"TEXT"},
  {name:"owner_id", type:"INTEGER"}
]);

const Owner = new Model("Owner", [
  {name: "id", type:"INTEGER", pk:true},
  {name: "name", type:"TEXT", nullable:false},
  {name: "phone", type:"INTEGER", nullable:false, unique:true},
  {name: "address", type:"TEXT"}
]);

const Veterinarian = new Model("Veterinarian", [
  {name: "id", type:"INTEGER", pk:true},
  {name: "name", type:"TEXT", nullable:false},
]);

const Appointment = new Model("Appointment", [
  {name: "id", type:"INTEGER", pk:true},
  {name: "vet_id", type:"INTEGER", nullable:false},
  {name: "pet_id", type:"INTEGER", nullable:false},
]);

orm.registerModels(Pet, Owner, Appointment, Veterinarian);
orm.init();
orm.exit();
