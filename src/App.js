import './App.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useSearchParams } from 'react-router-dom';
import { Router, Routes, Route, Link, useParams  } from 'react-router-dom';
import Posts from './Posts';
import { Container, Button, Row, Col, Stack, Form, InputGroup } from 'react-bootstrap';

export default function App() {

  const [data, setData] = useState([]);
  const [input, setInput] = useState('')
  const [searchParameters, setSearchParameters] = useSearchParams({ page: 1, id: '' });
  const itemsPerPage = 5;

  function setDataDependingOnType(res) {
    if (Array.isArray(res)) {
      setData(res)
    } else {
      setData([res])
    }
  }

  useEffect(() => {
    searchParameters.get('id') !== '' && setInput(searchParameters.get('id'))
  }, [])
  
  function handlePageChange(value) {
    const currentPageNumber = parseInt(searchParameters.get('page'))
    if (value === 'next') {
      searchParameters.set('page', currentPageNumber +1)
    } else if (value === 'prev' && currentPageNumber > 1) {
      searchParameters.set('page', currentPageNumber -1)
    } else if (currentPageNumber === NaN) {
      searchParameters.set('page', 1)
    }
    setSearchParameters(searchParameters)
  }

  useEffect(() => {
    const url = `https://reqres.in/api/products?id=${searchParameters.get('id')}&per_page=${itemsPerPage}&page=${searchParameters.get('page')}`

    const fetchData = async () => {
      const data = await fetch(url);
      if (data.status === 200) {
        const json = await data.json();
        return json
      } else  {
        throw new Error (data.status)
      }
    }

    fetchData()
      .then((res) => setDataDependingOnType(res.data))
  }, [searchParameters])

  useEffect(() => {
    searchParameters.set('id', input)
    setSearchParameters(searchParameters)
  }, [input])

  return (
    <div className="App">
      <Container className='d-flex flex-column gap-4'>
        <Routes>
          <Route path='/' element={<Posts name={searchParameters.get('page')} data={data} />} />
        </Routes>
        <Stack direction="horizontal" className='d-flex justify-content-between'>
          <Button onClick={() => handlePageChange('prev')}> Prev </Button>
          <Button onClick={() => handlePageChange('next')}> Next </Button>
        </Stack>
        <>
        <InputGroup>
          <Form.Control
              placeholder='product id'
              pattern="[0-9]*"
              value={input}
              onChange={(e) =>
                setInput((v) => (e.target.validity.valid ? e.target.value : v))
              }
          />
        </InputGroup>  
        </>
      </Container>
    </div>
  );
}