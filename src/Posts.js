import { ListGroup, Row, Col, Modal, Button, ListGroupItem } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Router, Routes, Route, Link, useParams } from 'react-router-dom';
import ProductModal from './productModal';

function Post({ product, showModal, setProductSelected }) {
    const { name, id, year } = product;
    
    return (
        <ListGroup.Item style={{backgroundColor: product.color}}>
            <Row
                onClick={() => {
                    setProductSelected(product)
                    showModal()
                }}
            >
                <Col xs={1}>{id}</Col>
                <Col className='border-start border-end'>{name}</Col>
                <Col xs={2}>{year}</Col>
            </Row>
        </ListGroup.Item>
    )
}

export default function Posts({ data }) {
    const [productSelected, setProductSelected] = useState(null)
    const [show, setShow] = useState(false);
    function showModal() {
        show ? setShow(false) : setShow(true)
    }
    return (
        <>
            <ListGroup>
                {data.map(product => <Post showModal={showModal} product={product} key={product.id} setProductSelected={setProductSelected} />)}
            </ListGroup>
            {productSelected && <ProductModal show={show} showModal={showModal} productSelected={productSelected} />}
        </>
        )
  }