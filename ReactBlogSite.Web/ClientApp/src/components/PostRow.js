import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
function PostRow({ blogPost }) {

    return (
        < div className="card mb-4" >
            <div className="card-body">
                <h2 class="card-title">
                    <Link to={`/ViewPost/${blogPost.id}`}>
                        <h3>{blogPost.title}</h3>
                    </Link>
                </h2>
                <p className="card-text">{blogPost.body.length > 200 ? `${blogPost.body.substr(0, 200)}...` : blogPost.body}</p>
                
                <Link to={`/ViewPost/${blogPost.id}`} className="btn btn-primary">Read More &rarr;                   
                </Link>
            </div>
            <div className="card-footer text-muted">
                <div className="row">
                    Posted on {format(new Date(blogPost.date), 'cccc MMMM Lo, yyyy')}
                </div>
                <div className="row">
                    <h6> {blogPost.comments.length} comments</h6>
                </div>
            </div>
        </div >)
}
export default PostRow

