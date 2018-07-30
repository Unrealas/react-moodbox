import React from 'react';
import {connect} from 'react-redux';
import * as actions from "../../actions/postsActions";
import {Link} from 'react-router-dom';

class Home extends React.Component {
    componentWillMount(){
        if(!this.props.auth.isAuth){
            this.props.history.push('/login')
        }
    }
    componentDidMount() {
        if(!this.props.auth.isAuth) return;
        this.props.fetchAllPosts();
    }

    render() {
        // map posts return div
        let posts;
        if (this.props.posts) {
            posts = this.props.posts.map((post, i) => {
                return (
                    <div className="post" key={i}>
                        <Link to={'/post/' + post.title.replace(/ /g, '-')}>
                            <h2>{post.title}</h2>
                        </Link>
                        <div
                            style={{backgroundImage:`url(uploads/${post.img})`}}
                            className="post-img"/>
                        <p>{post.content.substring(0, 100) + '...'}</p>
                        <h6>{post.user.firstname}</h6>
                        <span>Likes:{post.likes.length}</span>
                        <div className="clearfix"> </div>
                    </div>
                )
            }).reverse();
        } else {
            posts = <div>Loading....</div>
        }
        return (
            <div className='Home'>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        auth: state.auth
    }
};

export default connect(mapStateToProps, actions)(Home)