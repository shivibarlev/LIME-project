module.exports = {
  HOST: "localhost",
  PORT: 5432,
  USER: "postgres",
  PASSWORD: "1qaz@WSX",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};