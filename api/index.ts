import express from "express";
import { TiktokDL } from "@tobyg74/tiktok-api-dl";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.set('json spaces', 2);

const htmls = `
<!DOCTYPE HTML><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="description" content="Tiktokapidownloader"/><meta name="theme-color" content="black"/><title>tikdldtapi</title><style>*, body, html{font-family: Monospace;margin: 0;padding: 0;}body{width: 100%;min-height: 100vh;background-color: rgba(0, 10, 30, 1);box-sizing: border-box;}.box{width: 100%;box-sizing: border-box;color: white;}.props{color: salmon;font-weight: 1000;}.kurung{color: gold;}.value{color: rgba(0, 255, 200, 1);}.pre{line-height: 20px;padding: 20px;}</style></head><body><div class="box">
<pre class="pre">
<span class="kurung">{</span>
  <span class="props">"name"</span>: <span class="value">"tikdldtapi"</span>,
  <span class="props">"version"</span>: <span class="value">"1.0.8"</span>,
  <span class="props">"description"</span>: <span class="value">"Tiktok api media downloader"</span>,
  <span class="props">"usage"</span>: <span class="value"><a href="https://tikdldtapi.vercel.app/download?url=https://vt.tiktok.com/ZSFY3w9qk/" target="_blank" class="value">"https://tikdldtapi.vercel.app/download?url=YOUR_TIKTOK_URL"</a></span>,
  <span class="props">"author"</span>: <span class="kurung">{</span>
    <span class="props">"name"</span>: <span class="value">"Ahmad Beni Rusli"</span>,
    <span class="props">"address"</span>: <span class="value">"Rt 03, Rw 05, Nusadadi, Tinggarjaya, Sidareja, Cilacap, Jawa Tengah"</span>,
    <span class="props">"age"</span>: <span class="value">"19 y.o"</span>,
    <span class="props">"whatsapp"</span>: <span class="value"><a href="https://wa.me/6288216018165" target="_blank" class="value">"+62 882-1601-8165"</a></span>,
    <span class="kurung">},</span>
  <span class="props">"caution"</span>: <span class="value">"This api platform is not legal, don't use for production!"</span>
<span class="kurung">}</span>
</pre></div></body></html>
`;

app.get('/', (req, res) => {
  res.send(htmls);
});

app.get('/download', async(req, res) => {
  if (req.query.url === '') {
    res.send(htmls);
  } else {
    await TiktokDL(req.query.url, {
      version: "v3"
    }).then((result) => {
      res.json(result);
    });
  }
});
app.get('/favicon.ico', (req, res) => {
  res.json({null: "ok"})
});
app.use('/', (req, res) => {
  res.status(404);
  res.send(htmls);
});
app.listen(port, () => {
  console.log('app is running')
});