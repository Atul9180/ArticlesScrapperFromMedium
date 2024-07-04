import express from "express";
import cors from "cors";
import config from "./config.js";
import articleRoutes from "./routes/articleApi.js";

const app = express();

//Middleware to parse JSON bodies:
app.use(express.json());

//CORS configuration to allow request from frontend server:
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Mounting all API routes from the main router:
app.use("/", articleRoutes);

app.listen(config.port, () => {
  console.log("Server is running");
});
