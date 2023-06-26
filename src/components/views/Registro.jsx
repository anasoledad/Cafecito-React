import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { signUp } from "../helpers/queries";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Registro = ({setUsuarioLogueado}) => {
  const navegacion = useNavigate();
  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm();

  const onSubmit = (nuevoUsuario) => {
      signUp(nuevoUsuario).then((resp) => {
          if (resp) {
              sessionStorage.setItem("usuario", JSON.stringify(resp));
              setUsuarioLogueado(resp);
              Swal.fire("Bienvenido", "Te registraste correctamente", "success");
              navegacion("/administrador");
          } else {
              Swal.fire("Error", "Intentelo en breve coneccion inestable", "error");
          }
      });
  };
  return (
    <div className="container mainSection ">
      <h3 className="text-center display-6 mb-4">Registro</h3>
    <div className="px-5 d-flex justify-content-center">
        <Col md={6}>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Control
                    className="input"
                    type="text"
                    placeholder="Ingrese un nombre de usuario"
                    {...register("nombreUsuario", {
                        required: "Este campo es obligatorio",
                        minLength: {
                            value: 2,
                            message: "El nombre debe tener al menos 6 caracteres",
                        },
                        maxLength: {
                            value: 20,
                            message:
                                "El nombre  debe tener como maximo 20 caracteres",
                        },
                        pattern: {
                          value: /^(?!\s)(.*\S)$/,
                          message: "El nombre no puede contener espacios en blanco al inicio ni al final",
                        },
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.nombreUsuario?.message}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    className="input"
                    type="email"
                    placeholder="Ingrese un email"
                    {...register("email", {
                        required: "Este dato es obligatorio",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Ingresa un correo electrónico válido",
                        },
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.email?.message}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", {
                        required: "Este dato es obligatorio",
                        minLength: {
                            value: 6,
                            message:
                                "La contraseña debe tener al menos 6 caracteres",
                        },
                        maxLength: {
                            value: 20,
                            message:
                                "La contraseña debe tener como maximo 20 caracteres",
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message:
                                "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número",
                        },
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.password?.message}
                </Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button className="px-5" variant="dark" type="submit">
                    Registrar
                </Button>
            </div>
        </Form>
        <section className="text-center mt-4">
            <p>
                No estás registrado? <Link to="/Login">Inicia sesión!</Link>
            </p>
        </section>
        </Col>
    </div>
</div>
  );
};

export default Registro;



