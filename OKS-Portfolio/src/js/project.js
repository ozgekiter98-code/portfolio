(function attachProjectPage(global) {
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
        "left: 50% !important;" +
        "right: auto !important;" +
        "transform: translateX(-50%) !important;" +
        "text-align: center !important;" +
        "}";
      (doc.head || doc.body).appendChild(style);
    }
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
    applyCleanup();
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

  function createTag(label) {
    const tag = document.createElement("span");
    tag.className = "meta-tag";
    tag.textContent = label;
    return tag;
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

      document.title = project.title + " | OKS Studio";
      document.body.dataset.context = project.context;
      app.setAccent(project.accentRgb);
      app.setContext(project.context);

      host.innerHTML =
        '<section class="project-overview' + (project.slug === "wrapchat" ? ' project-overview--wrapchat' : "") + '">' +
        '  <div class="project-overview-copy">' +
        '    <div class="project-intro">' +
        '      <p class="eyebrow">' + project.category + "</p>" +
        '      <h1 class="project-detail-title">' + project.title + "</h1>" +
        "    </div>" +
        '    <p class="project-detail-description">' + project.description + "</p>" +
        '    <aside class="project-body-meta">' +
        '      <dl class="project-meta-list" id="projectMetaList"></dl>' +
        '      <div class="project-labels" id="projectLabels"></div>' +
        "    </aside>" +
        "  </div>" +
        '  <figure class="project-hero' + (project.slug === "wrapchat" ? ' project-hero--demo' : "") + '">' +
        (project.slug === "wrapchat"
          ? '<div class="phone-mockup-outer phone-mockup-outer--hero">' +
            '  <div class="phone-mockup">' +
            '    <div class="phone-chrome">' +
            '      <div class="phone-notch"></div>' +
            '      <iframe class="phone-screen"' +
            '        src="../assets/projects/Wrapchat/WrapchatUI/wrapchat-app.html"' +
            '        title="Wrapchat — interactive demo"' +
            '        sandbox="allow-scripts allow-same-origin"' +
            '        loading="lazy">' +
            '      </iframe>' +
            '      <div class="phone-home-bar"></div>' +
            '    </div>' +
            '  </div>' +
            '</div>'
          : '<img src="' + project.heroImage + '" alt="' + project.title + ' — project image" />') +
        "  </figure>" +
        "</section>" +
        '<div class="project-sections" id="projectSections"></div>' +
        '<footer class="project-foot">' +
        '  <img class="project-logo-inline" src="' + project.logo + '" alt="' + project.title + ' logo" data-slug="' + project.slug + '" />' +
        '  <div class="project-foot-nav">' +
        '    <a class="project-next" href="./project.html?slug=' + encodeURIComponent(nextProject.slug) + '">Next: ' + nextProject.title + "</a>" +
        "  </div>" +
        "</footer>";

      const metaList = document.getElementById("projectMetaList");
      [
        { label: "Category", value: project.category },
        { label: "Context", value: project.context }
      ].forEach(function appendMeta(item) {
        const dt = document.createElement("dt");
        dt.textContent = item.label;
        const dd = document.createElement("dd");
        dd.textContent = item.value;
        const div = document.createElement("div");
        div.className = "project-meta-item";
        div.appendChild(dt);
        div.appendChild(dd);
        metaList.appendChild(div);
      });

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
        const sections = document.getElementById("projectSections");

        const gallerySection = document.createElement("section");
        gallerySection.className = "project-content-section";
        const posts = [1, 2, 3, 4, 5, 6].map(function (i) {
          const n = i < 10 ? "0" + i : String(i);
          return '<article class="project-gallery-item">' +
            '<img src="../assets/projects/Wrapchat/post/post_' + n + '.png" alt="Wrapchat social post ' + i + '" loading="lazy" />' +
          '</article>';
        }).join("");
        gallerySection.innerHTML =
          '<div class="project-section-head">' +
          '  <p class="eyebrow">Social Presence</p>' +
          '</div>' +
          '<div class="project-gallery-shell">' +
          '  <button class="project-gallery-arrow is-prev" type="button" aria-label="Show previous social post">←</button>' +
          '  <div class="project-gallery-rail">' +
          '    <div class="project-gallery-track">' + posts + "</div>" +
          "  </div>" +
          '  <button class="project-gallery-arrow is-next" type="button" aria-label="Show next social post">→</button>' +
          '</div>';
        sections.appendChild(gallerySection);
        initProjectGallery(gallerySection);
      } else {
        const sections = document.getElementById("projectSections");
        sections.remove();
      }
    }

    document.addEventListener("oks:project-data-change", renderProjectPage);
    renderProjectPage();
  });
})(window);
