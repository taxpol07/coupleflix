import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CoupleFlix', // Yüklenirken görünecek uzun isim
    short_name: 'CoupleFlix', // Ana ekranda ikonun altında yazacak kısa isim (İstersen "Bizimki" falan da yazabilirsin)
    description: 'Bizim Hikayemiz',
    start_url: '/',
    display: 'standalone', // EN ÖNEMLİSİ! Tarayıcı çubuğunu gizler, tam ekran uygulama yapar.
    background_color: '#09090b', // Siyah arka plan
    theme_color: '#000000', // Telefonun üst bildirim çubuğu rengi
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}