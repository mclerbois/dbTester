var appDB = new Vue({
  el: "#appDB", // id de l'élément sur lequel porte la vue

  data: {
    sgdbr: {},
    ndb: 0,
    dbList: [],
    dbName: "",
    sqlString: "show tables;",
    dbSelected: "",
    tabSelected: "",
    tables: [],
    sqlTxt: ``
  },
  methods: {
    init: function() {
      if (localStorage.getItem("alasql") != null) {
        var sgdbr = JSON.parse(localStorage.getItem("alasql"));
        sgdbr.length = 0;
        this.dbList = [];
        this.ndb = 0;
        for (var db in sgdbr.databases) {
          this.ndb++;
          this.dbList.push(db);
        }
        this.dbSelected = this.dbList[0];
        this.select(this.dbSelected);
      } else {
        localStorage.clear();
      }
    },

    killAllDB: function() {
      if (
        confirm(
          "Action irréversible, toutes les bases de données vont être effacée"
        )
      ) {
        this.ndb = 0;
        this.dbList = [];
        localStorage.clear();
        location.reload();
      }
    },

    killDB: function(dbName) {
      if (
        confirm(
          "Action irréversible, toutes les bases de données vont être effacée"
        )
      ) {
        // echo("kill " + dbName);
        var sqlStr = `
        DROP localStorage DATABASE ${dbName} ;`;
        //echo(sqlStr);
        alasql(sqlStr);
        this.init();
      }
    },
    newDB: function() {
      if (this.dbName == "") return;
      if (this.dbList.indexOf(this.dbName) != -1) return;
      var sqlStr = `CREATE localStorage DATABASE IF NOT EXISTS ${this.dbName};`;
      this.sqlFix(sqlStr);
      alasql(sqlStr);
      this.init();
    },
    sqlFix: function(sqlStr) {
      //return sqlStr;
      if (sqlStr.indexOf("localStorage") != -1) return sqlStr;

      if (
        sqlStr.toUpperCase().indexOf("CREATE") == -1 &&
        sqlStr.toUpperCase().indexOf("DROP") == -1
      )
        return sqlStr;

      if (sqlStr.toUpperCase().indexOf("DATABASE") == -1) return sqlStr;

      var sql = sqlStr.split(" ");

      var xsql = sql.filter(function(v) {
        return v.length > 0;
      });

      sqlStr = xsql[0] + " localStorage";
      for (var i = 1; i < sql.length; i++) sqlStr = sqlStr + " " + xsql[i];
      return sqlStr;
    },
    doSqlStr: function() {
      var sql = this.sqlFix(this.sqlString);
      var result = alasql(sql);
      this.init();
      for (var i = 0; i < result.length; i++) {
        var s = "";
        for (var f in result[i]) {
          s = s + f + " : " + result[i][f] + "\t";
        }
        echo(s);
      }
    },
    doSqlTxt: function() {
      var el = document.getElementById("sqlText");
      var sql = this.sqlFix(el._value); //.split("\n");
      //echo(sql);
      alasql(sql);
      this.init();
      location.reload();
    },
    select: function(x) {
      if (typeof x == "undefined") return;
      var sql = "ATTACH localStorage DATABASE " + x + "; USE " + x + ";";
      alasql(sql);
      var result = alasql("SHOW TABLES;");
      var s = [];
      for (var i = 0; i < result.length; i++) {
        s.push(result[i].tableid);
      }
      this.tables = s;
      this.selectTab(this.tables[0]);
    },
    selectTab: function(tab) {
      if (typeof tab == "undefined") return;
      this.sqlString = "SELECT * from " + tab + " ;";
    }
  }
});
