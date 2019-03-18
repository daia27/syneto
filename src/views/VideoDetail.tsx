import React, { Component } from 'react';
import {AppContext, IAppContext} from "../Context";
import {RouteComponentProps} from "react-router";
import {youtube} from "../api/youtube";
import './VideoDetails.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

interface IVideoDetailRoute {
    videoId: string
}

interface IComment {
    text: string;
    author: string;
    replies: IReply[];
}

interface IReply {
    text: string;
    author: string;
}

interface IVideoDetailState {
    title: string;
    author: string;
    description: string;
    videoId: string;
    comments: IComment[];
    viewCount: number;
    upVotes: number;
    downVotes: number;
}

interface IVideoDetailProps extends RouteComponentProps<IVideoDetailRoute>{
    context: IAppContext;
}

class VideoDetail extends Component<IVideoDetailProps, IVideoDetailState> {
    state = {
        title: '',
        author: '',
        description: '',
        videoId: '',
        comments: [],
        viewCount: 0,
        upVotes: 0,
        downVotes: 0
    };

    async componentDidMount () {
        const {videoId} = this.props.match.params;

        const videoDetailResponse = await youtube.get('/videos', {
            params: {
                id: videoId,
                part: 'snippet,contentDetails,statistics',
            }
        });

        this.setState({
            title: videoDetailResponse.data.items[0].snippet.title,
            author: videoDetailResponse.data.items[0].snippet.channelTitle,
            description: videoDetailResponse.data.items[0].snippet.description,
            videoId,
            upVotes: videoDetailResponse.data.items[0].statistics.likeCount,
            downVotes: videoDetailResponse.data.items[0].statistics.dislikeCount,
            viewCount: videoDetailResponse.data.items[0].statistics.viewCount
        });

        const commentsResponse = await youtube.get('/commentThreads', {
            params: {
                videoId: videoId,
                part: 'snippet,replies',
                maxResults: 50
            }
        });

        this.setState({
            comments: commentsResponse.data.items.map((item: any) => {
                return {
                    text: item.snippet.topLevelComment.snippet.textDisplay,
                    author: item.snippet.topLevelComment.snippet.authorDisplayName,
                    replies: ((item.replies || {}).comments || []).map((subItem: any) => {
                        return {
                            text: subItem.snippet.textDisplay,
                            author: subItem.snippet.authorDisplayName
                        }
                    })
                }
            })
        });
    }

    renderComments() {
        return this.state.comments.map((item: IComment) => (
            <div className="comment-wrapper">
                <div className="comment">
                    <div><strong>{item.author}</strong></div>
                    <div>{item.text}</div>
                </div>

                { item.replies.length > 0 ?
                    <div className="replies">
                        { item.replies.map((subItem) => (
                            <div className="comment">
                                <div><strong>{subItem.author}</strong></div>
                                <div>{subItem.text}</div>
                            </div>
                        ))
                        }
                    </div> : null }
            </div>
        ));
    }


    render() {
        return (
            <div className='container pt-4'>
                <div className='row'>
                    <div className="back-button">
                        <Link to="/">
                            <button className="btn btn-outline-primary my-2 my-sm-0"><FontAwesomeIcon icon="arrow-alt-circle-left"/>Back</button>
                        </Link>
                    </div>
                    <div className='col'>
                        <iframe src={`http://www.youtube.com/embed/${this.props.match.params.videoId}?autoplay=1`} width="840" height="475" frameBorder="0" allowFullScreen/>
                       <div className='video-details'>
                           <div className="video-title"> <strong>{this.state.title}</strong></div>
                           <div className="video-statistics">
                               <div className="video-views-count">{this.state.viewCount} views</div>
                               <div className="video-likes-dislikes">
                                   {this.state.upVotes}
                                       <FontAwesomeIcon icon="thumbs-up"/>
                                   {this.state.downVotes}
                                       <FontAwesomeIcon icon="thumbs-down" />
                               </div>
                           </div>
                           <div className="video-author"><strong>{this.state.author}</strong></div>
                           <div className="video-description">{this.state.description}</div>
                           <h5>Comments</h5>
                           <div className="video-comments">{this.renderComments()}</div>
                       </div>
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