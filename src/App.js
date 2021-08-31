import './App.css';
import React from 'react';
import TrendingStickers from './components/TrendingStickers';
import SearchStickers from './components/SearchStickers';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

  const [page, setPage] = React.useState('main');

  function Home() {
    return (
      <div>
        Main!
      </div>
    );
  }

  const pageSelect = () => {
      return (
        <div>
          <Link to="/">
            <button>Main</button>
          </Link>
          <Link to="/search-stickers">
            <button>Search</button>
          </Link>
          <Link to="/trending">
            <button>Trending</button>
          </Link>
        </div>
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
