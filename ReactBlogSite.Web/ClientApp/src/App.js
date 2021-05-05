import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import ViewPostPage from './pages/ViewPostPage';
import NewPostPage from './pages/NewPostPage';

const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/ViewPost/:id' component={ViewPostPage} />
            <Route exact path='/NewPost' component={NewPostPage}/>
        </Layout>
        )
}
export default App;


