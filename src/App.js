import React, { useEffect, useState } from 'react';
import './App.css'
import './Animation_loader.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './store/actions';
import Card from './component/Card';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const totalLimit = useSelector(state => state.totalLimit) ?? 1302
  const [offset, setOffset] = useState(0);
  const limit = 30; // Número de elementos a cargar por llamada

  useEffect(() => {
    dispatch(fetchData(limit, offset));
  }, [dispatch, offset]);
  
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500 && !loading && offset <= totalLimit) {
      setOffset(prevOffset => prevOffset + limit);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [loading]);

  return (
    <main>
      <nav>...</nav>
      <header>...</header>
      <article className='main-container-article'>
        {data.map((data_, index) => (
          <Card key={index} data={data_}></Card>
        ))}
      </article>
      {loading && 
        <div class="main-container-loader">
          <div class="container-loader">
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
          </div>
        </div>
      }
      {error && 
        <p>Error: {error.message}</p>
      }
      <footer>...</footer>
    </main>
  );
}

export default App;



