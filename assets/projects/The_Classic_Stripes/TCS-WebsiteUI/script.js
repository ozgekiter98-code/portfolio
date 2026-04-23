const siteHeader = document.getElementById('site-header');
const actionButtons = document.querySelectorAll('[data-action]');
const chatFab = document.getElementById('chat-fab');
const chatPanel = document.getElementById('chat-panel');
const chatBadge = document.getElementById('chat-badge');
const chatClose = document.getElementById('chat-close');

const hero = document.getElementById('hero');
const heroMedia = document.getElementById('hero-media');
const storyTrack = document.getElementById('story-track');
const storyStage = document.getElementById('story-stage');
const scenes = Array.from(document.querySelectorAll('[data-scene]'));
const sceneDots = Array.from(document.querySelectorAll('[data-dot]'));
const hotspotWraps = Array.from(document.querySelectorAll('[data-hotspot-wrap]'));

const sceneMotion = [
  // Reporter: enter from below (reverse of exit), fade out while moving downward.
  { enterFromX: 0, enterFromY: 56, exitToX: 0, exitToY: 56 },
  // Supporter1: slide in from right, fade out while sliding to right.
  { enterFromX: 86, enterFromY: 0, exitToX: 86, exitToY: 0 },
  // Supporter2: slide in from left, stay at end while scrolling down.
  // When scrolling up, reverse of enter makes it slide back left and fade out.
  { enterFromX: -86, enterFromY: 0, exitToX: -86, exitToY: 0 }
];
const defaultSceneMotion = { enterFromX: 0, enterFromY: 52, exitToX: 0, exitToY: -52 };
const sceneDurationMs = 500;
const sceneBetweenMs = 100;
const scenePostAppearPauseMs = 100;
const sceneEasing = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

const hoverMediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
const closeTimers = new WeakMap();
let canHover = hoverMediaQuery.matches;
let headerOffset = 140;
let rafId = 0;
let currentSceneIndex = 0;
let isSceneTransitioning = false;
let storyStart = 0;
let storyEnd = 0;
let nextSceneStepAllowedAt = Number.NEGATIVE_INFINITY;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function updateHeaderState() {
  if (!siteHeader) {
    return;
  }
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 16);
}

function syncHeaderOffset() {
  if (!siteHeader) {
    return;
  }
  headerOffset = siteHeader.offsetHeight;
  document.documentElement.style.setProperty('--header-offset', `${headerOffset}px`);
}

function syncStoryBounds() {
  if (!storyTrack || !storyStage) {
    storyStart = 0;
    storyEnd = 0;
    return;
  }

  const trackTop = window.scrollY + storyTrack.getBoundingClientRect().top;
  const scrollRange = Math.max(0, storyTrack.offsetHeight - storyStage.offsetHeight);
  storyStart = Math.max(0, trackTop - headerOffset);
  storyEnd = storyStart + scrollRange;
}

function syncStoryDotsClearance() {
  if (!chatFab) {
    return;
  }

  const gap = 14;
  const fabRect = chatFab.getBoundingClientRect();
  const obstructionTop = chatPanel && chatPanel.classList.contains('is-open')
    ? Math.min(fabRect.top, chatPanel.getBoundingClientRect().top)
    : fabRect.top;
  const shortViewportLift = clamp((900 - window.innerHeight) * 0.4, 0, 110);
  const safeBottom = Math.max(0, Math.round(window.innerHeight - obstructionTop + gap + shortViewportLift));

  document.documentElement.style.setProperty('--story-dots-safe-bottom', `${safeBottom}px`);
}

function announceAction(actionName) {
  const labelMap = {
    search: 'Search clicked',
    account: 'Account clicked',
    bag: 'Bag clicked'
  };
  console.info(labelMap[actionName] || 'Action clicked');
}

function openChat() {
  if (!chatFab || !chatPanel) {
    return;
  }
  chatPanel.classList.add('is-open');
  chatPanel.setAttribute('aria-hidden', 'false');
  chatFab.setAttribute('aria-expanded', 'true');
  if (chatBadge) {
    chatBadge.hidden = true;
  }
  syncStoryDotsClearance();
}

function closeChat() {
  if (!chatFab || !chatPanel) {
    return;
  }
  chatPanel.classList.remove('is-open');
  chatPanel.setAttribute('aria-hidden', 'true');
  chatFab.setAttribute('aria-expanded', 'false');
  syncStoryDotsClearance();
}

function toggleChat() {
  if (!chatPanel) {
    return;
  }
  if (chatPanel.classList.contains('is-open')) {
    closeChat();
  } else {
    openChat();
  }
}

function updateHeroState() {
  if (!hero || !heroMedia) {
    return;
  }

  const rect = hero.getBoundingClientRect();
  const visibility = clamp((rect.bottom - headerOffset) / rect.height, 0, 1);
  const exitProgress = clamp((headerOffset - rect.top) / rect.height, 0, 1);

  const opacity = clamp(0.14 + visibility * 0.86, 0, 1);
  const translateY = -76 * exitProgress;
  const scale = 1.02 + (1 - visibility) * 0.014;

  heroMedia.style.opacity = opacity.toFixed(3);
  heroMedia.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
}

function updateStoryDots(activeScene) {
  if (!sceneDots.length) {
    return;
  }

  sceneDots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index === activeScene);
  });
}

function isInStoryRange() {
  if (!storyTrack || !storyStage) {
    return false;
  }
  const y = window.scrollY;
  return y >= storyStart - 2 && y <= storyEnd + 2;
}

function setSceneRestState(scene, motion, isVisible) {
  if (!scene) {
    return;
  }
  const characterShell = scene.querySelector('.scene-character');
  const character = scene.querySelector('.scene-character__img');
  const x = isVisible ? 0 : motion.enterFromX;
  const y = isVisible ? 0 : motion.enterFromY;

  scene.style.opacity = isVisible ? '1' : '0';
  scene.style.transform = 'translate3d(0px, 0px, 0px)';
  if (characterShell) {
    characterShell.style.transform = '';
  }
  if (character) {
    character.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  scene.classList.toggle('is-interactive', isVisible);
}

function initializeScenes() {
  if (!scenes.length) {
    return;
  }
  scenes.forEach((scene, index) => {
    const motion = sceneMotion[index] || defaultSceneMotion;
    setSceneRestState(scene, motion, index === currentSceneIndex);
  });
  updateStoryDots(currentSceneIndex);
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function transitionToScene(nextIndex) {
  if (
    isSceneTransitioning ||
    nextIndex < 0 ||
    nextIndex >= scenes.length ||
    nextIndex === currentSceneIndex
  ) {
    return;
  }

  const fromScene = scenes[currentSceneIndex];
  const toScene = scenes[nextIndex];
  const fromCharacterShell = fromScene.querySelector('.scene-character');
  const toCharacterShell = toScene.querySelector('.scene-character');
  const fromCharacter = fromScene.querySelector('.scene-character__img');
  const toCharacter = toScene.querySelector('.scene-character__img');
  const fromMotion = sceneMotion[currentSceneIndex] || defaultSceneMotion;
  const toMotion = sceneMotion[nextIndex] || defaultSceneMotion;

  isSceneTransitioning = true;
  closeAllHotspots();
  if (fromCharacterShell) {
    fromCharacterShell.style.transform = '';
  }
  if (toCharacterShell) {
    toCharacterShell.style.transform = '';
  }

  toScene.classList.add('is-interactive');
  toScene.style.opacity = '0';
  toScene.style.transform = 'translate3d(0px, 0px, 0px)';
  if (toCharacter) {
    toCharacter.style.transform = `translate3d(${toMotion.enterFromX}px, ${toMotion.enterFromY}px, 0px)`;
  }

  const animationOptions = {
    duration: sceneDurationMs,
    easing: sceneEasing,
    fill: 'forwards'
  };

  try {
    const exitAnimations = [
      fromScene.animate([{ opacity: 1 }, { opacity: 0 }], animationOptions).finished
    ];

    if (fromCharacter) {
      exitAnimations.push(
        fromCharacter.animate(
          [
            { transform: 'translate3d(0px, 0px, 0px)' },
            {
              transform: `translate3d(${fromMotion.exitToX}px, ${fromMotion.exitToY}px, 0px)`
            }
          ],
          animationOptions
        ).finished
      );
    }

    await Promise.all(exitAnimations);

    fromScene.style.opacity = '0';
    fromScene.style.transform = 'translate3d(0px, 0px, 0px)';
    if (fromCharacter) {
      fromCharacter.style.transform = `translate3d(${fromMotion.exitToX}px, ${fromMotion.exitToY}px, 0px)`;
    }
    fromScene.classList.remove('is-interactive');

    await wait(sceneBetweenMs);

    const enterAnimations = [
      toScene.animate([{ opacity: 0 }, { opacity: 1 }], animationOptions).finished
    ];

    if (toCharacter) {
      enterAnimations.push(
        toCharacter.animate(
          [
            {
              transform: `translate3d(${toMotion.enterFromX}px, ${toMotion.enterFromY}px, 0px)`
            },
            { transform: 'translate3d(0px, 0px, 0px)' }
          ],
          animationOptions
        ).finished
      );
    }

    await Promise.all(enterAnimations);

    toScene.style.opacity = '1';
    toScene.style.transform = 'translate3d(0px, 0px, 0px)';
    if (toCharacter) {
      toCharacter.style.transform = 'translate3d(0px, 0px, 0px)';
    }
    toScene.classList.add('is-interactive');

    currentSceneIndex = nextIndex;
    updateStoryDots(currentSceneIndex);
    isSceneTransitioning = false;
    nextSceneStepAllowedAt = window.performance.now() + scenePostAppearPauseMs;
    requestFrame();
  } catch (error) {
    isSceneTransitioning = false;
  }
}

function requestSceneStep(direction) {
  if (!isInStoryRange() || !scenes.length) {
    return false;
  }

  if (isSceneTransitioning) {
    return true;
  }

  const nextIndex = currentSceneIndex + direction;
  if (nextIndex < 0 || nextIndex >= scenes.length) {
    return false;
  }

  const now = window.performance.now();
  if (now < nextSceneStepAllowedAt) {
    return true;
  }

  transitionToScene(nextIndex);
  return true;
}

function clearCloseTimer(wrap) {
  const timer = closeTimers.get(wrap);
  if (timer) {
    window.clearTimeout(timer);
    closeTimers.delete(wrap);
  }
}

function scheduleClose(wrap) {
  clearCloseTimer(wrap);
  const timer = window.setTimeout(() => {
    setHotspotOpen(wrap, false);
  }, 130);
  closeTimers.set(wrap, timer);
}

function closeAllHotspots(exceptWrap = null) {
  hotspotWraps.forEach((wrap) => {
    if (wrap !== exceptWrap) {
      setHotspotOpen(wrap, false);
    }
  });
}

function positionPreview(wrap) {
  const preview = wrap.querySelector('.product-preview');
  if (!preview) {
    return;
  }

  if (window.innerWidth >= 981) {
    delete wrap.dataset.alignX;
    delete wrap.dataset.alignY;
    return;
  }

  wrap.dataset.alignX = 'center';
  wrap.dataset.alignY = 'above';

  const previewRect = preview.getBoundingClientRect();
  const margin = 12;

  if (previewRect.left < margin) {
    wrap.dataset.alignX = 'left';
  } else if (previewRect.right > window.innerWidth - margin) {
    wrap.dataset.alignX = 'right';
  }

  if (previewRect.top < headerOffset + margin) {
    wrap.dataset.alignY = 'below';
  }
}

function setHotspotOpen(wrap, shouldOpen) {
  const trigger = wrap.querySelector('[data-hotspot]');
  clearCloseTimer(wrap);

  if (!trigger) {
    return;
  }

  if (shouldOpen) {
    closeAllHotspots(wrap);
    wrap.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    positionPreview(wrap);
    return;
  }

  wrap.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
  delete wrap.dataset.alignX;
  delete wrap.dataset.alignY;
}

function updateOpenPreviewPositions() {
  hotspotWraps.forEach((wrap) => {
    if (wrap.classList.contains('is-open')) {
      positionPreview(wrap);
    }
  });
}

function setupHotspots() {
  hotspotWraps.forEach((wrap) => {
    const trigger = wrap.querySelector('[data-hotspot]');

    if (!trigger) {
      return;
    }

    wrap.addEventListener('pointerenter', () => {
      if (!canHover) {
        return;
      }
      clearCloseTimer(wrap);
      setHotspotOpen(wrap, true);
    });

    wrap.addEventListener('pointerleave', () => {
      if (!canHover) {
        return;
      }
      scheduleClose(wrap);
    });

    wrap.addEventListener('focusin', () => {
      if (!canHover) {
        return;
      }
      clearCloseTimer(wrap);
      setHotspotOpen(wrap, true);
    });

    wrap.addEventListener('focusout', (event) => {
      if (!canHover) {
        return;
      }
      if (!wrap.contains(event.relatedTarget)) {
        scheduleClose(wrap);
      }
    });

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = wrap.classList.contains('is-open');

      if (canHover) {
        setHotspotOpen(wrap, !isOpen);
        return;
      }

      if (isOpen) {
        setHotspotOpen(wrap, false);
      } else {
        setHotspotOpen(wrap, true);
      }
    });
  });

  document.addEventListener('pointerdown', (event) => {
    const clickedInside = hotspotWraps.some((wrap) => wrap.contains(event.target));
    if (!clickedInside) {
      closeAllHotspots();
    }
  });

  if (hoverMediaQuery.addEventListener) {
    hoverMediaQuery.addEventListener('change', (event) => {
      canHover = event.matches;
      closeAllHotspots();
    });
  }
}

function runFrame() {
  rafId = 0;
  updateHeaderState();
  updateHeroState();
  updateOpenPreviewPositions();
}

function requestFrame() {
  if (rafId) {
    return;
  }
  rafId = window.requestAnimationFrame(runFrame);
}

window.addEventListener('scroll', requestFrame, { passive: true });
window.addEventListener(
  'wheel',
  (event) => {
    if (Math.abs(event.deltaY) < 4) {
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    if (requestSceneStep(direction)) {
      event.preventDefault();
    }
  },
  { passive: false }
);

window.addEventListener('resize', () => {
  syncHeaderOffset();
  syncStoryBounds();
  syncStoryDotsClearance();
  requestFrame();
});
window.addEventListener('orientationchange', () => {
  syncHeaderOffset();
  syncStoryBounds();
  syncStoryDotsClearance();
  requestFrame();
});
window.addEventListener('load', () => {
  syncHeaderOffset();
  syncStoryBounds();
  syncStoryDotsClearance();
  requestFrame();
});

actionButtons.forEach((button) => {
  button.addEventListener('click', () => announceAction(button.dataset.action));
});

if (chatFab) {
  chatFab.addEventListener('click', toggleChat);
}

if (chatClose) {
  chatClose.addEventListener('click', closeChat);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown' || event.key === 'PageDown' || (event.key === ' ' && !event.shiftKey)) {
    if (requestSceneStep(1)) {
      event.preventDefault();
      return;
    }
  }

  if (event.key === 'ArrowUp' || event.key === 'PageUp' || (event.key === ' ' && event.shiftKey)) {
    if (requestSceneStep(-1)) {
      event.preventDefault();
      return;
    }
  }

  if (event.key === 'Escape') {
    closeChat();
    closeAllHotspots();
  }
});

setupHotspots();
syncHeaderOffset();
syncStoryBounds();
syncStoryDotsClearance();
initializeScenes();
requestFrame();
