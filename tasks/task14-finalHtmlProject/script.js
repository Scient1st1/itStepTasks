document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const closeMobileMenuButton = document.getElementById("close-mobile-menu");
  const mobileMenu = document.getElementById("mobile-menu");

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

  /********  Tailwind Config  *****************/

  tailwind.config = {
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
});
