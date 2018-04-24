import React from 'react';
import ReactDOM from 'react-dom';
// import Authors from './components/authors';
// import Posts from './components/posts';
// import PostForm from './components/post_form';
import Home from './components/home';
import About from './components/about';
import TopNav from './components/top_nav';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <TopNav />
            <Switch>
                {/* <Route path="/authors/:id/posts/create" component={PostForm} />
                <Route path="/authors/:id/posts/:pid" component={PostForm} />
                <Route path="/authors/:id/posts" component={Posts} />
                <Route path="/authors" component={Authors} /> */}
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();