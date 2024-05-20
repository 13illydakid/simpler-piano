import express from 'express';
// const express = require('express');
import { createProxyMiddleware } from 'http-proxy-middleware';
import axios from 'axios';
const cookieParser = require('cookie-parser');
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

const path = require('path');
// app.use('../public', express.static(path.resolve(__dirname + '../public')));
app.use('../public', express.static(__dirname + '../public'));

app.get('/public', async (req, res) => {
  res.sendFile(
    path.resolve(__dirname + '../public')
  );
  // try {
  //   const response = await axios.get(`http://${process.env.VERCEL_BUILD}`)
  // }
});

// app.use('/public', createProxyMiddleware({
//   target: `https://${process.env.VERCEL_URL}`, // server URL
//   changeOrigin: true,
// }));


app.get('/test', async (req, res) => {
  console.log("hey!!!!!");

  try {
    console.log('axios works!!!!!');
    // const response = await axios.get(`http://localhost:3001`);
    // const response = await axios.get(`http://${process.env.VERCEL_BUILD}`);
    res.json('axios works!!');
    console.log('axios works!!!!!');
  } catch (error) {
    console.error(error);
    res.status(500).json('Axios is not making request');
  }
});

// app.get('/public', async (req, res) => {

//   try {
//     const response = await axios.get(`http://localhost:3000/public`)
//     res.json('public directory works!!');
//   } catch (err) {
//     console.error(err);
//     res.status(500).json('Try again!!');
//   }
// });
// app.get('/test', (req, res) => {
//   console.log("hey!!!!!");
//   // mongoose.connect(`https://${process.env.VERCEL_URL}`);
//   mongoose.connect(`http://localhost:3000`);
//   res.json('test ok');
// });

app.listen(3001);
