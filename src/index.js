import React from 'react';
import ReactDOM from 'react-dom';
import Characters from './components/characters';
import Items from './components/items';
import ItemForm from './components/item_form';
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
                <Route path="/characters/:id/items/create" component={ItemForm} />
                <Route path="/characters/:id/items/:itemId" component={ItemForm} />
                <Route path="/characters/:id/items" component={Items} />
                <Route path="/characters" component={Characters} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
