import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { BackendLayout } from "@/layouts/BackendLayout";
import Inicio from "@/sections/Inicio";
import SobreMi from "@/sections/SobreMi";
import Formacion from "@/sections/Formacion";
import Proyectos from "@/sections/Proyectos";
import Servicios from "@/sections/Servicios";
import ServicioDetalle from "@/sections/ServicioDetalle";
import Contacto from "@/sections/Contacto";
import Ordenador from "@/sections/admin/Ordenador";
import NuevoOrdenador from "@/sections/admin/NuevoOrdenador";
import NuevaFormacion from "@/sections/admin/NuevaFormacion";
import AdminFormacion from "@/sections/admin/Formacion";
import AdminProyectos from "@/sections/admin/Proyecto";
import NuevoProyecto from "@/sections/admin/NuevoProyecto";
import Dashboard from "@/sections/admin/Dashboard";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={
            <>
              <Inicio />
              <SobreMi />
            </>
          } />
          <Route path="formacion" element={<Formacion />} />
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="servicios/:id" element={<ServicioDetalle />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>

        <Route path="/admin" element={<BackendLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="equipos" element={<Ordenador />} />
          <Route path="equipos/nuevo" element={<NuevoOrdenador />} />
          <Route path="proyectos" element={<AdminProyectos />} />
          <Route path="proyectos/nuevo" element={<NuevoProyecto />} />
          <Route path="formacion" element={<AdminFormacion />} />
          <Route path="formacion/nueva" element={<NuevaFormacion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};