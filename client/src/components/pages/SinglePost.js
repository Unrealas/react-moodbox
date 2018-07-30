import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/postsActions';
import {Link} from 'react-router-dom';

class Singlepost extends React.Component {
    state = {
        comment: '',
    };

    // after reload , take 1 post  from backend
    componentDidMount() {
        const title = this.props.match.params.title;
        if (!this.props.posts) this.props.fetchSinglePost(title);
    }

    onInputChange = (e) => {
        this.setState({comment: e.target.value})
    };

    onCommentSubmit = (e) => {
        e.preventDefault();
        // send comment to backend

        // find post
        const pageTitle = this.props.match.params.title.replace(/-/g, ' ');
        const [post] = this.props.posts.filter((post) => {
            return post.title === pageTitle;
        });
        this.props.commentPost(post._id, this.state.comment);
        this.setState({comment:''});
    };

    render() {

        if (!this.props.posts) return <div>Loading... </div>;

        const pageTitle = this.props.match.params.title.replace(/-/g, ' ');
        const [post] = this.props.posts.filter((post) => {
            return post.title === pageTitle;
        });

        const comments = post.comments.map((comment, i) => {
            return (
                <li key={i} className='comment'>
                    <h4>{comment.user.firstname}</h4>
                    <p className='comment-cont'>{comment.comment}</p>
                </li>)
        });

        return (
            <div className='Singlepost'>

                <h1>{post.title}</h1>
                <div
                    style={{backgroundImage: `url(uploads/${post.img})`}}
                    className="post-img"/>
                <p>{post.content}</p>
                <Link to={'author/' + post.user._id}>
                    <h6>Author: {post.user.firstname}</h6>
                </Link>
                <h5>
                    <span
                        onClick={() => this.props.likePost(post._id)}>
                        {post.likes.includes(this.props.auth.user._id) ?
                            'Dislike' : 'Like'
                        }
                    </span>
                </h5>
                <div className="clearfix"> </div>

                <form onSubmit={this.onCommentSubmit}>
                    <input
                        onChange={this.onInputChange}
                        value={this.state.comment}
                        placeholder="Type your comment here..."
                        name='comment'
                        type="text"/>
                    <button>Create Comment</button>
                </form>

                <ul>
                    <h1>Comments:</h1>
                    {comments}
                </ul>
            </div>
        );
    }
}

// const mapStateToProps = state => ({posts:state.posts});

const mapStateToProps = ({posts, auth}) => ({posts, auth});

export default connect(mapStateToProps, actions)(Singlepost)