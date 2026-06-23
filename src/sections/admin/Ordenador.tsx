import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdenadores } from '@/model/api/main/ordenadores';
import { deleteOrdenador } from '@/model/api/backend/ordenadores';
import type { IOrdenador } from '@/model/interfaces/IOrdenador';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Ordenador = () => {
  const [pcs, setPcs] = useState<IOrdenador[]>([]);

  useEffect(() => {
    const fetchPcs = async () => {
      const data = await getOrdenadores();
      setPcs(data);
    };

    fetchPcs();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este equipo? Esta acción no se puede deshacer.");
    if (!confirmar) return;

    const success = await deleteOrdenador(id);
    
    if (success) {
      setPcs(pcs.filter(pc => pc.id !== id));
    } else {
      alert("Hubo un error al intentar borrar el equipo. Revisa la consola.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administración de Equipos</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona el catálogo de ordenadores de tu tienda.</p>
        </div>
        <Link to="/admin/equipos/nuevo">
          <Button className="bg-indigo-600 hover:bg-indigo-700">Añadir Nuevo Equipo</Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Nombre del Equipo</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-center w-[150px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pcs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                  Cargando equipos...
                </TableCell>
              </TableRow>
            ) : (
              pcs.map((pc) => (
                <TableRow key={pc.id}>
                  <TableCell className="font-medium text-gray-900">{pc.id}</TableCell>
                  <TableCell className="text-gray-600">{pc.nombre}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 uppercase">
                      {pc.marca}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{pc.precio}€</TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => pc.id && handleDelete(pc.id)}
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

export default Ordenador;