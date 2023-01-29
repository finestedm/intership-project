import './App.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useSearchParams } from 'react-router-dom';
import { Router, Routes, Route, Link, useParams  } from 'react-router-dom';
import Posts from './Posts';
import { Container, Button, Row, Col, Stack, Form } from 'react-bootstrap';

export default function App() {

  const [data, setData] = useState([])
  const [searchParameters, setSearchParameters] = useSearchParams({page: 1})
  
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
        <h1>you are on {searchParameters.get('page')} page</h1>
        <Routes>
          <Route path='/' element={<Posts name={searchParameters.get('page')} data={data} />} />
        </Routes>
        <Stack direction="horizontal" className='d-flex justify-content-between'>
          <Col><Button onClick={() => handlePageChange('prev')}> Prev </Button></Col>
          <Col><Button onClick={() => handlePageChange('next')}> Next </Button></Col>
        </Stack>
        <>
        <Form.Control
          placeholder='product id'
        /></>
      </Container>
    </div>
  );
}