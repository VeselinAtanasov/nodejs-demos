
module.exports = {
  prepareHomePage: function (tags, html) {
    let displayTags = '';
    for (let tag of tags) {
      displayTags += `<div class='tag' id="${tag._id}">${tag.name}</div>`;
    }
    return displayTags;
  },
  getRealImageModel: function (data) {
    return {
      title: data.title,
      URL: data['URL'],
      description: data.description,
      tags: data.tagsID.split(',').filter(e => e !== '').map(e => e.trim())
    };
  },
  getAllImagesAsHTML: (image) => {
    return `<fieldset id => <legend>${image.title}:</legend> 
    <img src="${image.URL}">
    </img><p>${image.description}<p/>
    <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
    </button> 
    </fieldset>`;
  }

};
