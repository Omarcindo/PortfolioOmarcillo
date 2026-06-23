import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProyectos } from '@/model/api/main/proyectos';
import { deleteProyecto } from '@/model/api/backend/proyectos';
import type { IProyecto } from '@/model/interfaces/IProyecto';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AdminProyectos = () => {
  const [proyectos, setProyectos] = useState<IProyecto[]>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      const data = await getProyectos();
      setProyectos(data);
    };
    fetchDatos();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este proyecto de tu portfolio?');
    if (!confirmar) return;

    const success = await deleteProyecto(id);
    if (success) {
      setProyectos(prev => prev.filter(p => p.id !== id));
    } else {
      alert('Error al intentar eliminar el registro.');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proyectos de Portfolio</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona los trabajos y aplicaciones de tu escaparate web.</p>
        </div>
        <Link to="/admin/proyectos/nuevo">
          <Button className="bg-slate-950 hover:bg-slate-900 text-white">Añadir Proyecto</Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoría / Tech</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-center w-[120px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proyectos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                  No hay proyectos registrados.
                </TableCell>
              </TableRow>
            ) : (
              proyectos.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="h-10 w-10 flex-shrink-0 rounded-md bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                      {p.imageUrl ? (
                        <img className="h-full w-full object-cover" src={p.imageUrl} alt={p.title} />
                      ) : (
                        <span className="text-[10px] text-slate-400">N/A</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{p.title}</div>
                    <div className="text-xs text-blue-600 hover:underline">
                      <a href={p.href} target="_blank" rel="noreferrer">Ver Demo</a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                      {p.category?.title || 'Sin categoría'}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {p.date}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => p.id && handleDelete(p.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProyectos;