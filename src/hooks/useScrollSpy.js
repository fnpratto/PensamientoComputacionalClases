import { useEffect, useState } from 'react';

/** Devuelve el id de la última sección cuyo tope ya pasó por arriba de la pantalla. */
export function useScrollSpy(ids, offset = 120) {
  const [current, setCurrent] = useState(ids[0]);
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|');
    function onScroll() {
      let active = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - offset) active = id;
      }
      setCurrent(active);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [key, offset]);

  return current;
}
