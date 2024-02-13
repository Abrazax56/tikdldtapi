import express from "express";
import { TiktokDL } from "@tobyg74/tiktok-api-dl";
import cors from "cors";
import fs from 'fs'

const app = express();
const port = 3000;
const htmls = fs.readFileSync('./main.html');

app.use(cors());
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send(htmls.toString());
  /*res.json({
      "name": "tikdldtapi",
      "author": "ahmadbenirusli",
      "version": "1.0.0",
      "usage": "https://tikdldtapi.vercel.app/download?url=<YOUR_TIKTOK_URL>",
      "caution": "this api is not legal just experimental, don't use for production"
    });*/
});

app.get('/download', async(req, res) => {
  if (req.query.url === '') {
    res.json({
      "name": "tikapidl",
      "author": "ahmadbenirusli",
      "version": "1.0.0",
      "usage": "https://tikdldtapi.vercel.app/download?url=<YOUR_TIKTOK_URL>",
      "caution": "this api is not legal just experimental, don't use for production"
    });
  } else {
    await TiktokDL(req.query.url, {
      version: "v3"
    }).then((result) => {
      res.json(result);
    });
  }
});
app.use('/', (req, res) => {
  res.status(404);
  res.json({
      "request_status": 404,
      "name": "tikdldtapi",
      "author": "ahmadbenirusli",
      "version": "1.0.0",
      "usage": "https://tikdldtapi.vercel.app/download?url=<YOUR_TIKTOK_URL>",
      "caution": "this api is not legal just experimental, don't use for production"
    });
});
app.listen(port, () => {
  console.log('app is running')
});