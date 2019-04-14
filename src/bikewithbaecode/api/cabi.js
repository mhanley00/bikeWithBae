import axios from 'axios';
const BASEURL = 'https://layer.bicyclesharing.net/map/v1/wdc/map-inventory';

export default {
  search: function() {
    return axios.get(BASEURL)
    .then(function(response){ //console.log(response.data.features);
    return response.data.features});
  }
};