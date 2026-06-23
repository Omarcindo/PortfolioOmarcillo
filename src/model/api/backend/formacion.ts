import { supabase } from '@/model/utils/supabase';
import type { IFormacion } from '@/model/interfaces/IFormacion';

export const insertFormacion = async (formacion: Omit<IFormacion, 'id'>): Promise<boolean> => {
  const { error } = await supabase
    .from('formacion')
    .insert([formacion]);

  if (error) {
    console.error('Error al insertar formación:', error);
    return false;
  }
  return true;
};

export const deleteFormacion = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('formacion')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al borrar formación:', error);
    return false;
  }
  return true;
};