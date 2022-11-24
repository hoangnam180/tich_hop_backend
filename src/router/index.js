const userRouter = require("./users");
const siteRouter = require("./site");
const initWebRoute = (app) => {
  app.use("/", siteRouter);
  app.use("/api/v1/user", userRouter);
};

module.exports = initWebRoute;
