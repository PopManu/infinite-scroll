import './App.css';
import React from 'react';
import TrendingStickers from './components/TrendingStickers';
import SearchStickers from './components/SearchStickers';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components'



const Header = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;
  background-color: #202020;
`;

const HeaderLinkContainer = styled.div`
  width: 100%; 
  display: flex; 
  margin-top: 40px;
  justify-content: center;
  a {
    text-decoration: none;
  }
`;

const HeaderLink = styled.a`
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 40px;
  &:hover {
    color: #6a7bff;
  }
`;


function App() {
  const [page, setPage] = React.useState('main');

  function Home() {
    return (
      <div>
        Home
      </div>
    );
  }

  const pageSelect = () => {
      return (
        <Header>
          <HeaderLinkContainer>
            <Link to="/">
              <HeaderLink>Main</HeaderLink>
            </Link>
            <Link to="/search-stickers">
              <HeaderLink>Search</HeaderLink>
            </Link>
            <Link to="/trending">
              <HeaderLink>Trending</HeaderLink>
            </Link>
          </HeaderLinkContainer>
        </Header>
      );
  }

  return (
    <Router>
      <div>
        {pageSelect()}
        <Switch>
          <Route path="/search-stickers">
            <SearchStickers />
          </Route>
          <Route path="/trending">
            <TrendingStickers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
