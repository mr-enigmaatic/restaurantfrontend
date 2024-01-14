import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Details() {
  
  const { id } = useParams();
  const restaurants = useSelector((state)=> state.data.restaurants);

  const currentRes = restaurants.find((res) => res.id == id);

  return (
    <Container>
      {currentRes && (
        <Row className="mt-3">
          <Col md={8}>
            <Card>
              <Card.Img variant="top" src={currentRes.photograph} />
              <Card.Body>
                <Card.Title>{currentRes.name}</Card.Title>
                <Card.Text>
                  {currentRes.neighborhood},{currentRes.address}
                </Card.Text>
                <Card.Text>
                  <strong>Cuisine Type: </strong>
                  {currentRes.cuisine_type}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Header>
                <h2>
                  <strong>About us</strong>
                </h2>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minus, ullam animi? Laborum voluptate sint quidem
                  necessitatibus! Maxime eligendi magnam aspernatur laudantium
                  cum at labore voluptatibus qui blanditiis, aperiam commodi
                  quis optio, modi quo eius nam natus autem. Impedit quas
                  necessitatibus tenetur, dignissimos odio sapiente dicta
                  voluptates harum illo blanditiis recusandae sequi cum, eum
                  dolore temporibus aut deleniti deserunt! Reiciendis ducimus
                  laborum dolores quasi inventore, nulla tempora accusantium ad
                  velit fugiat?
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    <strong>Operating Hours</strong>
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  Monday : {currentRes.operating_hours.Monday}
                </ListGroup.Item>
                <ListGroup.Item>
                  Tuesday : {currentRes.operating_hours.Tuesday}
                </ListGroup.Item>
                <ListGroup.Item>
                  Wednesday : {currentRes.operating_hours.Wednesday}
                </ListGroup.Item>
                <ListGroup.Item>
                  Thursday : {currentRes.operating_hours.Thursday}
                </ListGroup.Item>
                <ListGroup.Item>
                  Friday : {currentRes.operating_hours.Friday}
                </ListGroup.Item>
                <ListGroup.Item>
                  Saturday : {currentRes.operating_hours.Saturday}
                </ListGroup.Item>
                <ListGroup.Item>
                  Sunday : {currentRes.operating_hours.Sunday}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
      {currentRes && (
        <Row className="mt-3">
          <Col>
            <Card className="shadow rounded">
              <Card.Header>
                <h2 className="text-center my-4">
                  <strong>Reviews</strong>
                </h2>
              </Card.Header>
              <Card.Body>
                <Row>
                  {currentRes &&
                    currentRes.reviews &&
                    currentRes.reviews.map((review, index) => (
                      <Col md={4} key={index} className="mb-4">
                        <Card>
                          <Card.Header className="text-center fs-5">
                            {review.name}
                          </Card.Header>
                          <Card.Body>
                            <blockquote className="blockquote fs-6 mb-0">
                              <p style={{ height: "250px" }}>
                                {review.comments}
                              </p>
                              <p className="text-center mb-4 h5">
                                <strong>Rated: {review.rating}</strong>
                              </p>
                              <footer className="blockquote-footer">
                                {review.date}
                              </footer>
                            </blockquote>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Details;
