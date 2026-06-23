import { supabase } from '@/model/utils/supabase';
import type { IOrdenador } from '@/model/interfaces/IOrdenador';

export const insertOrdenador = async (pc: Omit<IOrdenador, 'id'>): Promise<boolean> => {
  const { error } = await supabase
    .from('ordenadores')
    .insert([pc]);

  if (error) {
    console.error(error);
    return false;
  }
  return true;
};

export const deleteOrdenador = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('ordenadores')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    return false;
  }
  return true;
};