require("dotenv").config()

module.exports = {
  "development": {
    "username": "root",
    "password": "Noelrr01",
    "database": "casus_db",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "dialect": "mysql",
    "use_env_variable": "JAWSDB.URL"
  }
}
