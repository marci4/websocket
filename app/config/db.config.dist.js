module.exports = {
    HOST: "ps2alerts-db",
    USER: "root",
    PASSWORD: "foobar",
    DB: "ps2alertsWS",
    dialect: "mysql",
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};