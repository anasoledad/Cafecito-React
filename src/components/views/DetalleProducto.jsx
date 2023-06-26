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
      <Card className="border-3 border-dark bg-secondary-subtle">
        <Row>
          <Col md={6}>
            <Card.Img className="img-detail"
              variant="top"
              src={producto.imagen}
              alt={producto.nombreProducto}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{producto.nombreProducto}</Card.Title>
              <hr className="text-danger border-4"/>
              <Card.Text>
              {producto.descripcion}
              <br/>
              <br/>
              <span className="text-danger fw-bold ">Categoria: </span> <span className="fw-bold">{producto.categoria}</span>
              <br />
              <span className="text-danger fw-bold ">Precio: </span><span className="fw-bold"> ${producto.precio}</span></Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;