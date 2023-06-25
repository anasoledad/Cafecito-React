import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useEffect, useState } from "react";
import { obtenerProductos } from "../helpers/queries";

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
      obtenerProductos().then((resp) => {
          setProductos(resp);
      });
  }, []);
  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="fondo cafe"
      />
      <Container>
        <h1 className="display-4">Nuestros Productos</h1>
        <hr />
        <Row>
            <CardProducto productos={productos}></CardProducto>
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;