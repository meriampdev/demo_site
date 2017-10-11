module.exports = {
  photo_url: function(photoreference, maxwidth, maxheight) {
    let url = `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAhWVM1D7iK_1Dmq6pl_w9Qgc4RnqjhfCw`
    url = `${url}&photoreference=${photoreference}&maxwidth=${maxwidth}&maxheight=${maxheight}`
    return url
  }
}