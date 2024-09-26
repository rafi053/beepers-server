import express from 'express';
import beepersRoute from "./routes/beepersRouter.js";
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const port = 3000;
app.use(express.json());
app.use('/api/beepers', beepersRoute);
app.listen(port, () => {
    console.log(`server listen to port:  ${port}`);
});
