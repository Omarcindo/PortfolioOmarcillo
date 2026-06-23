import { supabase } from '@/model/utils/supabase';
import type { IOrdenador } from '@/model/interfaces/IOrdenador';

export const getOrdenadores = async (): Promise<IOrdenador[]> => {
  const { data, error } = await supabase
    .from('ordenadores')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return data as IOrdenador[];
};

export const getOrdenadorById = async (id: number): Promise<IOrdenador | null> => {
  const { data, error } = await supabase
    .from('ordenadores')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data as IOrdenador;
};