const CACHE='cross-service-v44-clean-overview';
const CORE=['./','./index.html','./manifest.json','./bike_highres_crop.png'];
const DETAIL=['gear','airfilter','chain','frontbrake','tire','spark','carb','piston','exhaust','cooling','suspension','steering'].map(x=>`./${x}.jpg`);
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE.concat(DETAIL))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);if(url.pathname.endsWith('/index.html')||url.pathname.endsWith('/')){e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html')));return}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(x=>x.put(e.request,copy));return r})))})
