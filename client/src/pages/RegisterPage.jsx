import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/authContext';
import '../components/styles/register.css';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) navigate('/users');
  // }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    // Formatea el nombre completo con la primera letra de cada palabra en mayúscula y el resto en minúscula
    const formattedValues = {
      ...values,
      nombre: values.nombre
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    };
  
    let hasErrors = false;
  
    // Check for registration errors
    registerErrors.forEach((error, i) => {
      toast.error(error);  // Display the error using toast or your preferred method
      hasErrors = true;
    });
  
    // If there are errors, exit early and don't proceed with registration
    if (hasErrors) {
      return;
    }
  
    // If no errors, proceed with registration and navigation
    Swal.fire({
      width: '22em auto', // Controla el ancho, lo reduje para celulares.
      title: 'Verifica los datos',
      html: `
        <h1>Nombre: ${formattedValues.nombre}</h1>
        <h4>Documento: ${formattedValues.documento}</h4>
        <h4>Correo: ${formattedValues.email}</h4>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with registration and navigation
        signup(formattedValues);
        // toast.success('Registrado exitosamente.');
        // setTimeout(() => {
        //   navigate("/register");
        // }, 2500);
      }
    });
  });

  return (


    <div className="content-wrapper">
      <div>

        <div className='divPrincipal'>

          <div className='divSecundarioRegister flex'>

            <div className='imageBackground'>
            <h1 className='text-primary text-center tituModus'>Registro J&M</h1>

              <img src="https://p5.itc.cn/q_70/images03/20211101/50e200294c84426ea1d6d79b47cbcf56.gif" alt="" />
            </div>

            <div className='card-inner'>

              
              {registerErrors.map((error, i) => (
                <div className='bg-red-500 p-1 text-center text-white content-center' key={i}>
                  {error}
                </div>
              ))}


              <div className='containerRegister'>
                <form onSubmit={onSubmit}>
                  <div className='flex'>
                    <div className='inputs'>
                      <label>Nombre completo</label><br />
                      <input
                        type='text'
                        className='input'
                        placeholder='Nombre completo'
                        {...register('nombre', { required: true })}
                      />
                      {errors.nombre && <p className='text-red-500'>Se requiere el nombre</p>}
                    </div>
                    <div className='inputs'>
                      <label>Documento</label><br />
                      <input
                        type='text'
                        className='input'
                        placeholder='Documento'
                        {...register('documento', { required: true })}
                      />
                      {errors.documento && <p className='text-red-500'>Se requiere el documento</p>}
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='inputs'>
                      <label>Correo</label><br />
                      <input
                        type='email'
                        className='input'
                        placeholder='Correo'
                        {...register('email', { required: true })}
                      />
                      {errors.email && <p className='text-red-500'>Se requiere el correo</p>}
                    </div>
                    <div className='inputs'>
                      <label>Contraseña</label><br />
                      <input
                        type='password'
                        className='input'
                        placeholder='Contraseña'
                        {...register('contrasena', { required: true })}
                      />
                      {errors.contrasena && <p className='text-red-500'>Se requiere la contraseña</p>}
                    </div>
                  </div>


                  <div className='flex'>

                    <div className='inputs'>

                      <label>Selecciona un rol</label><br />

                      <select className='input' {...register('roles', { required: true })}>
                        <option value='' disabled>
                          Selecciona un rol
                        </option>
                        <option value='Administrador'>Administrador</option>
                        <option value='Gerente'>Gerente</option>
                      </select>

                    </div>

                    <div className='inputs'>

                      <label>Guarda el registro</label><br />

                      <button id='btn' className='button3' type='submit'>
                        Registrar
                      </button>

                    </div>

                  </div>

                  <p>
                    ¿Quieres regresar? <Link to='/users' className='textLoginAndRegister'>Regresa</Link>
                  </p>

                </form>
              </div>
            </div>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false}/>
      </div>
    </div>
  );
}

export default RegisterPage;
