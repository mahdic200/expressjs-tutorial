import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import api from "@/routes/api";
import sequelize from "@/db";

sequelize.authenticate()
.then(() => console.log('Connection has been stablished successfully.'))
.catch(e => console.error('Unable to connect to the database: ', e));

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/api', api);

app.listen(PORT, () => {
    console.log('Server has started on port : ', PORT)
})
