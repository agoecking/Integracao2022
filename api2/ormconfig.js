module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "localhostRoot",
  database: "trabdeconto",
  entities: [
    "./src/database/schemas/*.ts"
  ],
  synchronize: true,
  useUnifiedTopology: true,
}
