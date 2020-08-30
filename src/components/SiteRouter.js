import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import { List } from 'semantic-ui-react'
import Search from "./Search/App/Search"
import Gallery from "./Gallery/App/Gallery"
import Detail from './Detail/App/Detail';
import "./SiteRouter.scss";
import header from "../assets/header.png";

/**
 * Routes the website globally.
 * Renders the header and also keeps track of header and detail routing 
 */
function SiteRouter() {
    return (
        <span>
            <Router>

                <Header />

                <div>
                    <Switch>
                        <Route path="/mp2/search">
                            <Search />
                        </Route>
                        <Route path="/mp2/gallery">
                            <Gallery />
                        </Route>
                        <Route path="/mp2/pokemon/:id" 
                                render={(props) => 
                                    <Detail {...props} url="https://pokeapi.co/api/v2/pokemon/"/>
                                }/>
                        <Route path="/">
                            <Search />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </span>

    );
}

function Header() {
    return(
        <span>
            <div className="logo-container">
            <img src={header}  
                alt="PokeAPI header I took from the site"/>
            </div>

            <div className="site-header">
                <List className="nav-links">
                    <List.Item className="link-item"> 
                        <Link to="/mp2/search" className="link">
                            Search
                        </Link>
                    </List.Item>
                    <List.Item className="link-item">
                        <Link to="/mp2/gallery" className="link">
                            Gallery
                        </Link>
                    </List.Item>
                </List>
            </div>
        </span>
    );
}

export default SiteRouter;