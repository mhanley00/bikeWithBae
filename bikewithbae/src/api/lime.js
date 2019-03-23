// 440128
// 006910

import axios from 'axios';
const ne_lat = 38.9072;
const ne_lng = -77.0369;
const sw_lat = 38.8072;
const sw_lng = -77.1369;
const user_lat = 38.9072;
const user_lng = -77.0369;
const zoom = 16;
// const cookie = '_limebike-web_session=QlM1K2hoOG9aL3pNVE9qODJubEJ2VDJBa0Mwd01uNGk4UUVIOVc1S0JiUHlscDE3eC8yckMyVWNDYW5FSlhsNTk3S1p5Y0ZpY1RMUnpmWUtFTE4rZWY0U3RsdDl1RHhRVmoxdlU2dFdIVnlGb3ZCVHdYMVlQU202aE4wYVlnY2tNZEVBb1piZWZlUVMvQitKMnREamVjcU1HMlJOYjN2L0k4aXh0Z1BqaWVha0FBT0pRZ2dVYkp4Vld4SHhtaTM5cVpYVHR2MDNXQVVTc2dZaGE2TDRDT2MwTHVhYmMza3V5b0xJOUorVmVTNXV5ZW1rSmtqUTBXT1lqdHRCTGU2OVpLMURjTnkwQ3N0MTlDVnVmYlpRdXl0RmxFRDZVU1p4OHBpMlNPSlYyTnA4NG9Xa0xya3RBN0gwK0k0UkcyUXB1V2FnR0NCUHU2TnJhakdKcmJ5OTBzNERCaWFQV24rS3hUM2JhcnAxcEMvTXJXUVF1VjhXZGcxNVVpZlFlTkVRV3IxY2Z5bnBmN28xbTgvajMxSkF4T1VZQnlCaHNLSHVQWWV4SjcycDFrQT0tLTFSVFRyTlhjeEp4d3A2aGpoREFLMkE9PQ%3D%3D--28f50a1c228c2042cc38b20f9d890b9746b682cf';
const authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3Rva2VuIjoiQlVBN05URzZNU09aVSIsImxvZ2luX2NvdW50IjozfQ.Xss4H44EP_IMwamXArXHwcQVfPymjXFHSZc-YAs1jhk';
const proxy = 'http://cors.io/?u=';
// const BASEURL = `${proxy}https://web-production.lime.bike/api/rider/v1/views/map?`;
const BASEURL = `${proxy}https://web-production.lime.bike/api/rider/v1/views/map?ne_lat=38.9072&ne_lng=-77.0369&sw_lat=38.8&sw_lng=-77.1&user_latitude=38.9&user_longitude=-77.0&zoom=16?authorization=Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3Rva2VuIjoiQlVBN05URzZNU09aVSIsImxvZ2luX2NvdW50IjozfQ.Xss4H44EP_IMwamXArXHwcQVfPymjXFHSZc-YAs1jhk`;
const headers = {
  'Authorization': authorization,
  'withCredentials': true,
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
  // 'Access-Control-Allow-Headers': '*',
  // 'Access-Control-Expose-Headers': 'Content-Length, X-JSON',
  "Accept": "/",
"Cache-Control": "no-cache",
"Cookie": document.cookie,
  // 'cookie': cookie,
  'ne_lat': ne_lat,
  'ne_lng': ne_lng,
  'sw_lat': sw_lat,
  'sw_lng': sw_lng,
  'user_latitude': user_lat,
  'user_longitude': user_lng,
  'zoom': zoom
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
    .then(function(response){console.log(response);
    return response});
  }
};