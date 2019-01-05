
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
      URL: data['URL'],
      description: data.description,
      tags: data.tagsID.split(',').filter(e => e !== '').map(e => e.trim())
    };
  }

};
