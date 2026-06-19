// Tailwind configuration
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        primaryBlue: "#0c122c",
        textBlue: "#1a2352",
        brandRed: "#d91c1c",
        customBlue: "#000080",
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const closeMobileMenuButton = document.getElementById("close-mobile-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  // Injected CSS
  const style = document.createElement("style");
  style.textContent = `
    .nav-link {
      position: relative;
      transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .nav-link:not(.active):hover {
      color: #d91c1c !important;
    }
    .nav-link.active {
      color: #1a2352 !important;
      text-decoration: none !important;
    }
    @media (min-width: 768px) {
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #d91c1c;
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .nav-link:not(.active):hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
      .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #1a2352;
        transform: scaleX(1);
      }
    }
  `;
  document.head.appendChild(style);

  // set active link
  const setActiveLink = (activeLink) => {
    navLinks.forEach((link) => {
      link.classList.remove(
        "active",
        "text-textBlue",
        "underline",
        "hover:text-textBlue",
      );
      link.classList.add("text-gray-600");
    });

    if (activeLink) {
      activeLink.classList.add("active", "text-textBlue", "underline");
      activeLink.classList.remove("text-gray-600");
    }
  };

  // Add click event
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        const targetId = href.substring(1);
        let targetEl;

        if (targetId === "") {
          targetEl = document.documentElement;
        } else {
          targetEl = document.getElementById(targetId);
        }

        if (targetEl) {
          event.preventDefault();
          targetEl.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }
      setActiveLink(this);
    });
  });

  /******* mobilemenu start  *********/

  // Toggle mobile menu
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.add("translate-x-0");
    });
  }

  if (closeMobileMenuButton && mobileMenu) {
    closeMobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-0");
      mobileMenu.classList.add("translate-x-full");
    });
  }

  // Close mobile menu when a link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-0");
        mobileMenu.classList.add("translate-x-full");
      });
    });
  }

  // Set initial active state on page load
  const currentPath = window.location.pathname.split("/").pop(); // e.g., "home.html", "about.html", or ""
  const currentHash = window.location.hash; // e.g., "#services"

  let initialActiveLink = Array.from(navLinks).find((link) => {
    const linkHref = link.getAttribute("href");
    return (
      (linkHref === "#" &&
        (currentPath === "" ||
          currentPath === "index.html" ||
          currentPath === "home.html")) ||
      (linkHref.split("/").pop() === currentPath && currentPath !== "") ||
      (linkHref === currentHash && currentHash !== "")
    );
  });
  console.log(initialActiveLink);

  setActiveLink(initialActiveLink);
});
