self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
      });
      await self.registration.unregister();
      for (const client of clients) {
        client.navigate(client.url);
      }
    })(),
  );
});
