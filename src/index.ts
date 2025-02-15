import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import api from "@/routes/api";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded());

app.use('/api', api);

app.listen(PORT, () => {
    console.log('Server has started on port : ', PORT)
})
