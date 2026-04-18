const API_BASE = '/antiheroes';
const form = document.getElementById('character-form');
const successMsg = document.getElementById('success-msg');
const errorMsg = document.getElementById('error-msg');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');

  const character = {
    name: document.getElementById('name').value.trim(),
    universe: document.getElementById('universe').value.trim(),
    weapon: document.getElementById('weapon').value.trim(),
    morality: document.getElementById('morality').value.trim(),
    description: document.getElementById('description').value.trim()
  };

  if (!character.name || !character.universe) {
    errorMsg.textContent = 'Character Name and Universe are required.';
    errorMsg.classList.remove('hidden');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'SUBMITTING...';

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(character)
    });

    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const created = await res.json();

    // Upload image if one was selected
    const imageFile = document.getElementById('image-upload').files[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const imgRes = await fetch(`${API_BASE}/${created.characterId}/image`, {
        method: 'POST',
        body: formData
      });
      if (!imgRes.ok) throw new Error(`Image upload failed (${imgRes.status})`);
    }

    successMsg.textContent = `"${created.name}" added successfully!`;
    successMsg.classList.remove('hidden');
    form.reset();
  } catch (err) {
    errorMsg.textContent = `Error adding character: ${err.message}`;
    errorMsg.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'SUBMIT CHARACTER';
  }
});
