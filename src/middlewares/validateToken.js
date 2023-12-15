import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from "../models/user.model.js";
import Role from "../models/role.model.js";



export const authRequired = async (req, res, next) => {
  // let token = req.headers["x-access-token"];

  // if (!token) return res.status(403).json({ message: "No token provided" });

    const { token } = req.cookies;

    if (!token)
        return res.status(401).json({ message: "No token, authorization danied" });


  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.userId = decoded.id;
    

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    req.user = user; //NO ME TOQUEN ESTO (BY: JOHAN)

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isAdministrador = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Administrador") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Necesitas permisos de administrador para esta tarea" })
}

export const isGerente = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Gerente") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Necesitas permisos de gerente para agregar tareas" })
}
export const isPropietario = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Propietario") {
          next();
          return;
      }
  }
  return res.status(403).json({ message: "Necesitas permisos de propietario para agregar tareas" })
}

export const isGerenteOPropietario = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // Verificar si el usuario tiene el rol de Gerente o Propietario
    const esGerenteOPropietario = roles.some(role => role.name === "Gerente" || role.name === "Propietario");

    if (esGerenteOPropietario) {
      next(); // El usuario es un gerente o propietario, continuar
    } else {
      return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
    }
  } catch (error) {
    console.error("Error al validar el rol del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

export const isAdminOGerente = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // Verificar si el usuario tiene el rol de Gerente o Propietario
    const esAdminOGerente = roles.some(role => role.name === "Gerente" || role.name === "Administrador");

    if (esAdminOGerente) {
      next(); // El usuario es un gerente o propietario, continuar
    } else {
      return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
    }
  } catch (error) {
    console.error("Error al validar el rol del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

export const isAdminOPropietario = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // Verificar si el usuario tiene el rol de Gerente o Propietario
    const esAdminOPropietario = roles.some(role => role.name === "Administrador" || role.name === "Propietario");

    if (esAdminOPropietario) {
      next(); // El usuario es un gerente o propietario, continuar
    } else {
      return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
    }
  } catch (error) {
    console.error("Error al validar el rol del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}
