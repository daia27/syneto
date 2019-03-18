import axios from 'axios';
const KEY = 'AIzaSyAyfAfR5AgtNx3ri779XXtEi4gutrsL-EY';

export const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        key: KEY,
        part: 'snippet'
    }
});