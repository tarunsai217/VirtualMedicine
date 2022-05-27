const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const gateway = require("fast-gateway");
const server = gateway({
  routes: [
    {
      prefix: "user",
      target: "http://user-service:8020",
    },
    {
      prefix: "appointments",
      target: "http://appt-service:8091",
    },
    {
      prefix: "schedule",
      target: "http://schedule-service:8090",
    },
    {
      prefix: "video",
      target: "http://video-server:5000",
    },
    {
      prefix: "chat",
      target: "http://chat-server:3030",
    },
    {
      prefix: "",
      target: "http://virtualmedicine:3000",
    },
  ],
});

// const { ROUTES } = require("./routes");
// const { setupProxies } = require("./proxy");

const corsOptions = {
  origin: ["http://localhost:3003", "http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// setupProxies(app, ROUTES);

server.start(port);
