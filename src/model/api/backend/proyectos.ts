import { supabase } from '@/model/utils/supabase';
import type { IProyecto } from '@/model/interfaces/IProyecto';

export const insertProyecto = async (proyecto: Omit<IProyecto, 'id'>): Promise<boolean> => {
  const { error } = await supabase
    .from('proyectos')
    .insert([proyecto]);

  if (error) {
    console.error('Error al insertar proyecto:', error);
    return false;
  }
  return true;
};

export const deleteProyecto = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('proyectos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al borrar proyecto:', error);
    return false;
  }
  return true;
};