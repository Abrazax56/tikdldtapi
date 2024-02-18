import express from "express";
import { TiktokDL } from "@tobyg74/tiktok-api-dl";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.set('json spaces', 2);

app.get('/', async(req, res) => {
  const fileMain = path.join(process.cwd(), 'public', 'main.js');
  const {htmls} = await import(fileMain);
  res.send(htmls);
});

app.get('/download/:type', async(req, res) => {
  const fileVid = path.join(process.cwd(), 'public', 'resultVideo.js');
  const fileImg = path.join(process.cwd(), 'public', 'resultImage.js');
  const errorFile = path.join(process.cwd(), 'public', 'errorResult.js');
  const {errorResult} = await import(errorFile);
  const {resultHTMLvideo} = await import(fileVid);
  const {resultHTMLimage} = await import(fileImg)
  switch (req.params.type) {
    case 'json':
      if(req.query.url !== undefined && req.query.url !== '') {
        await TiktokDL(req.query.url, {
          version: "v3"
        }).then((result) => {
          res.json(result);
        }).catch((err) => {
          res.json({error: "url or system is incorrect"})
        });
      } else {
        res.json({error: "url is required"});
      }
      break;
    case 'html':
      if(req.query.url !== undefined && req.query.url !== '') {
        await TiktokDL(req.query.url, {
          version: "v3"
        }).then((result) => {
          if(result.result.type === 'video') {
            res.send(resultHTMLvideo(
              result.status,
              result.result.type,
              result.result.music,
              result.result.video1,
              result.result.video_hd,
              result.result.video_watermark
            ));
          } else {
            res.send(resultHTMLimage(
              result.status,
              result.result.type,
              result.result.music,
              result.result.images
            ));
          }
        }).catch((err) => {
          res.send(errorResult("url or system was incorrect"));
        });
      } else {
        res.send(errorResult("url is required!"));
      }
      break;
    default:
      res.send(errorResult("cannot get download type" + req.params.type));
  }
});
app.get('/favicon.ico', async(req, res) => {
  const errorFile = path.join(process.cwd(), 'public', 'errorResult.js');
  const {errorResult} = await import(errorFile);
  res.send(errorResult("not found"))
});
app.use('/', async(req, res) => {
  res.status(404);
  const errorFile = path.join(process.cwd(), 'public', 'errorResult.js');
  const {errorResult} = await import(errorFile);
  res.send(errorResult("not found"))
});
app.listen(port, () => {
  console.log('app is running')
});