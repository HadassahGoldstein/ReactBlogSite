import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostRow from '../components/PostRow';


function HomePage() {
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [numPosts, setNumPosts] = useState(0);
    
    useEffect(() => {
        const getPosts = async () => {
            const { data } = await axios.get('/api/BlogSite/getAll?page=0');
            setPosts(data);            
        }
        const getNumPosts = async () => {           
            const { data } = await axios.get('/api/BlogSite/NumOfPosts');
            setNumPosts(data.numPosts);
        }
        getPosts();
        getNumPosts();
        
    }, []);
    useEffect(() => {
        const refreshPage = async()=> {
            const { data } = await axios.get(`/api/BlogSite/getAll?page=${page}`);
            setPosts(data);
        }
        refreshPage();
    }, [page]);
    
    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    <h1>My Blog Posts</h1>
                    {posts.map(p => <PostRow key={p.id} blogPost={p} />)}                        
                </div>
            </div>
            <ul className="pagination justify-content-center mb-4">
                {((page) * 3)+1 < numPosts &&
                    <li>
                    <button onClick={() => setPage(page + 1)} class="page-link">&larr;Older</button>
                    </li>
                }
                {page > 0 &&
                    <li>
                    <button onClick={() => setPage(page - 1)} className="page-link">Newer&rarr;</button>
                    </li>
                }
            </ul>
        </>

    )
}
export default HomePage;


