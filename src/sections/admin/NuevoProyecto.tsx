import { useState } from 'react';
import { insertProyecto } from '@/model/api/backend/proyectos';
import type { IProyecto } from '@/model/interfaces/IProyecto';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const NuevoProyecto = () => {
  const [formData, setFormData] = useState<Omit<IProyecto, 'id'>>({
    title: '',
    href: '',
    date: '',
    datetime: '',
    category: { title: '', href: '' },
    imageUrl: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'categoryTitle') {
      setFormData(prev => ({ ...prev, category: { ...prev.category, title: value } }));
    } else if (name === 'categoryHref') {
      setFormData(prev => ({ ...prev, category: { ...prev.category, href: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const success = await insertProyecto(formData);
    
    if (success) {
      setStatus('success');
      setFormData({
        title: '', href: '', date: '', datetime: '', category: { title: '', href: '' }, imageUrl: ''
      });
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="p-8 w-full max-w-4xl mx-auto">
      <p className="text-sm font-medium text-slate-500 mb-8">Administración de la Sección de Proyectos</p>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Insertar Nuevo Proyecto</h1>
        <p className="text-slate-500 mt-2 text-sm">
          Añade un nuevo trabajo a tu portfolio público para que lo vean futuros clientes o empresas.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title" className="font-semibold text-slate-900">Nombre del Proyecto</Label>
              <Input id="title" name="title" placeholder="Ej. E-commerce React" required value={formData.title} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="font-semibold text-slate-900">Fecha Visible</Label>
              <Input id="date" name="date" placeholder="Ej. Mar 15, 2026" required value={formData.date} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="datetime" className="font-semibold text-slate-900">Fecha Interna (ISO)</Label>
              <Input id="datetime" name="datetime" type="date" required value={formData.datetime} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryTitle" className="font-semibold text-slate-900">Categoría / Tecnología Principal</Label>
              <Input id="categoryTitle" name="categoryTitle" placeholder="Ej. React & Node.js" required value={formData.category.title} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryHref" className="font-semibold text-slate-900">Enlace de la Categoría</Label>
              <Input id="categoryHref" name="categoryHref" placeholder="https://..." value={formData.category.href} onChange={handleChange} />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="href" className="font-semibold text-slate-900">Enlace a la Demo o GitHub</Label>
              <Input id="href" name="href" placeholder="URL del proyecto" required value={formData.href} onChange={handleChange} />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="imageUrl" className="font-semibold text-slate-900">URL de la Imagen / Captura</Label>
              <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://..." required value={formData.imageUrl} onChange={handleChange} />
            </div>

          </div>

          <div className="text-center">
            {status === 'success' && <p className="text-sm font-medium text-green-600">¡Proyecto publicado con éxito!</p>}
            {status === 'error' && <p className="text-sm font-medium text-red-600">Fallo al guardar. Revisa la consola.</p>}
          </div>

          <Button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full h-11 bg-slate-950 hover:bg-slate-900 text-white font-medium text-base rounded-md"
          >
            {status === 'loading' ? 'Guardando...' : 'Insertar Proyecto'}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default NuevoProyecto;