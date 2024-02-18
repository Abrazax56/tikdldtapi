export const resultHTMLimage = ( status: string, type: string, music: string, images: any ) => {
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