import Task from "../models/task.model.js";

// PARA TRAER TODAS LAS TAREAS SIN IMPORTAR EL USUARIO QUE LA HAYA CREADO 
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", "documento");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// // Solo para mostrar la tarea por usuario que haya creado la misma
// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ user : req.user.id }).populate("user", "nombre");
//     res.json(tasks);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    );
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

////////////////////////////////////////////////////////////

export const getEmpleados = async (req, res) => {
  try {
    const empleados = await empleSchema.find({ user: req.user.id }).populate("user");
    res.json(empleados);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const { username, lastname, typeEmpl, identify } = req.body;
    const newEmpleado = new empleSchema({
      username,
      lastname,
      typeEmpl,
      identify,
      user: req.user.id,
    });
    await newEmpleado.save();
    res.json(newEmpleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const deletedEmpleado = await empleSchema.findByIdAndDelete(req.params.id);
    if (!deletedEmpleado)
      return res.status(404).json({ message: "Empleado not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const { username, lastname, typeEmpl, identify } = req.body;
    const empleadoUpdated = await empleSchema.findOneAndUpdate(
      {_id:req.params.id},
      { username, lastname, typeEmpl, identify },
      { new: true }
    );
    return res.json(empleadoUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmpleado = async (req, res) => {
  try {
    const empleado = await empleSchema.findById(req.params.id);
    if (!empleado) return res.status(404).json({ message: "Empleado not found" });
    return res.json(empleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
