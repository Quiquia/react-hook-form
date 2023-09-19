import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("enviando datos...");
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      {/* nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre es requerido",
          },
          minLength: {
            value: 2,
            message: "Nombre debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 10,
            message: "Nombre debe tener al másimo 20 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      {/* correo */}
      <label htmlFor="corre">Correo</label>
      <input
        type="email"
        {...register("correo", {
          required: {
            value: true,
            message: "Correo Requerido",
          },
          pattern: {
            value:
              /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
            message: "Correo no válido",
          },
        })}
      />
      {errors.correo && <span>{errors.correo.message}</span>}

      {/* password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Contraseña Requerido",
          },
          minLength: {
            value: 6,
            message: "Password debe tener al menos 6 caracteres",
          },
          maxLength: {
            value: 10,
            message: " Password debe tener al maximo 10 caracteres",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      {/* password */}
      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Confirmar Contraseña Requerido",
          },
          validate: (value) =>
            value === watch("password") || "Los passwords no coinciden",
        })}
      />

      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}

      {/* fechaNacimiento */}
      <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
      <input
        type="date"
        {...register("fecha", {
          required: {
            value: true,
            message: "Fecha de Nacimiento es requerida",
          },
          validate: (value) => {
            console.log(value);
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();

            const edad =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            return edad >= 18 || "Fecha no valida";
          },
        })}
      />

      {errors.fecha && <span>{errors.fecha.message}</span>}

      {/* pais */}
      <label htmlFor="pais">País</label>
      <select name="" id="" {...register("pais")}>
        <option value="mx">México</option>
        <option value="pe">Perú</option>
        <option value="ar">Argetina</option>
      </select>

      {watch("pais") === "pe" && (
        <>
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia es requerida",
              },
            })}
          />
          {errors.provincia && <span>{errors.provincia.message}</span>}
        </>
      )}

      {/* file */}
      <label htmlFor="file">Foto de perfil</label>
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setValue("fotoDelUsuario", e.target.files[0].name);
        }}
      />

      {/* terminos */}
      <label htmlFor="terminos">Acepto términos y condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar los terminos",
          },
        })}
      />
      {errors.terminos && <span>{errors.terminos.message}</span>}

      <button type="submit">Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}

export default App;
