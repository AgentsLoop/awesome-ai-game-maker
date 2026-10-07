const object = document.getElementById('poster');
const stateEl = document.getElementById('state');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const parallaxBtn = document.getElementById('parallax');
const strengthInput = document.getElementById('strength');
const resetBtn = document.getElementById('reset');
const layersEl = document.getElementById('layers');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let controls = null;
let forcedPause = false;

const setState = (text) => { stateEl.textContent = text; };

object.addEventListener('load', () => {
  controls = object.contentWindow && object.contentWindow.sceneControls;
  if (!controls) { setState('controls unavailable'); return; }
  if (reduced.matches) {
    forcedPause = true;
    object.contentDocument.documentElement.setAttribute('data-motion', 'preview-paused');
    controls.pause(true);
    playBtn.setAttribute('aria-pressed', 'false');
    pauseBtn.setAttribute('aria-pressed', 'true');
    setState('paused for reduced motion - press Play');
  } else {
    setState('playing');
  }
  controls.layers.forEach((layer) => {
    const label = document.createElement('label');
    label.className = 'chip';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = true;
    input.addEventListener('change', () => controls.layer(layer.id, input.checked));
    label.append(input, document.createTextNode(layer.label + ' (' + layer.depth + ')'));
    layersEl.append(label);
  });
});

playBtn.addEventListener('click', () => {
  if (!controls) return;
  if (forcedPause) {
    forcedPause = false;
    object.contentDocument.documentElement.setAttribute('data-motion', 'enabled');
  }
  controls.pause(false);
  setState('playing');
  playBtn.setAttribute('aria-pressed', 'true');
  pauseBtn.setAttribute('aria-pressed', 'false');
});

pauseBtn.addEventListener('click', () => {
  if (!controls) return;
  controls.pause(true);
  setState('paused');
  playBtn.setAttribute('aria-pressed', 'false');
  pauseBtn.setAttribute('aria-pressed', 'true');
});

parallaxBtn.addEventListener('click', () => {
  if (!controls) return;
  const next = parallaxBtn.getAttribute('aria-pressed') !== 'true';
  controls.parallax(next);
  parallaxBtn.setAttribute('aria-pressed', String(next));
});

strengthInput.addEventListener('input', () => { if (controls) controls.strength(strengthInput.value); });

resetBtn.addEventListener('click', () => {
  if (!controls) return;
  controls.layers.forEach((layer) => controls.layer(layer.id, true));
  layersEl.querySelectorAll('input').forEach((input) => { input.checked = true; });
  controls.parallax(true);
  parallaxBtn.setAttribute('aria-pressed', 'true');
});

const variant = document.getElementById('poster-unslop');
const inkToggle = document.getElementById('ink-toggle');
if (variant && inkToggle) {
  inkToggle.addEventListener('click', () => {
    const next = inkToggle.getAttribute('aria-pressed') !== 'true';
    const variantControls = variant.contentWindow && variant.contentWindow.sceneControls;
    if (variantControls) variantControls.ink(next ? 'dark' : 'light');
    inkToggle.setAttribute('aria-pressed', String(next));
    inkToggle.textContent = next ? 'Light ink' : 'Dark ink';
  });
}
