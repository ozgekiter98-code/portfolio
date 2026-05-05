(function attachContactPage(global) {
  document.addEventListener("DOMContentLoaded", function onReady() {
    if (!global.OKSSite) {
      return;
    }

    global.OKSSite.setContext("Digital");

    var openBtn   = document.getElementById("openContactForm");
    var modal     = document.getElementById("contactModal");
    var backdrop  = document.getElementById("contactBackdrop");
    var closeBtn  = document.getElementById("closeContactForm");
    var form      = document.getElementById("contactForm");
    var submitBtn = document.getElementById("contactSubmit");
    var success   = document.getElementById("contactSuccess");

    if (!modal) { return; }

    function openModal() {
      modal.setAttribute("aria-hidden", "false");
      backdrop.setAttribute("aria-hidden", "false");
      document.body.setAttribute("data-contact-open", "true");
      setTimeout(function () {
        var first = form && form.querySelector("input, textarea");
        if (first) { first.focus(); }
      }, 60);
    }

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      backdrop.setAttribute("aria-hidden", "true");
      document.body.removeAttribute("data-contact-open");
    }

    if (openBtn)  { openBtn.addEventListener("click", openModal); }
    if (closeBtn) { closeBtn.addEventListener("click", closeModal); }
    if (backdrop) { backdrop.addEventListener("click", closeModal); }

    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape" && document.body.hasAttribute("data-contact-open")) {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener("submit", function onSubmit(e) {
        e.preventDefault();

        var data = {
          name:    form.elements.name.value.trim(),
          email:   form.elements.email.value.trim(),
          message: form.elements.message.value.trim()
        };

        submitBtn.disabled    = true;
        submitBtn.textContent = "Sending…";

        fetch("https://formspree.io/f/mnjwdbea", {
          method:  "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body:    JSON.stringify(data)
        })
          .then(function (res) {
            if (res.ok) {
              form.setAttribute("aria-hidden", "true");
              form.style.display = "none";
              success.classList.add("is-visible");
            } else {
              submitBtn.disabled    = false;
              submitBtn.textContent = "Send message";
            }
          })
          .catch(function () {
            submitBtn.disabled    = false;
            submitBtn.textContent = "Send message";
          });
      });
    }
  });
})(window);
