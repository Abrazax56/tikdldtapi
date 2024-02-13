import express from "express";
import { TiktokDL } from "@tobyg74/tiktok-api-dl";

const app = express();
const port = 3000;

app.get('/api/main', async(req, res) => {
  await TiktokDL(req.query.url, {
    version: "v3"
  }).then((result) => {
    res.json(result);
  });
});

app.listen(port, () => {
  console.log('app is running')
});