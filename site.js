const evidenceLinks = document.querySelectorAll("[data-evidence]");

if (evidenceLinks.length && typeof HTMLDialogElement !== "undefined") {
  const dialog = document.createElement("dialog");
  dialog.className = "evidence";
  dialog.setAttribute("aria-labelledby", "evidence-title");
  dialog.innerHTML = `
    <div class="evidence-head">
      <p id="evidence-title"></p>
      <button type="button" aria-label="Закрыть изображение">×</button>
    </div>
    <img alt="">
  `;
  document.body.append(dialog);

  const caption = dialog.querySelector("p");
  const close = dialog.querySelector("button");
  const image = dialog.querySelector("img");

  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) {
        dialog.close();
      }
    }
  });

  for (const link of evidenceLinks) {
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      caption.textContent = link.dataset.caption;
      image.src = link.href;
      dialog.showModal();
      close.focus();
    });
  }
}
