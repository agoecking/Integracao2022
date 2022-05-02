import { createConnections } from "typeorm";

createConnections()
  .then(() => console.log("Database 👍"))
  .catch(error => console.log("ERROR =>", error));
