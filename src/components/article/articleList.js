import React, { useState, useEffect } from 'react';
import { getArticles, deleteArticle } from '../../api/article';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Modal } from 'bootstrap';

export function MyModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastPage, setLastPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [path, setPath] = useState('');
  const [total, setTotal] = useState('');
  const [activePage, setActivePage] = useState(currentPage);

  const [modalShow, setModalShow] = useState(false);

  
  useEffect(() => {
    fetchArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticles = async () => {
    const response = await getArticles(activePage, searchTerm);
    setLastPage(response.data.page_info.last_page);
    setCurrentPage(response.data.page_info.current_page);
    setPath(response.data.page_info.path);
    setTotal(response.data.page_info.total);
    setArticles(response.data.articles);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const handleDelete = async (id) => {
    await deleteArticle(id);
    setActivePage(1);
    fetchArticles();
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    fetchArticles();
  };
  
  const getPageItems = () => {
    const items = [];

    for (let page = 1; page <= lastPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === activePage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <>
    <div className='card'>
    <div className='card-body'>
      <div className='row'>
        <div className='col-md-8'>
          <form className='mb-3' onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchTerm}
            onChange={handleSearch}
            className='form-control'
            onSubmit={handleSearchSubmit}
          />
        </form>
        </div>
        <div className='col-md-2'>
          <div className='input-group'>
            <span className="input-group-text" id="basic-addon1"><i className="bi bi-calendar text-success"></i></span>
            <select className="form-select" aria-label="Select Year">
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
        <div className='col-md-2'>
          <div className='d-grid gap-2'>
            <Link to='/form/create' className='btn btn-success btn-sm btn-block p-2'><i className="bi bi-plus"></i> Add</Link>
          </div>
        </div>
      </div>      
      <table className='table table-bordered text-center'>
        <thead>
          <tr className='text-center'>
            <td className='bg-success text-light col-2'>Date</td>
            <td className='bg-success text-light'>Title</td>
            <td className='bg-success text-light'>Content</td>
            <td className='bg-success text-light col-2'>Actions</td>
          </tr>
        </thead>
        <tbody>
        {articles.map((article, index) => (
          <tr key={index}>
            <td>{moment(article.created_at).format('DD MM YYYY')}</td>
            <td>{article.title}</td>
            <td>{article.content.slice(0,100)}...</td>
            <td>
              <div className="d-grid gap-2 d-md-block">
                <Link to={`form/edit/`+article.id} className='btn btn-warning btn-sm me-1'><i className="bi bi-pencil-square"></i></Link>
                <button onClick={() => handleDelete(article.id)} className='btn btn-danger btn-sm'><i className="bi bi-trash3-fill"></i></button>
              </div>
            </td>
            </tr>
        ))}
        </tbody>
      </table>
      <div className='col-md-12'>
        <div className='col-md-4 text-muted mb-3'>
          Jumlah Data: {total}, Halaman: {activePage} - {lastPage} 
        </div>
        <div className='col-md-8'>
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
            />
            {getPageItems()}
            <Pagination.Next
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === lastPage}
            />
            <Pagination.Last onClick={() => handlePageChange(lastPage)} />
          </Pagination>
        </div>
      </div>
      </div>
    </div>
    </>
  );
  
}

export default ArticleList;
