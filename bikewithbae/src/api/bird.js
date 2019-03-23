import axios from 'axios';
const deviceID = 'KVX04TT0tUG/IsD0DHgBAw==';
const lat = 38.9072;
const lon = -77.0369;
const radius = 1;
const authorization = 'Bird eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBVVRIIiwidXNlcl9pZCI6IjA4YzdiOGFkLTUwZGMtNGRjYi1iZWYwLTgxZjIyM2QxNjI4ZCIsImRldmljZV9pZCI6IktWWDA0VFQwdFVHL0lzRDBESGdCQXc9PSIsImV4cCI6MTU4NDc5NTQ2Nn0.l9Z4Ow6WeJ6wOeiUD8HOE5b3eAsDd0oRoE0D7IRbbII';
const BASEURL = `https://api.bird.co/bird/nearby?latitude=${lat}&longitude=${lon}&radius=${radius}`;
const headers = {
  'Authorization': authorization,
  'Device-id': deviceID,
  'App-Version': '3.0.5',
  'Location': `{"latitude":${lat},"longitude":${lon},"altitude":500,"accuracy":100,"speed":-1,"heading":-1}`
};
// make new graphic w/ geometry of circle, radius of number passed in, 'new Polygon'
// within opperation, for each bike, first argument is the bike's geometry and second is 
// add circle to map w/o fill, 
// is point w/in polygon pi r squared
//state - all bikes array of objects, bike ie + company, lat/long, 
// make featureLayer from client side graphics, create renderer => bikeCLientField, has all da types, get red point if CitiBike, green in Lime, definitionExpressions => iterate over graphics and use those attributes, dropdown of companies, radius (with option to show all ie no radius), 

//add polygons for no scooter parking(!)- info in Lime API

//** could give radius and lat/long to the api calls as props! */
export default {
  search: function() {
    return axios.get(BASEURL, {headers: headers})
    .then(function(response){console.log(response.data.birds);
    return response.data.birds});
  }
};