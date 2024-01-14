import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



function Home() {

  const restaurants = useSelector((state)=> state.data.restaurants);
  
  return (
    
    <Container>
      <Row>
        {restaurants &&
          restaurants.map((res, index) => (
            <Col md={4} className="mt-3" key={index}>
              <Card>
                <Card.Img variant="top" src={res.photograph} />
                <Card.Body>
                  <Card.Title>{res.name}</Card.Title>
                  <Card.Text>
                    {res.neighborhood},{res.address}
                  </Card.Text>
                  <Card.Text>
                    <strong>Cuisine Type: </strong>
                    {res.cuisine_type}
                  </Card.Text>
                  <Button as= {Link} to = {`/details/${res.id}`} variant="primary">More Info</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Home;
