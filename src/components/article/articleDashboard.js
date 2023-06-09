import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ArticleList from './articleList';
import ArticleCreate from './articleCreate';

function Article() {
    return (
      <Router>
        <nav>
            <ul>
                <li><Link to="/">List</Link></li>
                <li><Link to="/create">Tambah</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route exact path='/' element={<ArticleList />}></Route>
            <Route exact path='/create' element={<ArticleCreate />}></Route>
        </Routes>
      </Router>
    );
  }
  
  export default Article;