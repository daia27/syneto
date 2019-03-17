import React, { Component } from 'react';
import {AppContext, IAppContext} from "../Context";
import {ICategory, IVideoThumbnail} from "../App";
import {VideoThumbnail} from "../components/VideoThumbnail";

interface IHomeProps {
    context: IAppContext;
}

class Home extends Component<IHomeProps> {

    renderVideos() {
        return this.props.context.state.videos.map((item: IVideoThumbnail) => {
            return (
                <div className='col-lg-2 col-md-5 col-sm-5 col-10' key={item.videoId}>
                    <VideoThumbnail videoId={item.videoId} image={item.thumbnail} title={item.title} author={item.channelTitle}/>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container pt-4'>
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