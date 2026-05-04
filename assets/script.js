document.addEventListener("DOMContentLoaded", () => {
  const tasks = [
    {
      title: "Task 1 - first website",
      src: "tasks/task1/index.html",
    },
  ];
  const taskList = document.querySelector(".task-list");

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks available.</p>";
    return;
  }

  tasks.forEach((task) => {
    if (!task.title || !task.src) {
      console.log(" invalid task:", task);
      return;
    }
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <div class="task-meta">
                <span>${task.title}</span>
                <button class="task-load" data-src="${task.src}">View</button>
                <a href="${task.src}" target="_blank" class="task-new-tab" data-src="${task.src}">Open In New Tab</a>
            </div>
            <div class="task-preview" aria-hidden="true">
              <div class="preview-placeholder">Preview not loaded.</div>
              <iframe title="${task.title} preview" frameborder="0" loading="lazy"></iframe>
            </div>
        `;
    taskList.appendChild(listItem);
  });

  const buttons = document.querySelectorAll(".task-load");

  buttons.forEach((button) => {
    const preview = button.closest("li").querySelector(".task-preview");
    const iframe = preview.querySelector("iframe");
    const placeholder = preview.querySelector(".preview-placeholder");
    const src = button.dataset.src;
    console.log(src);

    button.addEventListener("click", () => {
      const isOpen = preview.classList.contains("open");

      if (!isOpen) {
        if (!iframe.src) {
          iframe.src = src;
          placeholder.textContent = "Loading preview...";
        }
        preview.classList.add("open");
        preview.setAttribute("aria-hidden", "false");
        button.classList.add("active");
        button.textContent = "Hide";
      } else {
        preview.classList.remove("open");
        preview.setAttribute("aria-hidden", "true");
        button.classList.remove("active");
        button.textContent = "View";
      }
    });

    iframe.addEventListener("load", () => {
      placeholder.textContent = "Preview loaded.";
    });
  });
});
