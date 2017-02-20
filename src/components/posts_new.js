import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { createPost } from '../actions/index.js';

class PostsNew extends Component {
  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    console.log(title);
    // the same as writing:
    // const handleSubmit = this.props.handleSubmit;
    // const title = this.props.fields.title;
    // const categories = this.props.fields.categories;
    // const content = this.props.fields.content;

    return (
      <form onSubmit={handleSubmit(this.props.createPost)}>
        <h3>Create a New Post</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
        </div>

        <div className="form-group">
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
        </div>

        <div className="form-group">
          <label>content</label>
          <textarea className="form-control" {...content}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', "content" ]
}, null, { createPost })(PostsNew);
