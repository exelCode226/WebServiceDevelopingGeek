// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { ProtectedRoute } from "../../routes";

// import HomePage from "../../pages/HomePage";
// import RegisterPage from "../../pages/RegisterPage";
// import { TaskFormPage } from "../../pages/TaskFormPage";
// import { LoginPage } from "../../pages/LoginPage";
// import { TasksPage } from "../../pages/TasksPage";
// import { TaskProvider } from "../../context/tasksContext";
// import { EmpleadoProvider } from "../../context/empleadoContext";
// import { EmpleadoFormPage } from "../../pages/EmpleadoFormPage";
// import { EmpleadosPage } from "../../pages/EmpleadosPage";
// import { ProductFormPage } from "../../pages/ProductFormPages"; // Corregido el nombre del archivo
// import { ProductsPage } from "../../pages/ProductsPage";
// import { ProductProvider } from "../../context/productsContext";
// import { Navbar } from "../Navbar";
// import { AuthProvider, useAuth } from "../../context/authContext";

// export default function Content() {
//   const {useAuthenticated}=useAuth()
//     return (
//         <div class="content-wrapper">
//            <AuthProvider>
//                 <ProductProvider>
//                     <TaskProvider>
//                         <EmpleadoProvider>
//                             <BrowserRouter>
//                                 <div className="container content-container mx-auto px-10 md:px-0">
//                                    <Navbar/>
//                                     <Routes>
//                                         <Route path="/home" element={<HomePage />} />
//                                         <Route path="/login" element={<LoginPage />} />
//                                         <Route path="/register" element={<RegisterPage />} />
//                                         <Route element={<ProtectedRoute />}>
//                                             {/* Rutas relacionadas con tareas */}
//                                             <Route path="/tasks" element={<TasksPage />} />
//                                             <Route path="/add-task" element={<TaskFormPage />} />
//                                             <Route path="/tasks/:id" element={<TaskFormPage />} />

//                                             {/* Rutas relacionadas con empleados */}
//                                             <Route path="/empleados" element={<EmpleadosPage />} />
//                                             <Route path="/add-empleado" element={<EmpleadoFormPage />} />
//                                             <Route path="/empleados/:id" element={<EmpleadoFormPage />} />

//                                             {/* Rutas relacionadas con productos */}
//                                             <Route path="/products" element={<ProductsPage />} />
//                                             <Route path="/add-product" element={<ProductFormPage />} />
//                                             <Route path="/products/:id" element={<ProductFormPage />} />

//                                             {/* Otras rutas protegidas */}
//                                             <Route path="/profile" element={<h1>Profile</h1>} />
//                                         </Route>
//                                     </Routes>
//                                 </div>
//                             </BrowserRouter>
//                         </EmpleadoProvider>
//                     </TaskProvider>
//                 </ProductProvider>
//             </AuthProvider>
//         </div>

//     )
// }
