import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { createPost } from '../actions/index';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmission(props) {
    this.props.createPost(props)
      .then(() => {
        //blog post has been created, navigate the user to the index
        //We navigate by calling to this.context.router.push with the
        //new puth to navigate to
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    // the same as writing:
    // const handleSubmit = this.props.handleSubmit;
    // const title = this.props.fields.title;
    // const categories = this.props.fields.categories;
    // const content = this.props.fields.content;

    return (
      <form onSubmit={handleSubmit(this.onSubmission.bind(this))}>
        <h3>Create a New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? "has-danger" : ""}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ""}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? "has-danger" : ""}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            {categories.touched ? categories.error : ""}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? "has-danger" : ""}`}>
          <label>content</label>
          <textarea className="form-control" {...content}/>
          <div className="text-help">
            {content.touched ? content.error : ""}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

        <Link to="/" className="btn btn-danger">Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {}

  if(!values.title) {
    errors.title = "Enter a username";
  }

  if(!values.categories) {
    errors.categories = "Enter categories";
  }

  if(!values.content) {
    errors.content = "Enter some content";
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', "content" ],
  validate
}, null, { createPost })(PostsNew);
