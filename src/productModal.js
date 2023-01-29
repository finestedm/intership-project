import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap"

export default function ProductModal({ productSelected, show, showModal }) {
    const { name, id, year, color, pantone_value } = productSelected;
    return (
    <Modal show={show} onHide={showModal}>
        <Modal.Header style={{backgroundColor: color}} closeButton>
            <Modal.Title>{name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <h5>Product details</h5>
            <ListGroup>
                <ListGroup.Item>year: {year}</ListGroup.Item>
                <ListGroup.Item>id: {id}</ListGroup.Item>
                <ListGroup.Item>pantone value: {pantone_value}</ListGroup.Item>
                    
            </ListGroup>
        </Modal.Body>
    </Modal>
    )
}