require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { testDatabaseConnection } = require("./dbConnection");
const { infoLog, errorLog } = require("./utils/extra/logs");
require("./models/models");

const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/authRoute");
const roleRouter = require("./routes/roleRoute");
const userRoute = require("./routes/userRoute");

app.use("/api", authRoute);
app.use("/api", roleRouter);
app.use("/api", userRoute);

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
