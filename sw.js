const CACHE='cross-service-v53-instant-timer';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.json','./bike_highres_crop.png','./gear.jpg','./airfilter.jpg','./chain.jpg','./frontbrake.jpg','./tire.jpg','./spark.jpg','./carb.jpg','./piston.jpg','./exhaust.jpg','./cooling.jpg','./suspension.jpg','./steering.jpg']))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
