require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { testDatabaseConnection } = require("./dbConnection");
const { infoLog, errorLog } = require("./utils/extra/logs");
require("./models/models");

const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/userRoute");
const roleRouter = require("./routes/roleRoute");

app.use("/api", userRouter);
app.use("/api", roleRouter);

const globalErrorMiddleware = require("./middlewares/errors/globalErrorMiddleware");

app.use(globalErrorMiddleware);

const startServer = async () => {
  await testDatabaseConnection();

  app.listen(PORT, () => {
    infoLog(`Server is working on PORT ${PORT}`);
  });
};

startServer().catch((error) => {
  errorLog("Error starting the server\n\t" + error.message);
});
