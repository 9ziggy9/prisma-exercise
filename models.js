class MappingClient {
  constructor(db) {
    this.db = db;
    this.models = [];
  }
  registerModels = (...models) =>
    this.models = this.models = [...this.models, ...models];
  init = () => {
    if (this.models.length === 0) console.error("NO MODELS DEFINED");
    else this.models
      .map(model => model.sqlCreate())
      .forEach(cmd => this.db.run(cmd, err => {
	console.log(cmd);
	if (err) console.error(err.message);
      }));
  }
  exit = () => {
    this.db.close(err => {
      if (err) console.error(err.message);
      console.log("Closed database connection.");
    });
  }
}

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
      const pk = col.pk ? " PRIMARY KEY" : "";
      const nullable = col.nullable ? "" : " NOT NULL";
      const unique = col.unique ? " UNIQUE" : "";
      return cmd += nameType + pk + nullable + unique;
    }, `CREATE TABLE IF NOT EXISTS ${this.tableName} (`) + ")";
  };
}

module.exports = {MappingClient, Model};
