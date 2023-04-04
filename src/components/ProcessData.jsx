const zip = (...arr) => {
    const zipped = [];
    arr.forEach((element, ind) => {
       element.forEach((el, index) => {
          if(!zipped[index]){
             zipped[index] = [];
          };
          if(!zipped[index][ind]){
             zipped[index][ind] = [];
          }
          zipped[index][ind] = el || '';
       })
    });
    return zipped;
 };

function processData(data){
    var shazam_songs = data['shazam-songs'];
    var title_list = []
    var image_list = []
    var artist_list = []
    for (var song in shazam_songs){
        title_list.push(shazam_songs[song]?.attributes?.title);
        image_list.push(shazam_songs[song]?.attributes?.images.coverArt);
        artist_list.push(shazam_songs[song]?.attributes?.artist);
    }

    return zip(title_list, artist_list, image_list);
}

export default processData;