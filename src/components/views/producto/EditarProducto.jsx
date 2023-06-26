import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { consultaEditarProducto, obtenerProducto } from "../../helpers/queries";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditarProducto = () => {
  const { id } = useParams();
  const navegacion = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    obtenerProducto(id).then((respuesta) => {
      console.log(respuesta);
      setValue("nombreProducto", respuesta.nombreProducto);
      setValue("precio", respuesta.precio);
      setValue("categoria", respuesta.categoria);
      setValue("imagen", respuesta.imagen);
      setValue("descripcion", respuesta.descripcion);
    });
  }, []);

  const onSubmit = (productoEditado) => {
    console.log(productoEditado);
    consultaEditarProducto(productoEditado, id).then((respuesta) => {
      if (respuesta && respuesta.status === 200) {
        Swal.fire(
          "Producto actualizado",
          `El producto: ${productoEditado.nombreProducto} fue actualizado correctamente`,
          "success"
        );
        navegacion("/administrador");
      } else {
        Swal.fire(
          "Ocurrio un error",
          `El producto: ${productoEditado.nombreProducto} no fue actualizado, intente esta operacion en breve`,
          "error"
        );
      }
    });
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5 px-md-5">Editar producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)} className="mx-md-5 px-2 px-md-5 border border-3 border-secondary-subtle rounded-2 my-4 bg-danger-subtle">
        <Form.Group className="mb-3 mt-4" controlId="formNombreProdcuto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "El nombre del producto es obligatorio",
              minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
              maxLength: {
                value: 100,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "El precio del producto es obligatorio",
              min: {
                value: 1,
                message: "El precio minimo es de $1",
              },
              max: {
                value: 10000,
                message: "El precio maximo es de $10000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("imagen", {
              required: "La imagen es obligatoria",
              min: {
                value: 8,
                message: "La URL debe tener como minimo 8 caracteres",
              },
              max: {
                value: 200,
                message: "La URL debe tener  como maximo 200 caracteres",
              },
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/,
                message: "Por favor, ingresa una URL válida de imagen",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "La imagen es obligatoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="bebida caliente">Bebida caliente</option>
            <option value="bebida fria">Bebida fria</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Breve descripción del producto"
            {...register("descripcion", {
              required: "este campo es obligatorio",
              minLength: {
                value: 8,
                message: "Este campo debe tener como minimo 8 caracteres",
              },
              maxLength: {
                value: 1000,
                message: "Este campo debe tener  como maximo 1000 caracteres",
              },
            })}
          ></Form.Control>
          <Form.Text className="text-danger">
            {errors.descripcion?.message}
          </Form.Text>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="dark mb-4 px-5" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default EditarProducto;
