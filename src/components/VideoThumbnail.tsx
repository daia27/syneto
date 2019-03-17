import React, {Component} from 'react';
import './VideoThumbnail.scss'
import {Link} from "react-router-dom";

interface IVideoThumbnailProps {
    title: string;
    author: string;
    image: string;
    videoId: string
}

export class VideoThumbnail extends Component<IVideoThumbnailProps> {
    handleVideoSelect(event: React.MouseEvent<HTMLElement>){
        console.log("video event");
    }
    render() {
        return (
            <Link to={`/video/${this.props.videoId}`} className='video-thumbnail' onClick={this.handleVideoSelect}>
                <img className='video-thumbnail-image' src={this.props.image} alt={this.props.title}/>
                <div className='video-thumbnail-content'>
                    <div className='title'>{this.props.title}</div>
                    <div className='author'>{this.props.author}</div>
                </div>
            </Link>
        )
    }
}