(function attachProjectPage(global) {
  const MEDIA_BLOB_BASE_URL = "https://yyukhmkupbovs5lx.public.blob.vercel-storage.com/assets/Media";
  const CLASSIC_STRIPES_ASSET_BLOB_BASE_URL =
    "https://yyukhmkupbovs5lx.public.blob.vercel-storage.com/assets/projects/The_Classic_Stripes/TCS-WebsiteUI/public/TCSassets";
  const PROJECT_GALLERIES = {
    istinara: {
      folder: "ISTINARA",
      files: []
    },
    "classic-stripes": {
      folder: "TheClassicStripes",
      files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"]
    },
    wrapchat: {
      folder: "Wrapchat",
      files: [
        "post_01.png",
        "post_02.png",
        "post_03.png",
        "post_04.png",
        "post_05.png",
        "post_06.png"
      ]
    }
  };

  const WRAPCHAT_DEMO_TEXT_REPLACEMENTS = [
    {
      from: "The Ghost Award",
      to: "What's really going on"
    },
    {
      from: "You treat replies like a limited resource. Alex is always waiting.",
      to: "Alex is more impulsive and present in bursts, while she’s more steady but slightly distant. When Alex spirals or overthinks, she grounds him, but when she disappears for a while, he fills the space with updates. It balances out, but you can feel they rely on each other in different ways."
    },
    {
      from: '"You: read at 14:32. Replied at... eventually."',
      to: '"When Alex spirals or overthinks, she grounds him."'
    },
    {
      from: "Making plans that never fully materialise — Alex proposes, you both get excited, life intervenes. It's a pattern, not a problem.",
      to: "A lot of the chat revolves around Alex trying to figure out what to do next in his life — work, moving, decisions he keeps postponing. It comes up in different forms, but always circles back. Even casual conversations somehow turn into “so what are you gonna do?” moments."
    },
    {
      from: "The Funny One",
      to: "Most tense moment"
    },
    {
      from: "Drops lines like",
      to: "The shift"
    },
    {
      from:
        "Alex's humor lands through accidental escalation — a one-word reply that somehow kills the thread, or a wildly unnecessary follow-up that extends the bit past the point of reason. The laughs are always earned.",
      to: 'There’s a point where Alex says something like “I feel like I’m just drifting lately” and it lands heavier than usual. She responds, but more carefully than normal — less joking, more direct. The tone shifts for a bit into something more serious before slowly going back to normal.'
    },
    {
      from:
        "The week Alex had a rough stretch without saying so directly — shorter replies, late responses. You caught it before it was said aloud and sent something small, no expectation attached. That message sat at the top of the chat for days.",
      to: "When she was taking care of her sick cat, Alex kept checking in in a very low-key way — things like “how’s she today?” or “did she eat?”. It’s not dramatic, but it shows a kind of attention that’s easy to miss unless you’re looking for it."
    },
    {
      from:
        "Warm and chaotic. You argue about food and it's somehow wholesome. Humor is the primary bonding mechanism — you both initiate jokes, both occasionally ghost each other, and both clearly want to talk.",
      to: "This feels like a friendship built on constant small check-ins rather than big conversations. It’s a mix of random daily updates, slightly chaotic energy, and quiet support — like Alex sending voice notes while walking somewhere and her replying hours later with something completely different but still connected. It doesn’t need structure to feel consistent."
    },
    {
      from: '"Warm and chaotic. You argue about food and it\'s somehow wholesome."',
      to: "They’re not always emotionally in sync, but they keep returning to each other anyway. One of them might be fully present while the other is distracted or distant, but the connection doesn’t break — it just stretches a bit. It’s less about perfect timing and more about consistency over time."
    }
  ];

  function getProjectFromQuery(store) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    return store.projectBySlug[slug] || store.projectBySlug[store.projects[0].slug];
  }

  function normalizeWrapchatText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function hideWrapchatDemoParts(doc) {
    if (!doc) {
      return;
    }

    if (!doc.getElementById("wrapchat-demo-cleanup")) {
      const style = doc.createElement("style");
      style.id = "wrapchat-demo-cleanup";
      style.textContent =
        'div[style*="display: flex"][style*="gap: 8px"][style*="margin-top: 18px"] {' +
        "display: none !important;" +
        "}" +
        'div[style*="position: absolute"][style*="top: 14px"][style*="z-index: 10"][style*="border-radius: 999px"][style*="padding: 4px 12px"] {' +
        "top: 60px !important;" +
        "left: 50% !important;" +
        "right: auto !important;" +
        "transform: translateX(-50%) !important;" +
        "text-align: center !important;" +
        "}" +
        'button[style*="position: absolute"][style*="top: 10px"][style*="right: 14px"][style*="width: 34px"][style*="height: 34px"] {' +
        "top: 54px !important;" +
        "right: 18px !important;" +
        "}" +
        'button[style*="position: absolute"][style*="top: 10px"][style*="left: 14px"][style*="padding: 7px 14px"] {' +
        "top: 54px !important;" +
        "left: 18px !important;" +
        "}";
      (doc.head || doc.body).appendChild(style);
    }
  }

  function scaleWrapchatDemoToFrame(doc, iframe) {
    if (!doc || !doc.body || !iframe) {
      return;
    }

    if (!doc.getElementById("wrapchat-demo-scale")) {
      const style = doc.createElement("style");
      style.id = "wrapchat-demo-scale";
      style.textContent =
        "html, body {" +
        "  width: 100% !important;" +
        "  height: 100% !important;" +
        "  min-height: 100% !important;" +
        "  overflow: hidden !important;" +
        "}" +
        "body {" +
        "  align-items: flex-start !important;" +
        "  justify-content: center !important;" +
        "}" +
        "#root {" +
        "  width: 393px !important;" +
        "  min-height: 852px !important;" +
        "  transform: scale(var(--wrapchat-demo-scale, 1));" +
        "  transform-origin: top center;" +
        "}" +
        "#root > div {" +
        "  width: 393px !important;" +
        "  min-height: 852px !important;" +
        "}" +
        "@media (max-width: 360px) {" +
        "  #root > div > div[style*='padding: 58px 24px 56px'] {" +
        "    padding: 52px 22px 50px !important;" +
        "  }" +
        "}";
      (doc.head || doc.body).appendChild(style);
    }

    const frameWidth = iframe.clientWidth || iframe.getBoundingClientRect().width || 393;
    const frameHeight = iframe.clientHeight || iframe.getBoundingClientRect().height || 852;
    const scale = Math.min(1, frameWidth / 393, frameHeight / 852);
    doc.documentElement.style.setProperty("--wrapchat-demo-scale", scale.toFixed(3));
  }

  function rewriteWrapchatDemoText(doc) {
    if (!doc || !doc.body) {
      return;
    }

    doc.body.querySelectorAll("div, p, span").forEach(function replaceText(element) {
      const currentText = normalizeWrapchatText(element.textContent);
      const replacement = WRAPCHAT_DEMO_TEXT_REPLACEMENTS.find(function matchText(item) {
        return item.from === currentText;
      });

      if (!replacement || element.textContent === replacement.to) {
        return;
      }

      element.textContent = replacement.to;
    });
  }

  function replaceWrapchatDemoLogo(doc) {
    if (!doc || !doc.body) {
      return;
    }

    doc.body.querySelectorAll('img[src*="WrapchatLogo_tr.png"]').forEach(function swapLogo(image) {
      if (image.getAttribute("src") === "assets/WrapchatLogo.svg") {
        return;
      }

      image.setAttribute("src", "assets/WrapchatLogo.svg");
    });
  }

  function setupWrapchatDemoFrame(iframe) {
    if (!iframe) {
      return;
    }

    let observedDoc = null;
    let observer = null;
    let frameRequest = 0;

    function syncDemoText(doc) {
      hideWrapchatDemoParts(doc);
      scaleWrapchatDemoToFrame(doc, iframe);
      rewriteWrapchatDemoText(doc);
      replaceWrapchatDemoLogo(doc);
    }

    function observeDemo(doc) {
      if (!doc || !doc.body || observedDoc === doc) {
        return;
      }

      if (observer) {
        observer.disconnect();
      }

      observedDoc = doc;
      observer = new MutationObserver(function onMutation() {
        if (frameRequest) {
          return;
        }

        frameRequest = doc.defaultView.requestAnimationFrame(function onFrame() {
          frameRequest = 0;
          syncDemoText(doc);
        });
      });

      observer.observe(doc.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    function applyCleanup() {
      try {
        const doc = iframe.contentDocument;
        syncDemoText(doc);
        observeDemo(doc);
      } catch (_error) {
        // Ignore iframe access issues.
      }
    }

    iframe.addEventListener("load", applyCleanup);
    window.addEventListener("resize", applyCleanup, { passive: true });
    applyCleanup();
  }

  function setupClassicStripesDemoFrame(frame) {
    if (!frame) {
      return;
    }

    const screen = frame.querySelector(".desktop-screen");
    const iframe = frame.querySelector(".desktop-screen-iframe");

    if (!screen) {
      return;
    }

    function syncScale() {
      const rect = screen.getBoundingClientRect();
      const scale = Math.min(1, rect.width / 1440, rect.height / 900);
      screen.style.setProperty("--desktop-demo-scale", scale.toFixed(3));
    }

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(syncScale);
      observer.observe(screen);
      frame._desktopDemoResizeObserver = observer;
    } else {
      window.addEventListener("resize", syncScale, { passive: true });
    }

    syncScale();
    window.requestAnimationFrame(syncScale);

    setupClassicStripesBlobAssets(iframe);
  }

  function getClassicStripesBlobAssetUrl(value) {
    if (!value || value.indexOf(CLASSIC_STRIPES_ASSET_BLOB_BASE_URL) === 0) {
      return value;
    }

    if (value.indexOf("assets/") === 0) {
      return CLASSIC_STRIPES_ASSET_BLOB_BASE_URL + "/" + value.replace(/^assets\//, "");
    }

    if (value.indexOf("TCSassets/") === 0) {
      return CLASSIC_STRIPES_ASSET_BLOB_BASE_URL + "/" + value.replace(/^TCSassets\//, "");
    }

    return value;
  }

  function applyClassicStripesBlobAssets(doc) {
    if (!doc || !doc.body) {
      return;
    }

    doc.querySelectorAll("img[src], source[src]").forEach(function rewriteMediaAsset(element) {
      const currentSrc = element.getAttribute("src");
      const nextSrc = getClassicStripesBlobAssetUrl(currentSrc);

      if (nextSrc === currentSrc) {
        return;
      }

      element.setAttribute("src", nextSrc);

      if (element.tagName.toLowerCase() === "source" && element.parentElement && element.parentElement.load) {
        element.parentElement.load();
      }
    });

    doc.querySelectorAll("video[poster]").forEach(function rewritePosterAsset(video) {
      const currentPoster = video.getAttribute("poster");
      const nextPoster = getClassicStripesBlobAssetUrl(currentPoster);

      if (nextPoster !== currentPoster) {
        video.setAttribute("poster", nextPoster);
      }
    });
  }

  function setupClassicStripesBlobAssets(iframe) {
    if (!iframe) {
      return;
    }

    function applyAssets() {
      try {
        applyClassicStripesBlobAssets(iframe.contentDocument);
      } catch (_error) {
        // Ignore iframe access issues.
      }
    }

    iframe.addEventListener("load", applyAssets);
    applyAssets();
  }

  function initProjectGallery(container) {
    if (!container) {
      return;
    }

    const rail = container.querySelector(".project-gallery-rail");
    const track = container.querySelector(".project-gallery-track");
    const items = Array.from(container.querySelectorAll(".project-gallery-item"));
    const prevButton = container.querySelector(".project-gallery-arrow.is-prev");
    const nextButton = container.querySelector(".project-gallery-arrow.is-next");

    if (!rail || !track || !items.length) {
      return;
    }

    let activeIndex = Math.floor(items.length / 2);
    let dragStartX = 0;
    let dragStartY = 0;
    let isPointerActive = false;

    function applyActiveIndex(index) {
      activeIndex = Math.max(0, Math.min(items.length - 1, index));
      items.forEach(function markItem(item, index) {
        item.classList.toggle("is-active", index === activeIndex);
      });

      if (prevButton) {
        prevButton.disabled = activeIndex === 0;
      }

      if (nextButton) {
        nextButton.disabled = activeIndex === items.length - 1;
      }
    }

    function updateTrackPosition() {
      const targetItem = items[activeIndex];

      if (!targetItem) {
        return;
      }

      const itemCenter = targetItem.offsetLeft + targetItem.offsetWidth / 2;
      const offset = rail.clientWidth / 2 - itemCenter;
      track.style.transform = "translate3d(" + offset + "px, 0, 0)";
    }

    function setActiveIndex(index) {
      const boundedIndex = Math.max(0, Math.min(items.length - 1, index));
      applyActiveIndex(boundedIndex);
      updateTrackPosition();
    }

    if (prevButton) {
      prevButton.addEventListener("click", function onPrevClick() {
        setActiveIndex(activeIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function onNextClick() {
        setActiveIndex(activeIndex + 1);
      });
    }

    items.forEach(function bindItemClick(item, index) {
      item.addEventListener("click", function onItemClick() {
        setActiveIndex(index);
      });
    });

    rail.addEventListener("pointerdown", function onPointerDown(event) {
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      isPointerActive = true;
    });

    rail.addEventListener("pointerup", function onPointerUp(event) {
      if (!isPointerActive) {
        return;
      }

      isPointerActive = false;
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;

      if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
        return;
      }

      if (deltaX < 0) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    });

    rail.addEventListener("pointercancel", function onPointerCancel() {
      isPointerActive = false;
    });

    window.addEventListener("resize", function onResizeGallery() {
      updateTrackPosition();
    }, { passive: true });

    setActiveIndex(activeIndex);
  }

  function getProjectGallery(project) {
    const gallery = PROJECT_GALLERIES[project.slug];

    if (!gallery || !gallery.files.length) {
      return [];
    }

    return gallery.files.map(function toGalleryItem(filename, index) {
      return {
        src: gallery.basePath ? gallery.basePath + "/" + filename : MEDIA_BLOB_BASE_URL + "/Gallery/" + gallery.folder + "/" + filename,
        alt: getProjectDisplayTitle(project) + " gallery image " + String(index + 1).padStart(2, "0")
      };
    });
  }

  function renderProjectNote(text) {
    return '<p class="project-note">' + text + "</p>";
  }

  function renderProjectContext(project) {
    if (!project.situation && !project.challenge) {
      return "";
    }
    return (
      '<section class="project-content-section project-context" aria-label="Project context">' +
      (project.situation
        ? '<div class="project-context-situation">' +
          '  <p class="eyebrow">Situation</p>' +
          '  <p class="project-section-copy">' + project.situation + "</p>" +
          "</div>"
        : "<div></div>") +
      (project.challenge
        ? '<div class="project-context-question">' +
          '  <p class="eyebrow">The real question</p>' +
          '  <p class="project-context-question-text">' + project.challenge + "</p>" +
          "</div>"
        : "") +
      "</section>"
    );
  }

  function renderProjectDecisions(project) {
    if (!project.decisions || !project.decisions.length) {
      return "";
    }
    return (
      '<section class="project-content-section" aria-label="Key decisions">' +
      '  <div class="project-section-head">' +
      '    <p class="eyebrow">Key decisions</p>' +
      "  </div>" +
      '  <div class="project-decisions-list">' +
      project.decisions
        .map(function renderDecision(decision, index) {
          return (
            '<div class="project-decision">' +
            '  <span class="project-decision-num">0' + (index + 1) + "</span>" +
            '  <div class="project-decision-body">' +
            "    <strong>" + decision.heading + "</strong>" +
            "    <p>" + decision.body + "</p>" +
            "  </div>" +
            "</div>"
          );
        })
        .join("") +
      "  </div>" +
      "</section>"
    );
  }

  function renderProjectLesson(project) {
    if (!project.lesson) {
      return "";
    }
    return (
      '<section class="project-lesson" aria-label="What I\'ve learned from this">' +
      '  <p class="eyebrow">What I\'ve learned from this</p>' +
      '  <p class="project-lesson-copy">' + project.lesson + "</p>" +
      "</section>"
    );
  }

  function renderProjectGallery(project) {
    const galleryItems = getProjectGallery(project);
    const galleryModifierClass = project.slug === "classic-stripes" ? " project-gallery-section--classic-stripes" : "";
    const galleryItemModifierClass = project.slug === "classic-stripes" ? " project-gallery-item--square" : "";

    if (!galleryItems.length) {
      return "";
    }

    return (
      '<section class="project-content-section project-gallery-section' + galleryModifierClass + '" aria-label="' + getProjectDisplayTitle(project) + ' gallery">' +
      '  <div class="project-section-head">' +
      '    <p class="eyebrow">Gallery</p>' +
      '  </div>' +
      '  <div class="project-gallery-shell" id="projectGallery">' +
      '    <button class="project-gallery-arrow is-prev" type="button" aria-label="Previous gallery image">&lsaquo;</button>' +
      '    <div class="project-gallery-rail">' +
      '      <div class="project-gallery-track">' +
      galleryItems
        .map(function renderGalleryItem(item) {
          return (
            '<figure class="project-gallery-item' + galleryItemModifierClass + '">' +
            '  <img src="' + item.src + '" alt="' + item.alt + '" loading="lazy" />' +
            "</figure>"
          );
        })
        .join("") +
      "      </div>" +
      "    </div>" +
      '    <button class="project-gallery-arrow is-next" type="button" aria-label="Next gallery image">&rsaquo;</button>' +
      "  </div>" +
      "</section>"
    );
  }

  function createTag(label) {
    const tag = document.createElement("span");
    tag.className = "meta-tag";
    tag.textContent = label;
    return tag;
  }

  function getProjectDisplayTitle(project) {
    return project.slug === "istinara" ? project.title.toUpperCase() : project.title;
  }

  function getProjectOverviewClass(project) {
    if (project.slug === "wrapchat") {
      return " project-overview--wrapchat";
    }

    if (project.slug === "classic-stripes") {
      return " project-overview--desktop-demo";
    }

    return "";
  }

  function renderProjectHero(project, projectTitle) {
    if (project.slug === "wrapchat") {
      return (
        '<figure class="project-hero project-hero--demo">' +
        '  <div class="phone-mockup-outer phone-mockup-outer--hero">' +
        '    <div class="phone-mockup">' +
        '      <div class="phone-chrome">' +
        '        <div class="phone-notch"></div>' +
        '        <iframe class="phone-screen"' +
        '          src="../assets/projects/Wrapchat/WrapchatUI/wrapchat-app.html"' +
        '          title="Wrapchat — interactive demo"' +
        '          sandbox="allow-scripts allow-same-origin"' +
        '          loading="lazy">' +
        '        </iframe>' +
        '        <div class="phone-home-bar"></div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</figure>'
      );
    }

    if (project.slug === "classic-stripes") {
      return (
        '<figure class="project-hero project-hero--demo project-hero--desktop-demo">' +
        '  <div class="desktop-mockup" data-desktop-demo-frame>' +
        '    <div class="desktop-browser-bar" aria-hidden="true">' +
        '      <span></span><span></span><span></span>' +
        '    </div>' +
        '    <div class="desktop-screen">' +
        '      <iframe class="desktop-screen-iframe"' +
        '        src="../assets/projects/The_Classic_Stripes/TCS-WebsiteUI/public/index.html"' +
        '        title="The Classic Stripes — website demo"' +
        '        sandbox="allow-scripts allow-same-origin"' +
        '        loading="lazy">' +
        '      </iframe>' +
        '    </div>' +
        '  </div>' +
        '</figure>'
      );
    }

    return (
      '<figure class="project-hero">' +
      '  <img src="' + project.heroImage + '" alt="' + projectTitle + ' — project image" />' +
      '</figure>'
    );
  }

  document.addEventListener("DOMContentLoaded", function onReady() {
    const store = global.OKS_PORTFOLIO_DATA;
    const app = global.OKSSite;
    const host = document.getElementById("projectDetail");

    if (!store || !host) {
      return;
    }

    function renderProjectPage() {
      const project = getProjectFromQuery(store);
      const nextProject = store.projects[(project.index + 1) % store.projects.length];
      const projectTitle = getProjectDisplayTitle(project);
      const nextProjectTitle = getProjectDisplayTitle(nextProject);

      document.title = projectTitle + " | OKS Studio";
      document.body.dataset.context = project.context;
      app.setAccent(project.accentRgb);
      app.setContext(project.context);

      host.innerHTML =
        '<section class="project-overview' + getProjectOverviewClass(project) + '">' +
        '  <div class="project-overview-copy">' +
        '    <div class="project-intro">' +
        '      <p class="eyebrow">' + project.category + "</p>" +
        '      <h1 class="project-detail-title">' + projectTitle + "</h1>" +
        "    </div>" +
        '    <p class="project-detail-description">' + project.description + "</p>" +
        '    <aside class="project-body-meta">' +
        '      <div class="project-labels" id="projectLabels"></div>' +
        "    </aside>" +
        "  </div>" +
        renderProjectHero(project, projectTitle) +
        "</section>" +
        '<div class="project-sections" id="projectSections">' +
        renderProjectDecisions(project) +
        renderProjectGallery(project) +
        (project.galleryNote ? renderProjectNote(project.galleryNote) : "") +
        renderProjectLesson(project) +
        "</div>" +
        '<footer class="project-foot">' +
        '  <img class="project-logo-inline" src="' + project.logo + '" alt="' + projectTitle + ' logo" data-slug="' + project.slug + '" />' +
        '  <div class="project-foot-nav">' +
        '    <a class="project-next" href="./project.html?slug=' + encodeURIComponent(nextProject.slug) + '">Next: ' + nextProjectTitle + "</a>" +
        "  </div>" +
        "</footer>";

      const labels = document.getElementById("projectLabels");
      project.labels.forEach(function appendLabel(label) {
        labels.appendChild(createTag(label));
      });

      if (project.liveUrl) {
        const demo = document.createElement("a");
        demo.className = "action-link";
        demo.href = project.liveUrl;
        demo.target = "_blank";
        demo.rel = "noopener noreferrer";
        demo.textContent = "View Live Project";
        document.querySelector(".project-body-meta").appendChild(demo);
      }

      if (project.slug === "wrapchat") {
        setupWrapchatDemoFrame(host.querySelector(".project-hero .phone-screen"));
      }

      if (project.slug === "classic-stripes") {
        setupClassicStripesDemoFrame(host.querySelector("[data-desktop-demo-frame]"));
      }

      const sections = document.getElementById("projectSections");
      if (sections && !sections.children.length) {
        sections.remove();
      }

      const gallery = document.getElementById("projectGallery");
      initProjectGallery(gallery);
    }

    document.addEventListener("oks:project-data-change", renderProjectPage);
    renderProjectPage();
  });
})(window);
