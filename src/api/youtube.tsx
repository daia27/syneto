import axios from 'axios';
const KEY = 'AIzaSyAeOb_jPQ67QTXE8hLpgxoMjm6e6lbXPnc';

export const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        key: KEY,
        part: 'snippet'
    }
});