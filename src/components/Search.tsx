import React, {Component, ReactComponentElement} from 'react';
import {AppContext} from '../Context';

interface IProps{
    context: any
}

interface IState{
   term: string
}

class Search extends Component<IProps, IState> {
    state = {
        term: ''
    };

    constructor(props:IProps, state:IState) {
        super(props, state);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            term: event.target.value
        })
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>){
       event.preventDefault();
       console.log("submit")
    }

    render() {
        return (
            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleChange} value={this.state.term}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        );
    }
}

const withContext = (Component: typeof Search) => {
    return (props:any) => (
        <AppContext.Consumer>
            {(context) => <Component {...props} context={context}/>}
        </AppContext.Consumer>
    )
};
export default withContext(Search);