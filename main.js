import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// routes
import Task from './routes/Task.js';
app.use("/api", Task);
import Remove from './routes/Remove.js';
app.use("/api", Remove);

// Render tasks from DB for AJAX
import TaskModel from './models/Task.js';

app.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find().lean();
        res.render("index", { tasks });
    } catch (error) {
        res.status(500).send("Error loading tasks");
    }
});

console.log("MONGO_USER:", process.env.MONGO_USER);
console.log("MONGO_PASS:", process.env.MONGO_PASS ? "set" : "not set");


// Connect to MongoDB Atlas with Mongoose
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@taskapp.og887lr.mongodb.net/TaskAPP?retryWrites=true&w=majority&appName=TaskApp`;

const connectToDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connected to MongoDB Atlas");
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

connectToDB();

app.listen(process.env.PORT, () => {
    console.log("The server is running");
});