import axios from 'axios';
const BASEURL = 'https://dc.jumpmobility.com/opendata/free_bike_status.json';

export default {
  search: function() {
    return axios.get(BASEURL)
    .then(function(response){
      // console.log(response);
    return response.data.data.bikes});
  }
};