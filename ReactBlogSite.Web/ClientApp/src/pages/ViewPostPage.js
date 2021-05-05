import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { produce } from 'immer';
import CommentRow from '../components/CommentRow';
import { format } from 'date-fns';

function ViewPostPage() {
    const [comment, setComment] = useState({ name: localStorage.getItem('user'), text: "" });
    const [blogPost, setBlogPost] = useState({});
    const [inStorage, setInStorage] = useState(localStorage.getItem('user') !== null);
    const bId = useParams();
    let { id } = bId;

    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios.get(`/api/BlogSite/ViewPost?id=${id}`);
            setBlogPost(data);
        }
        getPost();

    }, []);


    const submitComment = async () => {

        if (inStorage === false) {
            localStorage.setItem('user', comment.name);
            setInStorage(true);
        }

        let c = { ...comment };
        c.blogPostId = id;
        await axios.post('/api/blogSite/addComment', c);
        const { data } = await axios.get(`/api/BlogSite/ViewPost?id=${id}`);
        setBlogPost(data);
        setComment({ name: localStorage.getItem('user'), text: "" })
    }

    function onTextChange(e) {
        const nextState = produce(comment, draftState => {
            draftState[e.target.name] = e.target.value;
        });
        setComment(nextState);
    }
    return (
        <>
            <div className="row">
                <div className="col-lg-8">
                    <h1 className="mt-4">{blogPost.title}</h1>
                    <hr />
                    {blogPost.date && <p> Posted on {format(new Date(blogPost.date), 'cccc MMMM do, yyyy')}</p> }         
                    <hr />
                    <p>{blogPost.body}</p>
                    <hr />
                    {blogPost.comments != null && blogPost.comments.map(c => <CommentRow key={c.id} comment={c} />)}
                    <div className="card my-4">
                        <h5 className="card-header">Leave a Comment:</h5>
                        <div className="card-body">
                            <div className="form-group">
                                <input value={comment.name} type="text" placeholder="Please enter your name" onChange={onTextChange} className="form-control" name="name" />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Type your comment here..." onChange={onTextChange} value={comment.text} name="text" class="form-control" rows="3"></textarea>
                            </div>
                            <button className="btn btn-primary" disabled={comment.name === "" || comment.text === ""} onClick={submitComment}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ViewPostPage;

