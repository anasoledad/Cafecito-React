import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardProducto = ({productos}) => {
  return (
    <>
    {productos.map((producto)=>( 
    <Col md={4} lg={3} key={producto.id} className="mb-3">
      <Card className="h-100 bg-secondary-subtle">
        <Card.Img className="card-imagen"
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
        />
        <Card.Body>
          <Card.Title>{producto.nombreProducto}</Card.Title>
          <Card.Text>${producto.precio}</Card.Text>
          <div className="d-flex justify-content-end"> 
          <Link to={`/detalleproducto/${producto.id}`} type="button" className="btn btn-dark">
                Ver receta
              </Link>
          </div>
          
        </Card.Body>
      </Card>
    </Col>
    ))}
    </>
  );
};

export default CardProducto;