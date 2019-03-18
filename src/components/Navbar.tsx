import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Search from "./Search";
import {ICategory} from "../App";
import {AppContext, IAppContext} from "../Context";
import {Authenticate} from "./Authenticate";
import './Navbar.scss'

interface INavbarProps {
    context: IAppContext;
}

class Navbar extends Component<INavbarProps> {

    get activeCategory(){
        return this.props.context.state.categories.find((item: ICategory) => {
            return item.id === this.props.context.state.activeCategory;
        })
    }

    setActiveCategory(categoryId: string){
        this.props.context.setState({
            activeCategory: categoryId
        });
        this.props.context.getVideos(categoryId);
    }

    renderCategories(){
        return this.props.context.state.categories.map((item: ICategory) => {
            return (
                <a key={item.id} className="dropdown-item" onClick={() =>this.setActiveCategory(item.id)}>{item.title}</a>
            )
        })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img className="d-inline-block align-top mr-2" src="/clipneto.png" height="30" alt="clipneto app logo"/>
                <Link to="/" className="navbar-brand"><strong>clipneto</strong></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbar-content" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar-content">
                    <Search/>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbar-dropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.activeCategory ? this.activeCategory.title : 'Choose a category'}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-dropdown">
                                {this.renderCategories()}
                            </div>
                        </li>
                        <li>
                            <Authenticate/>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const withContext = (Component: typeof Navbar) => {
    return (props:any) => (
        <AppContext.Consumer>
            {(context) => <Component {...props} context={context}/>}
        </AppContext.Consumer>
    )
};
export default withContext(Navbar);