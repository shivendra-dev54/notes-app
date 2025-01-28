const express = require("express");
const notesRouter = require("./Routes/notesRouter");
const userRouter = require("./Routes/userRouter");
const dbConnect = require("./Config/dbConnect");
const errorHandler = require("./Middleware/errorHandler");
const corsHandler = require("./Middleware/corsHandler");
require('dotenv').config();

//for handling CORS

const app = express();
app.use(corsHandler);
app.use(express.json());
app.use(errorHandler);
dbConnect();
app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});