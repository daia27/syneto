import React, { Component } from 'react';
import {AppContext, IAppContext} from "../Context";
import {ICategory, IVideoThumbnail} from "../App";
import {VideoThumbnail} from "../components/VideoThumbnail";
import {RouteComponentProps, RouterProps} from "react-router";
import {youtube} from "../api/youtube";

interface IVideoDetailRoute {
    videoId: string
}

interface IVideoDetailProps extends RouteComponentProps<IVideoDetailRoute>{
    context: IAppContext;
}

class VideoDetail extends Component<IVideoDetailProps> {

    async componentDidMount () {
        const {videoId} = this.props.match.params;

        const videoDetailResponse = await youtube.get('/videos', {
            params: {
                id: videoId,
                part: 'snippet,contentDetails,statistics'
            }
        });
        console.log(videoDetailResponse);
    }
    render() {
        return (
            <div className='container pt-4'>
                <div className='row'>
                    <div className='col'>
                        <iframe src={`http://www.youtube.com/embed/${this.props.match.params.videoId}`} width="560" height="315" frameBorder="0" allowFullScreen/>
                    </div>
                </div>
            </div>
        );
    }
}

const withContext = (Component: typeof VideoDetail) => {
    return (props:any) => (
        <AppContext.Consumer>
            {(context) => <Component {...props} context={context}/>}
        </AppContext.Consumer>
    )
};
export default withContext(VideoDetail);