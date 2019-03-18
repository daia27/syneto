import React, {Component} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import './Authenticate.scss';

interface IAuthenticateState {
    user: any;
}

export class Authenticate extends Component<{}, IAuthenticateState> {
    state = {
        user: null
    };

    constructor(props: {}, state: IAuthenticateState) {
        super(props, state);

        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        this.setState({user: localStorage.getItem("user")})
    }

    handleLogIn(response: any){
        localStorage.setItem("user", JSON.stringify(response));
        this.setState({user: response});

        console.log(response)
    }

    handleFailure(){
        console.error("Ooops");
    }

    handleLogOut(){
        localStorage.removeItem("user");
        this.setState({user: null});
    }

    render() {
        let user: any = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
        }

        return (
            <div className="authenticate-user">{ user ?
                <div>
                    <a className="nav-link dropdown-toggle" href="#" id="navbar-dropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        { user.profileObj.name }
                        <img className="profile-image" src={ user.profileObj.imageUrl } alt="Profile" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-dropdown">
                        <a className="dropdown-item" onClick={this.handleLogOut}>Signout</a>
                    </div>
                </div> :
                <GoogleLogin
                    clientId="130006289428-es1v9vpiaejia06aejmvg13o3q5r83gq.apps.googleusercontent.com"
                    render={(renderProps: any) => (
                        <button className="btn btn-primary" onClick={renderProps.onClick}>
                            Signin with Google
                        </button>
                    )}
                    onSuccess={this.handleLogIn}
                    onFailure={this.handleFailure}
                />}
            </div>
        )
    }
}