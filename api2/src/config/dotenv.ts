import dotenv from "custom-env";

switch (process.env.NODE_ENV) {
  case "development":
    dotenv.env("development");
    break;
  default:
    dotenv.env("token");
    break;
}
