 (function(){
  function byId(id){ return document.getElementById(id); }

  function formatDate(iso){
    const d = new Date(iso);
    return d.toLocaleString();
  }

  // session handling (use sessionStorage so login is per-tab)
  const SESSION_KEY = 'astral_session';
  function getSession(){
    try{ const raw = sessionStorage.getItem(SESSION_KEY); return raw ? JSON.parse(raw) : null; }catch(e){return null}
  }
  function setSession(sess){ sessionStorage.setItem(SESSION_KEY, JSON.stringify(sess)); }
  function clearSession(){ sessionStorage.removeItem(SESSION_KEY); }

  // local fallback for threads when server unavailable
  const LOCAL_THREADS = 'astral_forum_threads_local';
  function loadThreadsLocal(){ try{ const raw = localStorage.getItem(LOCAL_THREADS); return raw ? JSON.parse(raw) : []; }catch(e){return[]} }
  function saveThreadsLocal(v){ localStorage.setItem(LOCAL_THREADS, JSON.stringify(v)); }

  // re-use fetchWithFallback function (try same-origin then common dev ports)
  async function fetchWithFallback(path, opts){
    const origins = [window.location.origin, 'http://localhost:8090', 'http://localhost:8080', 'http://127.0.0.1:3000'];
    let lastErr = null;
    for(const origin of origins){
      let url = path;
      try{ url = new URL(path, origin).href; }catch(e){ url = path; }
      console.debug('[fetchWithFallback] trying', url, opts && opts.method ? opts.method : 'GET');
      try{
        const res = await fetch(url, opts);
        if(res.ok){ console.debug('[fetchWithFallback] success', url, res.status); return res; }
        lastErr = new Error('HTTP ' + res.status);
        console.warn('[fetchWithFallback] non-ok', url, res.status);
      }catch(err){ lastErr = err; console.warn('[fetchWithFallback] error', url, err && err.message ? err.message : err); }
    }
    throw lastErr;
  }

  // check server health and update status element if present
  async function updateServerStatus(){
    const el = document.getElementById('server-status');
    if(!el) return;
    try{
      await fetchWithFallback('/api/health');
      el.textContent = 'Serveur: accessible';
      el.style.background = 'rgba(6,140,6,0.7)';
    }catch(e){
      el.textContent = 'Serveur: inaccessible (mode local)';
      el.style.background = 'rgba(120,10,10,0.7)';
    }
  }

  // Threads API client
  async function loadThreads(){
    try{ const res = await fetchWithFallback('/api/threads'); const data = await res.json(); return data; }catch(e){ console.warn('threads API unavailable', e); return loadThreadsLocal(); }
  }

  async function createThread(title, owner){
    try{ const res = await fetchWithFallback('/api/threads',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({title,owner}) }); if(!res.ok) throw new Error('failed'); const t = await res.json(); return t; }catch(e){ // save locally
      const local = loadThreadsLocal(); const t = { id: Date.now()+Math.floor(Math.random()*999), title, owner, created_at: new Date().toISOString(), messages: [] }; local.push(t); saveThreadsLocal(local); return t; }
  }

  async function loadThreadMessages(id){
    try{ const res = await fetchWithFallback('/api/threads/' + id + '/messages'); const data = await res.json(); return data; }catch(e){ const local = loadThreadsLocal(); const t = local.find(x=>String(x.id)===String(id)); return t ? (t.messages||[]) : []; }
  }

  async function postToThread(id, email, content){
    try{ const res = await fetchWithFallback('/api/threads/' + id + '/messages', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, content }) }); if(!res.ok) throw new Error('failed'); return await res.json(); }catch(e){ const local = loadThreadsLocal(); const t = local.find(x=>String(x.id)===String(id)); if(t){ const m={id:Date.now()+Math.floor(Math.random()*999), email, content, date:new Date().toISOString(), _local:true}; t.messages = t.messages||[]; t.messages.push(m); saveThreadsLocal(local); return m; } throw e; }
  }

  // UI rendering
  let currentThreadId = null;
  async function renderThreads(){
    const list = byId('threads-list'); list.innerHTML = '';
    const threads = (await loadThreads()).sort((a,b)=> new Date(b.created_at)-new Date(a.created_at));
    threads.forEach(t=>{
      const li = document.createElement('li'); li.textContent = t.title + ' — ' + t.owner; li.dataset.id = t.id;
      li.addEventListener('click', ()=>{ selectThread(t.id); });
      list.appendChild(li);
    });
    // update server status after listing
    updateServerStatus().catch(()=>{});
  }

  async function selectThread(id){
    currentThreadId = id;
    const titleEl = byId('thread-title');
    const messagesEl = byId('messages');
    titleEl.textContent = 'Discussion';
    messagesEl.innerHTML = '<p>Chargement...</p>';
    const msgs = await loadThreadMessages(id);
    messagesEl.innerHTML = '';
    if(msgs.length===0){ messagesEl.innerHTML = '<div class="post">Aucun message.</div>'; }
    msgs.sort((a,b)=> new Date(a.date)-new Date(b.date)).forEach(m=>{
      const div = document.createElement('div'); div.className='post';
      const meta = document.createElement('div'); meta.className='meta';
      const author = document.createElement('div'); author.className='author'; author.textContent = m.email;
      const date = document.createElement('div'); date.className='date'; date.textContent = formatDate(m.date);
      meta.appendChild(author); meta.appendChild(date);
      const content = document.createElement('div'); content.className='content'; content.textContent = m.content || m.message || '';
      div.appendChild(meta); div.appendChild(content);
      messagesEl.appendChild(div);
    });
    // show composer only if connected
    const sess = getSession();
    byId('thread-form').style.display = sess ? 'block' : 'none';
    if(!sess){
      const note = document.createElement('div');
      note.style.color='#cbd5ff';
      note.style.marginTop='8px';
      note.textContent = 'Connectez-vous pour poster des messages.';
      messagesEl.appendChild(note);
    }
    // update server status when opening a thread
    updateServerStatus().catch(()=>{});
  }

  // auth forms
  async function doRegister(email,password){
    const res = await fetchWithFallback('/api/register',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    if(!res.ok) throw new Error('register failed');
    const data = await res.json(); setSession({ email, userId: data.userId }); return data;
  }

  async function doLogin(email,password){
    const res = await fetchWithFallback('/api/login',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    if(!res.ok) throw new Error('login failed');
    const data = await res.json(); setSession({ email: data.email, userId: data.userId }); return data;
  }

  // wire UI
  async function init(){
    // elements
    const createBtn = byId('create-thread-btn');
    const threadsList = byId('threads-list');
    const threadForm = byId('thread-form');
    const threadMsg = byId('thread-message');
    const loginPanel = byId('login-panel');
    const authEmail = byId('auth-email');
    const authPass = byId('auth-pass');
    const btnLogin = byId('btn-login');
    const btnRegister = byId('btn-register');
    const authStatus = byId('auth-status');

    // auth handlers
    btnRegister.addEventListener('click', async ()=>{
      const e = authEmail.value.trim(); const p = authPass.value.trim();
      if(!e||!p){ authStatus.style.display='block'; authStatus.textContent='Email et mot de passe requis'; return; }
      try{ await doRegister(e,p); authStatus.style.display='none'; alert('Inscription réussie — vous êtes connecté.'); renderThreads(); }catch(err){ authStatus.style.display='block'; authStatus.textContent='Inscription impossible'; }
    });
    btnLogin.addEventListener('click', async ()=>{
      const e = authEmail.value.trim(); const p = authPass.value.trim();
      if(!e||!p){ authStatus.style.display='block'; authStatus.textContent='Email et mot de passe requis'; return; }
      try{ await doLogin(e,p); authStatus.style.display='none'; alert('Connexion réussie'); renderThreads(); }catch(err){ authStatus.style.display='block'; authStatus.textContent='Connexion impossible'; }
    });

    createBtn.addEventListener('click', async ()=>{
      const sess = getSession();
      if(!sess){ alert('Veuillez vous connecter ou vous inscrire pour créer une discussion.'); return; }
      const title = prompt('Titre de la discussion');
      if(!title) return;
      try{ const t = await createThread(title, sess.email); alert('Discussion créée'); await renderThreads(); selectThread(t.id); }catch(e){ alert('Impossible de créer la discussion : ' + (e.message||e)); }
    });

    threadForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const sess = getSession(); if(!sess){ alert('Connectez-vous pour poster.'); return; }
      const content = threadMsg.value.trim(); if(!content) return;
      try{ await postToThread(currentThreadId, sess.email, content); threadMsg.value=''; selectThread(currentThreadId); }catch(err){ alert('Erreur lors de l\'envoi du message'); }
    });

    // initial render
    await renderThreads();
    // if a thread exists, check for query param to open
    const params = new URLSearchParams(window.location.search);
    const threadQ = params.get('thread');
    const threads = await loadThreads();
    if(threadQ){
      const found = threads.find(t=> String(t.id) === String(threadQ));
      if(found) return selectThread(found.id);
    }
    if(threads.length>0) selectThread(threads[0].id);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  // periodic health check
  setInterval(()=>{ updateServerStatus().catch(()=>{}); }, 7000);

})();
