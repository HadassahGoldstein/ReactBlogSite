import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { produce } from 'immer';
import axios from 'axios';

function NewPostPage() {
    const [blogPost, setBlogPost] = useState({});
    const  history  = useHistory();

    const onTextChange = (e) => {
        const nextState = produce(blogPost, draftState => {
            draftState[e.target.name] = e.target.value;
        });
        setBlogPost(nextState);
    }
    const onSubmit = async () => {
        await axios.post('/api/blogSite/addPost', blogPost);
        history.push('/');
    }
    return (
        <div className="col-md-8 offset-md-2 jumbotron">
            <input type="text" className="form-control" placeholder="Title" value={blogPost.title} name="title" onChange={onTextChange} />
            <br />
            <textarea name="body" placeholder="Type your blog here..." className="form-control" rows="20" value={blogPost.body} onChange={onTextChange} ></textarea>
            <br />
            <button className="btn btn-primary" onClick={onSubmit} > Submit</button>            
        </div>
        )
}

export default NewPostPage;