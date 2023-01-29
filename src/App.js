import logo from './logo.svg';
import './App.css';
import eee from './eee';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useSearchParams } from 'react-router-dom';
import { Router, Routes, Route, Link, useParams  } from 'react-router-dom';
import Posts from './Posts';
import { Container, Button, Row, Col, Stack } from 'react-bootstrap';

export default function App() {

  const [data, setData] = useState([])
  const [searchParameters, setSearchParameters] = useSearchParams({page: null})
  
  function handlePageChange(value) {
    const currentPageNumber = parseInt(searchParameters.get('page'))
    if (value === 'next') {
      setSearchParameters({...searchParameters, page: currentPageNumber +1})
    } else if (value === 'prev' && currentPageNumber > 1) {
      setSearchParameters({...searchParameters, page: currentPageNumber -1})
    }
  }

  useEffect(() => {
    const url = `https://reqres.in/api/products?page=${searchParameters.get('page')}`
    const fetchData = async () => {
      const data = await fetch(url);
      const json = await data.json();
      return json
    }

    fetchData()
      .then((res) => setData(res.data))
      .catch(console.error)
  }, [searchParameters])

  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path='/' element={<Posts name={searchParameters.get('page')} data={data} />} />
        </Routes>
        <Stack direction="horizontal" className='d-flex justify-content-between'>
          <Button as='Col' onClick={() => handlePageChange('prev')}> Prev </Button>
          <Button as='Col' onClick={() => handlePageChange('next')}> Next </Button>
        </Stack>
      </Container>
    </div>
  );
}