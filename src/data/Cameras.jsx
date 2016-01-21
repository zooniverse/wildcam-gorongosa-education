import cameraData from 'cameraData.json';

let Cameras = {
  'all' : cameraData,
  'min': {
    'lat': Number.POSITIVE_INFINITY,
    'lng': Number.POSITIVE_INFINITY
  },
  'max': {
    'lat': Number.NEGATIVE_INFINITY,
    'lng': Number.NEGATIVE_INFINITY
  },
  'median' : {
    'lat': 0,
    'lng': 0
  },
  'getCameraById': function(id) {
    return 100;
  }
}

let allLongs = [];
let allLats = [];

for (let i = 0, camera; camera = Cameras.all[i]; i++) {
  Cameras.min.lat = Math.min(Cameras.min.lat, parseFloat(camera.latitude));
  Cameras.max.lat = Math.max(Cameras.max.lat, parseFloat(camera.latitude));
  Cameras.min.lng = Math.min(Cameras.min.lng, parseFloat(camera.longitude));
  Cameras.max.lng = Math.max(Cameras.max.lng, parseFloat(camera.longitude));
  allLongs.push(parseFloat(camera.longitude));
  allLats.push(parseFloat(camera.latitude));
}

allLats.sort();
allLongs.sort();

Cameras.median.lat = allLats[Math.floor(allLats.length/2)];
Cameras.median.lng = allLongs[Math.floor(allLongs.length/2)];

module.exports = Cameras;
