// Analytics para el index.html de la raíz, que es HTML estático y no pasa por
// mountClass(). Las páginas de clase lo inyectan ahí.
import { inject } from '@vercel/analytics';

inject();
