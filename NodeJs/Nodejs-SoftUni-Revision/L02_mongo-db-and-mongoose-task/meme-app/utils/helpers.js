module.exports = {
  getAllMemesAsHtml: function (memes) {
    let html = '';
    for (let meme of memes) {
      html += `<div class="meme">
<a href="/getDetails?id=${meme.id}">
<img class="memePoster" src="${meme.memeSrc}"/>          
</div>`;
    }
    return html;
  },
  getMemeDetailsHtml: function (targetedMeme) {
    return `<img src="${targetedMeme.memeSrc}" alt=""/>
        <h3>Title  ${targetedMeme.title}</h3>
        <p> ${targetedMeme.description}</p>
        <button><a href="${targetedMeme.memeSrc}">Download Meme</a></button>
        </div>`;
  }
};
