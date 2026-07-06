document.addEventListener("DOMContentLoaded", () => {
  const tasks = [
    {
      title: "Task 1 - first website",
      src: "tasks/task1/index.html",
    },
    {
      title: "Task 2 - Tic Tac Toe Skeleton",
      src: "tasks/task2/index.html",
    },
    {
      title: "Task 3 - Flexbox Layout Useage",
      src: "tasks/task3/index.html",
    },
    {
      title: "Task 4 - OCEANPETS Template",
      src: "tasks/task4/index.html",
    },
    {
      title: "Task 5 - Apply Form",
      src: "tasks/task5/index.html",
    },
    {
      title: "Task 6.1 - Grid during lesson",
      src: "tasks/task6/practical.html",
    },
    {
      title: "Task 6.2 - OCEANPETS Template",
      src: "tasks/task6/index.html",
    },
    {
      title: "Task 7 - OCEANPETS nth-child grid",
      src: "tasks/task7/index.html",
    },
    {
      title: "Task 8 - OCEANPETS animations, responsive, navbar toggle",
      src: "tasks/task8/index.html",
    },
    {
      title: "Task 9 - Practical during lecture",
      src: "tasks/task9/practical.html",
    },
    {
      title: "Task 11 - Bootstrap",
      src: "tasks/task11/index.html",
    },
    {
      title: "Task 13 - SASS Buttons",
      src: "tasks/task13/index.html",
    },
    {
      title: "Task 14 - Final Html/Css Project",
      src: "tasks/task14-finalHtmlProject/index.html",
    },
    {
      title: "Task 15 - Js Start",
      src: "tasks/task15JsStart/index.html",
    },
    {
      title: "Task 16 - JS If/Else/Switch/Timers",
      src: "tasks/task16/index.html",
    },
    {
      title: "Task 17 - JS Loops",
      src: "tasks/task17/index.html",
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
