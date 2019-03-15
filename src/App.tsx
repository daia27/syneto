import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/js/bootstrap'
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import {AppContext} from './Context';
import {youtube} from './api/youtube';

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

interface IAppState {
    categories: ICategory[]
}

export class App extends Component<{}, IAppState> {
    state = {
        categories: []
    };

    async componentDidMount() {
        const categoriesResponse: ICategoryResponse = await youtube.get('/videoCategories', {
            params: {
                regionCode: 'US'
            }
        });
        console.log(categoriesResponse);
        this.setState({
            categories: categoriesResponse.data.items.map((item) => {
                return {
                    id: item.id,
                    title: item.snippet.title
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
