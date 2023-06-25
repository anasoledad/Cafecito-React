import { Col, Card, Button } from "react-bootstrap";

const CardProducto = ({productos}) => {
  return (
    <>
    {productos.map((producto)=>( 
    <Col md={4} lg={3} key={producto.id} className="mb-3">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
        />
        <Card.Body>
          <Card.Title>{producto.nombreProducto}</Card.Title>
          <Card.Text>${producto.precio}</Card.Text>
          <Button variant="primary">Ver detalle</Button>
        </Card.Body>
      </Card>
    </Col>
    ))}
    </>
  );
};

export default CardProducto;