import axios from 'axios';
const KEY = 'AIzaSyDfmOl0VhRJNgYHWbrQ2zV9AllxTAkdaA4';

export const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        key: KEY,
        part: 'snippet'
    }
});