import React, { Component } from 'react';
import {AppContext, IAppContext} from "../Context";
import {ICategory, IVideoThumbnail} from "../App";

interface IHomeProps {
    context: IAppContext;
}

class Home extends Component<IHomeProps> {

    renderVideos() {
        return this.props.context.state.videos.map((item: IVideoThumbnail) => {
            return (
                <div className='col-lg-2 col-md-5 col-sm-5 col-10' key={item.videoId}>
                    <a className="video-thumbnail" href="#">
                        <img src={item.thumbnail} alt={item.title}/>
                        {item.title}
                        {item.channelTitle}
                    </a>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    {this.renderVideos()}
                </div>
            </div>
        );
    }
}

const withContext = (Component: typeof Home) => {
    return (props:any) => (
        <AppContext.Consumer>
            {(context) => <Component {...props} context={context}/>}
        </AppContext.Consumer>
    )
};
export default withContext(Home);