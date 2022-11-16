const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("../2dArt/src/routes/routes");

const PATH = "src/config/.env";

dotenv.config({ path: PATH });

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/", cors(), routes);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server starting in ${port} `));
