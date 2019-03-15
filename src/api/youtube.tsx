import axios from 'axios';
const KEY = 'AIzaSyAFUNYmE1gfydRFrlb3Q05gXlPSgQmiY6I';

export const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        key: KEY,
        part: 'snippet'
    }
});