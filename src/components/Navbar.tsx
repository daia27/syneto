import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Search from "./Search";
import {ICategory} from "../App";
import {AppContext, IAppContext} from "../Context";

interface INavbarProps {
    context: IAppContext;
}
class Navbar extends Component<INavbarProps> {

    renderCategories(){
        return this.props.context.state.categories.map((item: ICategory) => {
            return (
                <a key={item.id} className="dropdown-item" href="#">{item.title}</a>
            )
        })
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand"><strong>clipneto</strong></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Search/>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Categories
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {this.renderCategories()}
                            </div>
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