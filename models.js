class Column {
  constructor(name, type,
	      pk=false, nullable=true,
	      unique=false, references=null) {
    this.name = name;
    this.type = type;
    this.pk = pk;
    this.nullable = nullable;
    this.unique = unique;
    this.references = references;
  }
  static from = (obj) =>
    new Column(obj.name, obj.type, obj.pk, obj.nullable, obj.unique);
}

class Model {
  constructor(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns.map(col => Column.from(col));
  }
  _handleComma = (i) => !i ? "" : ",";
  sqlCreate = () => {
    return this.columns.reduce((cmd, col, i) => {
      const nameType = ` ${this._handleComma(i)} ${col.name} ${col.type}`;
      const pk = col.pk ? "PRIMARY KEY" : "";
      const nullable = col.nullable ? "" : "NOT NULL";
      const unique = col.unique ? "UNIQUE" : "";
      return cmd += nameType + pk + nullable + unique;
    }, `CREATE TABLE IF NOT EXISTS ${this.tableName} (`) + ")";
  }
}

const Pet = new Model("Pet", [
  {name:"id", type:"INTEGER", pk:true},
  {name:"name", type:"TEXT"},
  {name:"species", type:"TEXT"},
  {name:"breed", type:"TEXT"},
  {name:"owner_id", type:"INTEGER"}
]);

console.log(Pet.sqlCreate());
