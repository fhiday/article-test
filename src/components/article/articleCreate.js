import React, { useState } from 'react';
import {createArticle, deleteArticle, getOneArticles, updateArticle } from '../../api/article';
import { useNavigate, useParams } from 'react-router-dom';

function ArticleCreate() {
    let { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
      e.preventDefault();
      setTitle(e.target.value);
    };
  
    const handleContentChange = (e) => {
      setContent(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const articleData = {
        title,
        content
      };
      await createArticle(articleData);
      setTitle('');
      setContent('');
      navigate('/');
    };
      
    return (
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Add {id}</h4>
          <hr />
          <div className='row'>
            <div className='col-md-4'>
              <form onSubmit={handleSubmit}>
              <div className='mb-2'>
                <input
                  className='form-control'
                  type="text"
                  placeholder="Judul"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className='mb-2'>
                <textarea
                  className='form-control'
                  placeholder="Konten"
                  value={content}
                  onChange={handleContentChange}
                ></textarea>
              </div>
              <button type="submit" className='btn btn-success'>Save</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    );

  }

export default ArticleCreate;