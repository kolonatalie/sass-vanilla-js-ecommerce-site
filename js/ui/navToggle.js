export function NavBar() {
  const navToggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const socialIcons = document.querySelector(".social-media");

  navToggle.addEventListener("click", function () {
    links.classList.toggle("is-shown");
    socialIcons.classList.toggle("is-shown");
    navToggle.classList.toggle("active");
  });
}