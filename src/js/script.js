const sideButton = document.getElementById("sidebar");

sideButton.addEventListener("click", function () {
  const navbar = document.getElementById("navbar");

  navbar.classList.toggle("opacity-0");
});
