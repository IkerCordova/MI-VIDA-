/* El juego de la vida: funciona sin internet */
const CACHE='juego-1e00c062d1';
const FILES=["./", "index.html", "three.min.js", "manifest.webmanifest", "fonts/fonts.css", "fonts/oswald-latin-300-normal.woff2", "fonts/oswald-latin-400-normal.woff2", "fonts/oswald-latin-500-normal.woff2", "fonts/oswald-latin-600-normal.woff2", "fonts/oswald-latin-700-normal.woff2", "fonts/work-sans-latin-400-normal.woff2", "fonts/work-sans-latin-500-normal.woff2", "fonts/work-sans-latin-600-normal.woff2", "fonts/jetbrains-mono-latin-500-normal.woff2", "fonts/jetbrains-mono-latin-600-normal.woff2", "fonts/jetbrains-mono-latin-700-normal.woff2", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url); if(u.origin!==location.origin) return;
  if(r.mode==='navigate'){ e.respondWith(fetch(r).then(res=>{ const cp=res.clone(); caches.open(CACHE).then(c=>c.put('index.html',cp)); return res; }).catch(()=>caches.match('index.html'))); return; }
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(r,cp)); return res; })));
});
