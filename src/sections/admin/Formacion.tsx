import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFormaciones } from '@/model/api/main/formacion';
import { deleteFormacion } from '@/model/api/backend/formacion';
import type { IFormacion } from '@/model/interfaces/IFormacion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AdminFormacion = () => {
  const [formaciones, setFormaciones] = useState<IFormacion[]>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      const data = await getFormaciones();
      setFormaciones(data);
    };
    fetchDatos();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm('¿Eliminar esta titulación de la base de datos de forma permanente?');
    if (!confirmar) return;

    const success = await deleteFormacion(id);
    if (success) {
      setFormaciones(prev => prev.filter(f => f.id !== id));
    } else {
      alert('Error al intentar eliminar el registro.');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historial Académico</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona tus cursos, certificados y titulaciones.</p>
        </div>
        <Link to="/admin/formacion/nueva">
          <Button className="bg-slate-950 hover:bg-slate-900 text-white">Añadir Titulación</Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Foto</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-center w-[120px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formaciones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                  No hay formaciones registradas.
                </TableCell>
              </TableRow>
            ) : (
              formaciones.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>
                    <div className="h-10 w-10 flex-shrink-0 rounded-md bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                      {f.imageUrl ? (
                        <img className="h-full w-full object-cover" src={f.imageUrl} alt={f.title} />
                      ) : (
                        <span className="text-[10px] text-slate-400">N/A</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{f.title}</div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                      {f.category?.title || 'Sin categoría'}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {f.date}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => f.id && handleDelete(f.id)}
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

export default AdminFormacion;