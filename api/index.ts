import express from "express";
import { TiktokDL } from "@tobyg74/tiktok-api-dl";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.set('json spaces', 2);

const htmls: string = `
<!DOCTYPE HTML><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="description" content="Tiktokapidownloader"/><meta name="theme-color" content="black"/><title>tikdldtapi</title><style>*, body, html{font-family: Monospace;margin: 0;padding: 0;}*::selection{background-color:rgba(0, 200, 255, 1);color:white;}body{width: 100%;min-height: 100vh;background-color: rgba(0, 10, 30, 1);box-sizing: border-box;}.box{width: 100%;box-sizing: border-box;color: white;}.props{color: salmon;font-weight: 1000;}.kurung{color: gold;}.value{color: rgba(0, 255, 200, 1);}.pre{line-height: 20px;padding: 20px;}</style></head><body><div class="box">
<pre class="pre">
<span class="kurung">{</span>
  <span class="props">"name"</span>: <span class="value">"tikdldtapi"</span>,
  <span class="props">"version"</span>: <span class="value">"1.0.8"</span>,
  <span class="props">"description"</span>: <span class="value">"Tiktok api media downloader"</span>,
  <span class="props">"usage"</span>: <span class="kurung">{</span>
    <span class="props">"html"</span>: <span class="value">"<a href="https://tikdldtapi.vercel.app/download/html?url=https://vt.tiktok.com/ZSFY3w9qk/" target="_blank" class="value">https://tikdldtapi.vercel.app/download/html?url=YOUR_TIKTOK_URL</a>"</span>,
    <span class="props">"json"</span>: <span class="value">"<a href="https://tikdldtapi.vercel.app/download/json?url=https://vt.tiktok.com/ZSFY3w9qk/" target="_blank" class="value">https://tikdldtapi.vercel.app/download/json?url=YOUR_TIKTOK_URL</a>"</span>
  <span class="kurung">},</span>
  <span class="props">"author"</span>: <span class="kurung">{</span>
    <span class="props">"name"</span>: <span class="value">"Ahmad Beni Rusli"</span>,
    <span class="props">"address"</span>: <span class="value">"Rt 03, Rw 05, Nusadadi, Tinggarjaya, Sidareja, Cilacap, Jawa Tengah"</span>,
    <span class="props">"age"</span>: <span class="value">"19 y.o"</span>,
    <span class="props">"whatsapp"</span>: <span class="value">"<a href="https://wa.me/6288216018165" target="_blank" class="value">+62 882-1601-8165</a>"</span>,
  <span class="kurung">},</span>
  <span class="props">"caution"</span>: <span class="value">"This api platform is not legal, don't use for production!"</span>
<span class="kurung">}</span>
</pre></div></body></html>
`;

const resultHTMLvideo = ( status: string, type: string, music: string, video: string, video_hd: string, video_watermark: string ) => {
  return `
<!DOCTYPE HTML><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="description" content="Tiktokapidownloader"/><meta name="theme-color" content="black"/><title>tikdldtapi</title><style>*, body, html{font-family: Monospace;margin: 0;padding: 0;}*::selection{background-color:rgba(0, 200, 255, 1);color:white;}body{width: 100%;min-height: 100vh;background-color: rgba(0, 10, 30, 1);box-sizing: border-box;}.box{width: 100%;box-sizing: border-box;color: white;}.props{color: salmon;font-weight: 1000;}.kurung{color: gold;}.value{color: rgba(0, 255, 200, 1);}.pre{line-height: 20px;padding: 20px;}</style></head><body><div class="box">
<pre class="pre">
<span class="kurung">{</span>
  <span class="props">"status"</span>: <span class="value">"${status}"</span>,
  <span class="props">"result"</span>: <span class="kurung">{</span>
    <span class="props">"type"</span>: <span class="value">"${type}"</span>,
    <span class="props">"music"</span>: <span class="value">"<a href="${music}" target="_blank" class="value">${music}</a>"</span>,
    <span class="props">"video"</span>: <span class="value">"<a href="${video}" target="_blank" class="value">${video}</a>"</span>,
    <span class="props">"video_hd"</span>: <span class="value">"<a href="${video_hd}" target="_blank" class="value">${video_hd}</a>"</span>,
    <span class="props">"video_watermark"</span>: <span class="value">"<a href="${video_watermark}" target="_blank" class="value">${video_watermark}</a>"</span>,
  <span class="kurung">}</span>
<span class="kurung">}</span>
</pre></div></body></html>
  `
};

const resultHTMLimage = ( status: string, type: string, music: string, images: any ) => {
  let imageRess: string = ``;
  images.forEach((imgUrl: string) => {
    imageRess += `<span class="value">"<a href="${imgUrl}"target="_blank" class="value">${imgUrl}</a>",</span> `
  })
  return `
<!DOCTYPE HTML><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="description" content="Tiktokapidownloader"/><meta name="theme-color" content="black"/><title>tikdldtapi</title><style>*, body, html{font-family: Monospace;margin: 0;padding: 0;}*::selection{background-color:rgba(0, 200, 255, 1);color:white;}body{width: 100%;min-height: 100vh;background-color: rgba(0, 10, 30, 1);box-sizing: border-box;}.box{width: 100%;box-sizing: border-box;color: white;}.props{color: salmon;font-weight: 1000;}.kurung{color: gold;}.value{color: rgba(0, 255, 200, 1);}.pre{line-height: 20px;padding: 20px;}</style></head><body><div class="box">
<pre class="pre">
<span class="kurung">{</span>
  <span class="props">"status"</span>: <span class="value">"${status}"</span>,
  <span class="props">"result"</span>: <span class="kurung">{</span>
    <span class="props">"type"</span>: <span class="value">"${type}"</span>,
    <span class="props">"music"</span>: <span class="value">"<a href="${music}" target="_blank" class="value">${music}</a>"</span>,
    <span class="props">"images"</span>: <span class="kurung">[</span>
      ${imageRess}
    <span class="kurung">]</span>
  <span class="kurung">}</span>
<span class="kurung">}</span>
</pre></div></body></html>
  `
};

const errorResult = (message: string) => {
  return `
<!DOCTYPE HTML><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="description" content="Tiktokapidownloader"/><meta name="theme-color" content="black"/><title>tikdldtapi</title><style>*, body, html{font-family: Monospace;margin: 0;padding: 0;}*::selection{background-color:rgba(0, 200, 255, 1);color:white;}body{width: 100%;min-height: 100vh;background-color: rgba(0, 10, 30, 1);box-sizing: border-box;}.box{width: 100%;box-sizing: border-box;color: white;}.props{color: salmon;font-weight: 1000;}.kurung{color: gold;}.value{color: rgba(0, 255, 200, 1);}.pre{line-height: 20px;padding: 20px;}</style></head><body><div class="box">
<pre class="pre">
<span class="kurung">{</span>
  <span class="props">"error"</span>: <span class="value">"${message}"</span>
<span class="kurung">}</span>
</pre></div></body></html>
`};

app.get('/', (req, res) => {
  res.send(htmls);
});

app.get('/download/:type', async(req, res) => {
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
app.get('/favicon.ico', (req, res) => {
  res.send(errorResult("not found"))
});
app.get('/test', (req, res) => {
  const file = path.join(process.cwd(), 'public', 'app.html');
  const stringified = fs.readFileSync(file, 'utf8');
  res.send(stringified);
})
app.use('/', (req, res) => {
  res.status(404);
  res.send(errorResult("not found"));
});
app.listen(port, () => {
  console.log('app is running')
});