import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Row, Col, Card } from 'react-bootstrap';
import { useHomePageData } from "./hooks/useHomePageData";



function App() {
  const data = useHomePageData();

  if (!data) return <div>Loading...</div>;

  const { title, header, main_body, footer } = data;
  function stripHTML(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  

  return (
    <div>
      {/* Header */}
      <Navbar bg="light" expand="lg">
        <Container>
          {header?.logo_image?.url && (
            <Navbar.Brand>
              <img
                src={header.logo_image.url}
                alt="Logo"
                style={{ height: "40px" }}
              />
            </Navbar.Brand>
          )}
          <Nav className="me-auto">
            <Nav.Link href={header?.home_page?.url}>Home</Nav.Link>
            <Nav.Link href={header?.about_us?.url}>About Us</Nav.Link>
            <Nav.Link href={header?.contact_us?.url}>Contact Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Title */}
      <Container className="mt-4">
        <h2 className="text-center">{title}</h2>
        <hr />

        {/* Main Body */}
        <Row className="mt-4">
          {main_body?.map((block, index) => (
            <Col md={6} key={index}>
              <Card className="mb-4">
                {block.group_image?.url && (
                  <Card.Img
                    variant="top"
                    src={block.group_image.url}
                    alt={`Image ${index + 1}`}
                  />
                )}
                <Card.Body>
                  <Card.Text>{stripHTML(block.para)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-light text-center mt-5 p-3">
        <Container>
          <Row className="align-items-center">
            <Col>
              {footer?.image_logo_footer?.url && (
                <img
                  src={footer.image_logo_footer.url}
                  alt="Footer Logo"
                  style={{ height: "40px" }}
                />
              )}
            </Col>
            <Col>
              <Nav className="justify-content-center">
                <Nav.Item>
                  <Nav.Link href={footer?.contact_us?.url}>Contact Us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href={footer?.about_us?.url}>About Us</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;