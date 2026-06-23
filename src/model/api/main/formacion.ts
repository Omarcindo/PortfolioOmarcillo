import { supabase } from '@/model/utils/supabase';
import type { IFormacion } from '@/model/interfaces/IFormacion';

export const getFormaciones = async (): Promise<IFormacion[]> => {
  const { data, error } = await supabase
    .from('formacion')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error al obtener formaciones:', error);
    return [];
  }
  
  return data.map((f) => {
    let categoryObj = { title: '', href: '' };
    
    if (typeof f.category === 'string') {
      try {
        categoryObj = JSON.parse(f.category);
      } catch (e) {
        categoryObj = { title: f.category, href: '#' };
      }
    } else if (f.category && typeof f.category === 'object') {
      categoryObj = {
        title: f.category.title || '',
        href: f.category.href || '#'
      };
    }

    return {
      ...f,
      category: categoryObj
    };
  }) as IFormacion[];
};