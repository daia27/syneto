import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import 'bootstrap/dist/js/bootstrap'
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import {AppContext} from './Context';
import {youtube} from './api/youtube';
import VideoDetail from "./views/VideoDetail";

library.add(faThumbsUp);
library.add(faThumbsDown);
library.add(faArrowAltCircleLeft);

interface IAppState {
    categories: ICategory[],
    videos: IVideoThumbnail[],
    activeCategory: string,
    activeQuery: string
}

interface ICategoryResponse {
    data: {
        items: Array<{
            id: string,
            snippet: {
                title: string
            }
        }>
    }
}

export interface ICategory {
    title: string,
    id: string
}

interface IVideoResponse {
    data: {
        items: Array<{
            id: {
                videoId: string
            },
            snippet: {
                channelId: string,
                channelTitle: string,
                title: string,
                thumbnails: {
                    high: {
                        url: string
                    }
                }
            }
        }>
    }
}

export interface IVideoThumbnail {
    videoId: string
    channelId: string,
    channelTitle: string,
    title: string,
    thumbnail: string
}


export class App extends Component<{}, IAppState> {
    state = {
        categories: [],
        videos: [],
        activeCategory: '',
        activeQuery: ''
    };

    defaultCategory = '19';

    async componentDidMount() {
        const categoriesResponse: ICategoryResponse = await youtube.get('/videoCategories', {
            params: {
                regionCode: 'US'
            }
        });

        this.setState({
            categories: categoriesResponse.data.items.map((item) => {
                return {
                    id: item.id,
                    title: item.snippet.title
                }
            }),
        });

        this.getVideos(this.defaultCategory);
    }

    async getVideos(categoryId: string, query: string = '') {
        const videosResponse: IVideoResponse = await youtube.get('/search', {
            params: {
                type: 'video',
                regionCode: 'US',
                videoCategoryId: categoryId,
                q: query,
                maxResults: '10',
            }
        });

        this.setState({
            videos: videosResponse.data.items.map((item) => {
                return {
                    videoId: item.id.videoId,
                    channelId: item.snippet.channelId,
                    channelTitle: item.snippet.channelTitle,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.high.url
                }
            }),
            activeCategory: categoryId,
            activeQuery: query
        });
    }

    render() {
        return (
            <AppContext.Provider value={{state: this.state, setState: this.setState.bind(this), getVideos: this.getVideos.bind(this)}}>
                <div className="App">
                    <Router>
                        <div>
                            <Navbar/>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/video/:videoId" component={VideoDetail} />
                        </div>
                    </Router>
                </div>
            </AppContext.Provider>
        );
    }
}
