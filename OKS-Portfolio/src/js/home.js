(function attachHome(global) {
  function createTag(label) {
    const tag = document.createElement("span");
    tag.className = "meta-tag";
    tag.textContent = label;
    return tag;
  }

  document.addEventListener("DOMContentLoaded", function onReady() {
    const store = global.OKS_PORTFOLIO_DATA;
    const app = global.OKSSite;
    const rail = document.getElementById("projectRail");
    const hero = document.getElementById("homeHero");
    const panel = document.getElementById("previewPanel");
    const image = document.getElementById("previewImage");
    const title = document.getElementById("previewTitle");
    const category = document.getElementById("previewCategory");
    const description = document.getElementById("previewDescription");
    const tags = document.getElementById("previewTags");
    const logo = document.getElementById("previewLogo");

    if (!store || !rail || !panel || !hero) {
      return;
    }

    let activeSlug = null;

    function clearActive() {
      activeSlug = null;
      renderPreview(null);
      rail.querySelectorAll(".project-link").forEach(function reset(link) {
        link.classList.remove("is-active");
      });
    }

    function renderPreview(project) {
      const isEmpty = !project;
      panel.classList.toggle("is-empty", isEmpty);
      hero.classList.toggle("is-previewing", !isEmpty);

      if (!project) {
        panel.href = "./project.html";
        category.textContent = "OKS Studio";
        title.textContent = "Selected work";
        description.textContent =
          "Brand worlds, commerce systems, and learning products shaped with the same quiet spatial thinking.";
        image.removeAttribute("src");
        image.alt = "";
        logo.removeAttribute("src");
        logo.alt = "";
        tags.innerHTML = "";
        app.setIdleCursor(true);
        app.setAccent(app.getDefaultAccent());
        app.setContext("Digital");
        return;
      }

      panel.href = project.href;
      category.textContent = project.category;
      title.textContent = project.title;
      description.textContent = project.description;
      image.src = project.heroImage;
      image.alt = project.title + " preview";
      logo.src = project.logo;
      logo.alt = project.title + " logo";
      tags.innerHTML = "";
      project.labels.forEach(function addTag(label) {
        tags.appendChild(createTag(label));
      });

      app.setIdleCursor(false);
      app.setAccent(project.accentRgb);
      app.setContext(project.context);
    }

    function setActive(slug) {
      if (slug === activeSlug) {
        return;
      }

      activeSlug = slug;
      const project = store.projectBySlug[slug] || null;
      renderPreview(project);

      rail.querySelectorAll(".project-link").forEach(function update(link) {
        link.classList.toggle("is-active", link.dataset.slug === slug);
      });
    }

    store.projects.forEach(function createLink(project, index) {
      const link = document.createElement("a");
      link.className = "project-link";
      link.href = "./project.html?slug=" + encodeURIComponent(project.slug);
      link.dataset.slug = project.slug;
      link.innerHTML =
        "<small>" +
        String(index + 1).padStart(2, "0") +
        "</small><strong>" +
        project.title +
        "</strong>";

      link.addEventListener("mouseenter", function onEnter() {
        setActive(project.slug);
      });

      link.addEventListener("focus", function onFocus() {
        setActive(project.slug);
      });

      link.addEventListener("click", function onClick(event) {
        if (activeSlug !== project.slug) {
          event.preventDefault();
          setActive(project.slug);
        }
      });

      rail.appendChild(link);
    });

    if (global.OKSTheme && global.OKSTheme.onChange) {
      global.OKSTheme.onChange(function syncIdleAccent() {
        if (!activeSlug) {
          app.setAccent(app.getDefaultAccent());
        }
      });
    }

    document.addEventListener("oks:project-data-change", function syncPreviewFromAccentLab() {
      const project = activeSlug ? store.projectBySlug[activeSlug] : null;
      renderPreview(project);
    });

    document.addEventListener("oks:accent-lab-open", function showSelectedWorksTitle() {
      clearActive();
    });

    renderPreview(null);
  });
})(window);
