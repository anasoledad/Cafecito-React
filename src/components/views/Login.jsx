import { Form, Button, Container, Card } from "react-bootstrap";
import { login } from "../helpers/queries";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (usuario) => {
    // console.log(usuario)
    login(usuario).then((respuesta) => {
      if (respuesta) {
        //debo loguear el usuario
        sessionStorage.setItem("usuario", JSON.stringify(respuesta));
        setUsuarioLogeado(respuesta);
        Swal.fire("Bienvenido", "Ingresaste correctamente", "success");
        /* lo reedirigimos a otra page */
        navegacion("/administrador");
      } else {
        //indicar datos errores al usuario
        Swal.fire("Error", "Error en password o en contraseña", "error");
      }
    });
  };

  return (
    <Container className="mainSection">
      <Card className="my-5">
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese un email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message:
                      "El email debe contener @ y terminar . com/es/com.ar u otra terminacion",
                  },
                })}
              />
              <Form.Group className="text-danger">
                {errors.email?.message}
              </Form.Group>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "La contraseña debe tener como maximo 20 caracteres",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "El password debe contener 8 caracteres (al menos 1 letra mayúscula, 1 letra minúscula y 1 numero) también puede incluir carácteres especiales",
                  },
                })}
              />
              <Form.Group className="text-danger">
                {errors.password?.message}
              </Form.Group>
            </Form.Group>

            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
