import { supabase } from '@/model/utils/supabase';
import type { IProyecto } from '@/model/interfaces/IProyecto';

export const getProyectos = async (): Promise<IProyecto[]> => {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error al obtener proyectos:', error);
    return [];
  }
  
  return data.map((p) => {
    let categoryObj = { title: '', href: '' };
    
    if (typeof p.category === 'string') {
      try {
        categoryObj = JSON.parse(p.category);
      } catch (e) {
        categoryObj = { title: p.category, href: '#' };
      }
    } else if (p.category && typeof p.category === 'object') {
      categoryObj = {
        title: p.category.title || '',
        href: p.category.href || '#'
      };
    }

    return {
      ...p,
      category: categoryObj
    };
  }) as IProyecto[];
};