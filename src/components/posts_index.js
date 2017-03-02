import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  componentWillMount() {
    // console.log('This would be a good time to call an action creator');
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
          <li className="list-group-item" key={post.id}>
            <Link to={`posts/${post.id}`}>
              <span className="pull-xs-right">{post.categories}</span>
              <strong>{post.title}</strong>
            </Link>
          </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all }; //go to the combineReducers function -> to the posts key -> in the corresponding reducer, fetch the 'all' parameter
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch); //dispatch the fetchPosts function (action creator) through all the reducers
};

export default connect (mapStateToProps, mapDispatchToProps)(PostsIndex); // give access through props to: (1) posts.all and (2) fetchPosts in this component (PostsIndex)

// A shorthand to remove the mapDispatchToProps method
// export default connect (null, { fetchPosts })(PostsIndex);
