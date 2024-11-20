// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import checkAuth from '../middleware/checkAuth.js';
// import userroute from '../routes/ruser.js';
// // import algorithmsroute from './routes/ralgorithms.js';
// import algorithmsroute from '../routes/ralgorithms.js';

// import searchroute from '../routes/rsearch.js';
// import userdoroute from '../routes/ruserdo.js';
// import feedroute from '../routes/rfeed.js';
// import quicksearchroute from '../routes/rquicksearch.js';
// import sendemailroute from '../routes/rsendemail.js';
// import changepasswordroute from '../routes/rchangepassword.js';
// import providerroute from '../routes/rprovider.js';
// import quiz_router from '../routes/rquiz.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import serverless from 'serverless-http';

// const app = express();

// dotenv.config();

// // Create __dirname for ES module
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// const port = process.env.PORT || 9000;

// // app.use(express.static(path.join(__dirname, '../frontend/build')));
// // Serve static files from the React app

// mongoose.connect(process.env.MONGO_URL).then(() => {
//   console.log("connected to mongodb");
// }).catch((err) => {
//   console.log(`${err} \n error connecting mongoDB `);
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors({
//   origin:"*",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "authorization"],
//   credentials: true,
// }));

// // app.use((req, res, next) => {
// //   res.header('Access-Control-Allow-Origin', '*');
// //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// //   next();
// // });


// app.get("/api/checkauth", checkAuth);
// app.use("/api/user", userroute);
// app.use("/api/algorithms", algorithmsroute);
// app.use("/api/search", checkAuth, searchroute);
// app.use("/api/userdo", checkAuth, userdoroute);
// app.use("/api/myfeed", checkAuth, feedroute);
// app.use("/api/quicksearch", checkAuth, quicksearchroute);
// app.use("/api/sendemail", sendemailroute);
// app.use("/api/changepassword", checkAuth, changepasswordroute);
// app.use("/api/provider", checkAuth, providerroute);
// app.use("/api/quiz", checkAuth, quiz_router);
// app.get('/',(req,res)=> {res.status(202).send("Hello Backend 2ND time")});
// app.get('/api/get',(req,res)=> {res.status(202).send("Hello Backend 2ND time")});
// app.get('/api',(req,res)=> {res.status(202).send("Hello Backend 2ND time")});
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Hello from Serverless!' }); // Proper JSON response
// });



// app.listen(port, () => {
//   console.log(`listening at port : ${port}`);
// });


// const handler = serverless(app);

// export const handlerFunction = async (event, context) => {
//   const result = await handler(event, context);
//   return result;
// };

// export default handlerFunction;










// const express = require('express');
// const serverless = require('serverless-http');
import express from 'express';
import serverless from 'serverless-http';
const app = express();
const router = express.Router();
router.get('/', (req, res) => {
  res.send('App is running..');
});






import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {checkAuth} from '../middleware/checkAuth.js';
import {router as userroute } from '../routes/ruser.js';
import {router as algorithmsroute} from '../routes/ralgorithms.js';
import {router as searchroute} from '../routes/rsearch.js';
import {router as userdoroute} from '../routes/ruserdo.js';
import {router as feedroute} from '../routes/rfeed.js';
import {router as quicksearchroute} from '../routes/rquicksearch.js';
import {router as sendemailroute} from '../routes/rsendemail.js';
import {router as changepasswordroute }from '../routes/rchangepassword.js';
import {router as providerroute} from '../routes/rprovider.js';
import {router as quiz_router} from '../routes/rquiz.js';
// import path from 'path';
// import { fileURLToPath } from 'url';


dotenv.config();

// Create __dirname for ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const port = process.env.PORT || 9000;

// app.use(express.static(path.join(__dirname, '../frontend/build')));
// Serve static files from the React app

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb");
}).catch((err) => {
  console.log(`${err} \n error connecting mongoDB `);
});

router.use(express.json());
router.use(express.urlencoded({ extended: false }));



router.use(cors({
  origin: "https://deploy-news-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "authorization"],
  credentials: true,
}));

// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


router.get("/api/checkauth", checkAuth);
router.use("/api/user", userroute);
router.use("/api/algorithms", algorithmsroute);
router.use("/api/search", checkAuth, searchroute);
router.use("/api/userdo", checkAuth, userdoroute);
router.use("/api/myfeed", checkAuth, feedroute);
router.use("/api/quicksearch", checkAuth, quicksearchroute);
router.use("/api/sendemail", sendemailroute);
router.use("/api/changepassword", checkAuth, changepasswordroute);
router.use("/api/provider", checkAuth, providerroute);
router.use("/api/quiz", checkAuth, quiz_router);
router.get('/',(req,res)=> {res.json({message:"Hello Backend 2ND time"})});
router.get('/api/get',(req,res)=> {res.json({message:"Hello Backend 2ND time"})});
router.get('/api',(req,res)=> {res.json({message:"Hello Backend 2ND time"})});
router.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Serverless!' }); // Proper JSON response
});





app.use('/.netlify/functions/api', router);
// module.exports.handler = serverless(app);
export const handler = serverless(app);
//const port = 8080;


app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${port}`);
});