import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Routes,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './Navbar';
import './App.css';
import Page404 from "./pages/Page404";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar />
                    <div id="page-body">
                        <Routes>
                        <Route path="/" element={<HomePage/>}  />
                        <Route path="/about" element={<AboutPage/>} />
                        <Route path="/articles-list" element={<ArticlesListPage/>} />
                        <Route path="/article/:name" element={<ArticlePage/>} />
                        <Route element={Page404} /> {/* Must be last! */}
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
