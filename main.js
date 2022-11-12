const sqlite3 = require("sqlite3");
const {MappingClient, Model} = require("./models");

const orm = new MappingClient(new sqlite3.Database("./db/test.db", err => {
  if (err) console.error(err.message);
  console.log("Connected to database.");
}));

const Pet = new Model("Pet", [
  {name:"id", type:"INTEGER", pk:true},
  {name:"name", type:"TEXT", nullable:false},
  {name:"species", type:"TEXT", unique:true},
  {name:"breed", type:"TEXT"},
  {name:"owner_id", type:"INTEGER"}
]);

orm.registerModels(Pet);
orm.init();
orm.exit();
