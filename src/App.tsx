import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/js/bootstrap'
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import {AppContext} from './Context';
import {youtube} from './api/youtube';

interface IAppState {
    categories: ICategory[],
    videos: IVideoThumbnail[]
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
                    default: {
                        url: string
                    }
                    medium: {
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
        videos: []
    };

    defaultCategory = '19';

    async componentDidMount() {
        const categoriesResponse: ICategoryResponse = await youtube.get('/videoCategories', {
            params: {
                regionCode: 'US'
            }
        });

        const videosResponse: IVideoResponse = await youtube.get('/search', {
            params: {
                type: 'video',
                regionCode: 'US',
                videoCategoryId: this.defaultCategory,
                q: '',
                maxResults: '10',
            }
        });

        console.log(categoriesResponse);
        console.log(videosResponse);

        this.setState({
            categories: categoriesResponse.data.items.map((item) => {
                return {
                    id: item.id,
                    title: item.snippet.title
                }
            }),
            videos: videosResponse.data.items.map((item) => {
                return {
                    videoId: item.id.videoId,
                    channelId: item.snippet.channelId,
                    channelTitle: item.snippet.channelTitle,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url
                }
            })
        });
    }

    render() {
        return (
            <AppContext.Provider value={{state: this.state, setState: this.setState}}>
                <div className="App">
                    <Router>
                        <div>
                            <Navbar/>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                            </ul>
                            <Route exact path="/" component={Home} />
                        </div>
                    </Router>
                </div>
            </AppContext.Provider>
        );
    }
}
