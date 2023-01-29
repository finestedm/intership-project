import { ListGroup, Row, Col } from 'react-bootstrap';
import { Router, Routes, Route, Link, useParams  } from 'react-router-dom';

function Post({ product }) {
    const { name, id, year } = product;
    return (
        <Row>
            <Col xs={1}>{id}</Col>
            <Col className='border-start border-end'>{name}</Col>
            <Col xs={2}>{year}</Col>
        </Row>
    )
}

export default function Posts({ data }) {
   
    return (
        <ListGroup>
            {data.map(product => <ListGroup.Item><Post product={product} /></ListGroup.Item>)}
        </ListGroup>
        )
  }