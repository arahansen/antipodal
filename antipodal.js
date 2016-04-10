/**
 * Antipodal Webtask
 * Author: Andrew Hansen
 *
 * Find out what's happening on the opposite side ~~~the antipode~~~ of the world!
 *
 * params:
 * lat (required): requested latitude
 * lng (required): requested longitude
 * web (optional): return format suitable for displaying on the web
 *
 * returns:
 * weather: a short description of the weather at the requested lat/lng antipode
 * 					with an emoji for flair
 * 					(currently supports cloud and sun emoji)
 * location: descriptive name of where the antipode lat/lng is located as well as the
 * 					 calculated antipode
 */

var request = require('request');
// open weather map key
var owsKey = '219a61d5f0da3d74c09941b0cb122492';

function weatherEmojis(description) {
  var emojis = {
    'Clouds': '☁️',
    'Clear': '☀️',
  };

  return (emojis[description] || '') + '  ';
}

function isLatLng(lat, lng) {
  return Math.abs(Number(lat)) <= 90 &&
         Math.abs(Number(lng)) <= 180;
}

function getAntipode(lat, lng) {
  if (isLatLng(lat, lng)) {
    return {
      lat: -1 * lat,
      lng: Number(lng) < 0 ?  -1 * (Math.abs(lng) - 180) : (Math.abs(lng) - 180),
    };
  } else {
    return { error: 'I don\'t know where that\'s at!' };
  }
}


module.exports = function(context, cb) {
  var isWeb = context.data.web;
  var lat = context.data.lat;
  var lng = context.data.lng;

  if (!lat) cb(null, 'missing required field \'lat\'');
  if (!lng) cb(null, 'missing required field \'lng\'');

  var antipode = getAntipode(lat, lng);
  var uri = ['http://api.openweathermap.org/data/2.5/weather',
             '?lat=' + antipode.lat,
             '&lon=' + antipode.lng,
             '&APPID=' + owsKey,
           ].join('');

  if (antipode.error) {
    cb(null, antipode);
  } else {
    request(uri, function(err, response) {
      var res = JSON.parse(response.body);
      var description = res.weather[0].description;
      var emoji = weatherEmojis(res.weather[0].main);

      if (err) {
        cb(null, 'Not sure, try again later. ' + err);
      } else {
        cb(null, {
          weather: isWeb ? description : emoji + description,
          location: {
            name: res.name,
            antipode: antipode,
          },
        });
      }
    });
  }
};
