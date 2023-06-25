import { Container, Card, Row, Col } from "react-bootstrap";
import { obtenerProducto } from "../helpers/queries";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetalleProducto = () => {
  const {id} = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
      obtenerProducto(id).then((resp) => {
          setProducto(resp);   
      });
  }, []);
  
  if (!producto) {
    return <div>Cargando...</div>;
  }


  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.nombreProducto}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{producto.nombreProducto}</Card.Title>
              <hr />
              <Card.Text>
              Combinación perfecta entre leche, choclate, café intenso y un toque de canela. Café con granos 100% de arábica brasileña. Todo en una capsula inteligente.
              <br/>
              <br/>
              <span className="text-danger fw-semibold ">Categoria:</span> {producto.categoria}
              <br />
              <span className="text-danger fw-semibold ">Precio:</span> ${producto.precio}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;