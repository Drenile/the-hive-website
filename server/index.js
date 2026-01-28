const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");

dotenv.config();

const app = express();

//midlleware
app.use(cors());
app.use(express.json());

//test route (IMPORTANT)
app.get("api/test", async (req, res) => {
    try{
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

const PORT = process.env.PORT || 5000;
app.listen (PORT, () => {
    console.log(`server has started on port ${PORT}`);
});