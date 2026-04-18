const API_BASE = '/antiheroes';
const params = new URLSearchParams(window.location.search);
const characterId = params.get('id');
const container = document.getElementById('character-container');

const IMAGE_MAP = [
  { keywords: ['johnny silverhand', 'johnny'],  src: 'images/johnny.jpg' },
  { keywords: ['joel miller', 'joel'],           src: 'images/joel.jpg' },
  { keywords: ['arthur morgan', 'arthur'],       src: 'images/aurthermorgan.jpeg' },
  { keywords: ['geralt', 'witcher'],             src: 'images/witcher.jpg' },
  { keywords: ['kratos'],                        src: 'images/kratos.jpg' },
];
const PLACEHOLDER_IMG = 'images/V.jpg';

function getImage(antihero) {
  if (antihero.imageUrl) return antihero.imageUrl;
  const lower = (antihero.name || '').toLowerCase();
  for (const entry of IMAGE_MAP) {
    if (entry.keywords.some(k => lower.includes(k))) return entry.src;
  }
  return PLACEHOLDER_IMG;
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderCharacter(a) {
  const btn = (label, onclick, color) => `
    <button onclick="${onclick}" style="
      padding: 8px 18px; font-family: monospace; font-size: 0.8rem; font-weight: bold;
      background: ${color}22; border: 2px solid ${color}; color: ${color};
      border-radius: 8px; cursor: pointer; transition: background 0.2s, color 0.2s;
      letter-spacing: 0.05em;"
      onmouseover="this.style.background='${color}';this.style.color='#000'"
      onmouseout="this.style.background='${color}22';this.style.color='${color}'"
    >${label}</button>`;

  const inputStyle = `width:100%; padding:10px 12px; border-radius:8px;
    background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.25);
    color:white; font-size:0.9rem; outline:none; box-sizing:border-box;`;

  const statBlock = (label, value, color) => `
    <div style="border-left:4px solid ${color}; padding-left:14px;">
      <p style="color:#94a3b8; font-size:0.7rem; font-family:monospace; margin:0 0 2px 0;">${label}</p>
      <p style="color:white; margin:0; font-size:1rem;">${escapeHtml(value)}</p>
    </div>`;

  container.innerHTML = `
    <div style="
      background:rgba(255,255,255,0.08); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,0.15); border-radius:20px;
      display:flex; flex-direction:row; width:100%; overflow:hidden;">

      <!-- Left: Image -->
      <div style="width:35%; flex-shrink:0; min-height:500px;">
        <img src="${getImage(a)}" alt="${escapeHtml(a.name)}" style="
          width:100%; height:100%; object-fit:cover;
          border-radius:20px 0 0 20px;
          border-right:2px solid rgba(250,204,21,0.4);">
      </div>

      <!-- Right: Details -->
      <div style="flex:1; padding:28px 32px; display:flex; flex-direction:column; gap:20px;
        background:linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2));
        border-left:2px solid rgba(34,211,238,0.3); overflow-y:auto;">

        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <p style="color:#64748b; font-size:0.7rem; font-family:monospace; margin:0 0 4px 0;">CHARACTER #${escapeHtml(String(a.characterId))}</p>
            <h1 style="font-family:'Orbitron',sans-serif; color:#facc15; margin:0; font-size:2.5rem; font-weight:bold; letter-spacing:0.05em;">
              ${escapeHtml(a.name)}
            </h1>
          </div>
          <div style="display:flex; gap:10px;">
            ${btn('EDIT', 'toggleEdit()', '#22d3ee')}
            ${btn('DELETE', 'deleteCharacter()', '#f87171')}
          </div>
        </div>

        <!-- Stats Grid -->
        <div id="view-section" style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          ${statBlock('UNIVERSE', a.universe, '#facc15')}
          ${statBlock('WEAPON', a.weapon, '#22d3ee')}
          ${statBlock('MORALITY', a.morality, '#c084fc')}
        </div>

        <!-- Description -->
        <div id="view-description">
          <h2 style="color:#facc15; font-family:monospace; font-size:0.9rem; margin:0 0 8px 0;">// DESCRIPTION</h2>
          <p style="color:#cbd5e1; font-size:0.9rem; line-height:1.6; margin:0;">${escapeHtml(a.description)}</p>
        </div>

        <!-- Edit Form -->
        <div id="edit-section" style="display:none;">
          <h2 style="color:#22d3ee; font-family:monospace; font-size:0.9rem; margin:0 0 16px 0;">// EDIT CHARACTER</h2>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div>
              <label style="color:#22d3ee; font-family:monospace; font-size:0.7rem; display:block; margin-bottom:4px;">CHARACTER NAME</label>
              <input id="edit-name" type="text" value="${escapeHtml(a.name)}" style="${inputStyle}">
            </div>
            <div>
              <label style="color:#22d3ee; font-family:monospace; font-size:0.7rem; display:block; margin-bottom:4px;">UNIVERSE / GAME</label>
              <input id="edit-universe" type="text" value="${escapeHtml(a.universe)}" style="${inputStyle}">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div>
                <label style="color:#22d3ee; font-family:monospace; font-size:0.7rem; display:block; margin-bottom:4px;">WEAPON</label>
                <input id="edit-weapon" type="text" value="${escapeHtml(a.weapon)}" style="${inputStyle}">
              </div>
              <div>
                <label style="color:#22d3ee; font-family:monospace; font-size:0.7rem; display:block; margin-bottom:4px;">MORALITY</label>
                <input id="edit-morality" type="text" value="${escapeHtml(a.morality)}" style="${inputStyle}">
              </div>
            </div>
            <div>
              <label style="color:#22d3ee; font-family:monospace; font-size:0.7rem; display:block; margin-bottom:4px;">DESCRIPTION</label>
              <textarea id="edit-description" rows="4" style="${inputStyle} resize:none;">${escapeHtml(a.description)}</textarea>
            </div>
            <div style="display:flex; gap:10px;">
              ${btn('SAVE CHANGES', 'saveEdit()', '#facc15')}
              ${btn('CANCEL', 'toggleEdit()', '#94a3b8')}
            </div>
            <p id="edit-error" style="color:#f87171; font-size:0.8rem; display:none;"></p>
          </div>
        </div>

        <!-- Image Upload -->
        <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:16px;">
          <p style="color:#94a3b8; font-family:monospace; font-size:0.7rem; margin:0 0 10px 0;">CHANGE IMAGE</p>
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <label style="
              padding:8px 14px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.25);
              border-radius:8px; color:#e2e8f0; font-size:0.8rem; cursor:pointer; font-family:monospace;">
              CHOOSE FILE
              <input type="file" id="image-input" accept="image/*" style="display:none;"
                onchange="document.getElementById('file-label').textContent = this.files[0]?.name || 'No file chosen'">
            </label>
            <span id="file-label" style="color:#94a3b8; font-size:0.8rem; font-family:monospace;">No file chosen</span>
            ${btn('UPLOAD', 'uploadImage()', '#a78bfa')}
            <span id="image-status" style="font-size:0.8rem; font-family:monospace; display:none;"></span>
          </div>
        </div>

        <a href="index.html" style="color:#22d3ee; font-size:0.85rem; text-decoration:none; margin-top:4px;"
          onmouseover="this.style.textDecoration='underline'"
          onmouseout="this.style.textDecoration='none'">
          ← Back to Character Gallery
        </a>
      </div>
    </div>
  `;
}

function toggleEdit() {
  const editSection = document.getElementById('edit-section');
  const viewSection = document.getElementById('view-section');
  const viewDesc = document.getElementById('view-description');
  const editBtn = document.getElementById('edit-btn');
  const isHidden = editSection.style.display === 'none';

  editSection.style.display = isHidden ? 'block' : 'none';
  viewSection.style.display = isHidden ? 'none' : 'grid';
  viewDesc.style.display   = isHidden ? 'none' : 'block';
  editBtn.textContent = isHidden ? 'CANCEL' : 'EDIT';
}

async function saveEdit() {
  const errorEl = document.getElementById('edit-error');
  errorEl.style.display = 'none';

  const updated = {
    name: document.getElementById('edit-name').value.trim(),
    universe: document.getElementById('edit-universe').value.trim(),
    weapon: document.getElementById('edit-weapon').value.trim(),
    morality: document.getElementById('edit-morality').value.trim(),
    description: document.getElementById('edit-description').value.trim()
  };

  if (!updated.name || !updated.universe) {
    errorEl.textContent = 'Name and Universe are required.';
    errorEl.style.display = 'block';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/${characterId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();
    renderCharacter(data);
  } catch (err) {
    errorEl.textContent = `Error saving: ${err.message}`;
    errorEl.style.display = 'block';
  }
}

async function deleteCharacter() {
  if (!confirm(`Delete this character? This cannot be undone.`)) return;

  try {
    const res = await fetch(`${API_BASE}/${characterId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    window.location.href = 'index.html';
  } catch (err) {
    alert(`Error deleting character: ${err.message}`);
  }
}

async function uploadImage() {
  const input = document.getElementById('image-input');
  const status = document.getElementById('image-status');
  if (!input.files.length) {
    status.textContent = 'No file selected.';
    status.style.color = '#f87171';
    status.style.display = 'inline';
    return;
  }
  const formData = new FormData();
  formData.append('file', input.files[0]);
  status.textContent = 'Uploading...';
  status.style.color = '#94a3b8';
  status.style.display = 'inline';
  try {
    const res = await fetch(`${API_BASE}/${characterId}/image`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const updated = await res.json();
    renderCharacter(updated);
  } catch (err) {
    status.textContent = `Error: ${err.message}`;
    status.style.color = '#f87171';
  }
}

async function loadCharacter() {
  if (!characterId) {
    container.innerHTML = `
      <div class="text-center py-16">
        <p class="text-red-400 text-xl mb-4">No character ID provided.</p>
        <a href="index.html" class="text-cyan-400 hover:underline">← Back to Gallery</a>
      </div>
    `;
    return;
  }

  container.innerHTML = '<p class="text-gray-400 text-center py-16">Loading character...</p>';

  try {
    const res = await fetch(`${API_BASE}/${characterId}`);
    if (!res.ok) throw new Error(`Character not found (${res.status})`);
    const data = await res.json();
    renderCharacter(data);
  } catch (err) {
    container.innerHTML = `
      <div class="text-center py-16">
        <p class="text-red-400 text-xl mb-4">Error: ${escapeHtml(err.message)}</p>
        <a href="index.html" class="text-cyan-400 hover:underline">← Back to Gallery</a>
      </div>
    `;
  }
}

loadCharacter();
