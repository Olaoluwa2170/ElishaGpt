const app = require("./index.ts");
const serverless = require("serverless-http");

module.exports = serverless(app);