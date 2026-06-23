import { useState } from 'react';
import { insertOrdenador } from '@/model/api/backend/ordenadores';
import type { IOrdenador } from '@/model/interfaces/IOrdenador';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const NuevoOrdenador = () => {
  const [formData, setFormData] = useState<Omit<IOrdenador, 'id'>>({
    nombre: '',
    marca: '',
    precio: 0,
    imagen_url: '',
    procesador: '',
    ram: '',
    almacenamiento: '',
    grafica: '',
    descripcion: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const success = await insertOrdenador(formData);
    
    if (success) {
      setStatus('success');
      setFormData({
        nombre: '', marca: '', precio: 0, imagen_url: '',
        procesador: '', ram: '', almacenamiento: '', grafica: '', descripcion: ''
      });
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="p-8 w-full max-w-5xl mx-auto">
      <p className="text-sm font-medium text-slate-500 mb-8">Administración de la Sección de Equipos</p>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Insertar Nuevo Equipo</h1>
        <p className="text-slate-500 mt-2 text-sm">
          Inserta un nuevo equipo en tu catálogo. Completa el formulario con la información del ordenador.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="nombre" className="font-semibold text-slate-900">Título</Label>
              <Input id="nombre" name="nombre" placeholder="Nombre del equipo" required value={formData.nombre} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marca" className="font-semibold text-slate-900">Marca</Label>
              <Input id="marca" name="marca" placeholder="Marca del equipo" required value={formData.marca} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio" className="font-semibold text-slate-900">Precio</Label>
              <Input id="precio" name="precio" type="number" placeholder="Precio del equipo" required min="0" step="0.01" value={formData.precio || ''} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="procesador" className="font-semibold text-slate-900">Procesador</Label>
              <Input id="procesador" name="procesador" placeholder="Ej. Intel Core i7" required value={formData.procesador} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ram" className="font-semibold text-slate-900">Memoria RAM</Label>
              <Input id="ram" name="ram" placeholder="Ej. 16GB DDR5" required value={formData.ram} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="almacenamiento" className="font-semibold text-slate-900">Almacenamiento</Label>
              <Input id="almacenamiento" name="almacenamiento" placeholder="Ej. 1TB NVMe" required value={formData.almacenamiento} onChange={handleChange} />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="grafica" className="font-semibold text-slate-900">Tarjeta Gráfica</Label>
              <Input id="grafica" name="grafica" placeholder="Ej. RTX 4060" required value={formData.grafica} onChange={handleChange} />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="imagen_url" className="font-semibold text-slate-900">Imagen</Label>
              <Input id="imagen_url" name="imagen_url" type="url" placeholder="URL de la imagen" value={formData.imagen_url} onChange={handleChange} />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="descripcion" className="font-semibold text-slate-900">Descripción</Label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={3}
                placeholder="Descripción detallada del equipo..."
                required
                value={formData.descripcion}
                onChange={handleChange}
                className="flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

          </div>

          <div className="text-center">
            {status === 'success' && <p className="text-sm font-medium text-green-600">¡Equipo insertado correctamente!</p>}
            {status === 'error' && <p className="text-sm font-medium text-red-600">Error al guardar. Verifica la conexión.</p>}
          </div>

          <Button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full h-11 bg-slate-950 hover:bg-slate-900 text-white font-medium text-base rounded-md"
          >
            {status === 'loading' ? 'Insertando...' : 'Insertar Equipo'}
          </Button>

        </form>
      </div>

      <p className="text-center text-xs text-slate-500 mt-6">
        By clicking continue, you agree to our <a href="#" className="underline underline-offset-4 hover:text-slate-900">Terms of Service</a> and <a href="#" className="underline underline-offset-4 hover:text-slate-900">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default NuevoOrdenador;