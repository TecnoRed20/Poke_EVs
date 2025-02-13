import React, { useEffect, useState } from 'react';
import './App.css'
import './Animation_loader.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, filterByEffort } from './store/actions';
import Card from './component/Card';
import Footer from './component/Footer';
import Header from './component/Header';
import Filters from './component/Filters';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const totalLimit = useSelector(state => state.totalLimit) ?? 1302
  const [offset, setOffset] = useState(0);
  const limit = 30; // Número de elementos a cargar por llamada
  const filters = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(fetchData(limit, offset));
  }, [dispatch, offset]);
  
  useEffect(() => {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight && offset <= totalLimit ) {
      setOffset(prevOffset => prevOffset + limit);
    }
    // eslint-disable-next-line
  }, [loading, filters]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500 && !loading && offset <= totalLimit) {
      setOffset(prevOffset => prevOffset + limit);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
    // eslint-disable-next-line
  }, [loading]);

  // useEffect(() => {}, [filters])

  return (
    <main>
      <Header></Header>
      <Filters></Filters>
      <article className='main-container-article'>
        {filterByEffort(data, filters).sort((a, b) => a.id - b.id).map((data_, index) => (
          <Card key={index} data={data_}></Card>
        ))}
      </article>
      {loading && 
        <div className="main-container-loader">
          <div className="container-loader">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
      }
      {error && 
        <p>Error: {error.message}</p>
      }
      <Footer></Footer>
    </main>
  );
}

export default App;



