import axios from 'axios';
var key = 'LEIdtQ2mxSjNhE5NWnvZ3Ho7rqJgYz7es9w9MKioV5s';
var url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=`;

export const autoFetch = axios.create({
  baseURL: url,
});
