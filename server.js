require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ExpressPeerServer } = require("peer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const http = require("http").createServer(app);

ExpressPeerServer(http, { path: "/" });

app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/newsRouter"));

const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./actlip-frontend/build", "index.html"));
// });

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log("Server is running on port", port);
});
