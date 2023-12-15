import User from '../models/user.model.js'
import bcrypt from "bcryptjs"
// import jwt from 'jsonwebtoken'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import nodemailer from 'nodemailer';
import Role from "../models/role.model.js"






// registrar new usuario
export const register = async (req, res) => {

  const { nombre, documento, email, contrasena, roles } = req.body

  try {

    const userFound = await User.findOne({ documento })
    if (userFound)
      return res.status(400).json(['Este documento ya existe.'])

    const userFound2 = await User.findOne({ email })
    if (userFound2)
      return res.status(400).json(['Este correo ya existe.'])

    const contrasenaHash = await bcrypt.hash(contrasena, 10) //Para encriptar la contrasena

    const newUser = new User({
      nombre,
      documento,
      email,
      contrasena: contrasenaHash,
      roles
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } }) //acá estamos verificando que el rol que el usuario está ingresando exista.
      newUser.roles = foundRoles.map(role => role._id)

    } else {
      const role = await Role.findOne({ name: "Administrador" }) // y si no existe el rol, predeterminadamente se registrará como un administrador.
      newUser.roles = [role._id]
    }

    const userSaved = await newUser.save();

    // await Swal.fire({
    //     icon: 'success',
    //     title: 'Usuario registrado',
    //     timer: 2000, // 2 segundos
    //     showConfirmButton: false,
    // });


    // para iniciar sesion una vez registrado:
    // const token = await createAccessToken({ id: userSaved._id });

    // res.cookie("token", token);

    res.json({
      id: userSaved._id,
      nombre: userSaved.nombre,
      email: userSaved.email,
      // documento: userSaved.documento   
    });




  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};




// loguear con el usuario creado
export const login = async (req, res) => {

  const { email, contrasena } = req.body

  try {

    const userFound = await User.findOne({ email }).populate("roles")
    console.log(userFound)
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado." });

    const isMatch = await bcrypt.compare(contrasena, userFound.contrasena) //Para encriptar la contrasena

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta." });


    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    console.log("User true")

    res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      email: userFound.email,
      // documento: userSaved.documento   
    });


  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};



export const logout = (req, res) => {


  // el toquen que guarda se elimina en el tiempo que le indique (expires), básicamente no va a ver token porque expira de inmediato
  res.cookie('token', "", {
    expires: new Date(0)
  })

  return res.sendStatus(200);

}


export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(401).json({ message: "Usuario no encontrado." });

  return res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    email: userFound.email,
  })

}

export const verifyToken = async (req, res) => {

  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {

    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id)

    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      email: userFound.email,
    })

  })

}


export const getUsers = async (req, res) => {
  try {
      const users = await User.find()
      .populate("roles","name");
      res.json(users)
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Empleado not found" });

    return res.status(204).json({message: "Borrado Con Exito"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};  



export const JWT_SECRET = 'clave12'
export const EMAIL_USERNAME = 'johanparra2319@gmail.com'
export const EMAIL_PASSWORD = '**'

// Send password reset email
export const sendPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'clave12', {
      expiresIn: '1h',
    });

    // Send password reset email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'johanparra2319@gmail.com',
        pass: '**',
      },
    });

    const mailOptions = {
      from: 'johanparra2319@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="${'http://localhost:4000/reset-password?token='}/reset-password/${token}">${'http://localhost:4000/reset-password?token='}/reset-password/${token}</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { contrasena } = req.body;

    // Verify JWT token
    const decodedToken = jwt.verify(token, 'clave12');
    const userId = decodedToken.userId;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Update user password
    await User.findByIdAndUpdate(userId, { contrasena: hashedPassword });

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


