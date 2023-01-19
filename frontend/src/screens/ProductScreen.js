import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`/api/product/${match.params.id}`);
      setProduct(data);
    };
    getProduct();
  }, []);
  return (
    <>
      <Link to={"/"} className="btn btn-light my-3">
        Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: {product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush"></ListGroup>
          <ListGroupItem>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>${product.price}</strong>
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>Status:</Col>
              <Col>{product.countInStock > 0 ? "In Stock" : "OutStock"}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Button
              className="btn-block"
              type="button"
              disabled={product.countInStock === 0}
            >
              Add To Card
            </Button>
          </ListGroupItem>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
