const sideButton = document.getElementById("sidebar");

sideButton.addEventListener("click", function () {
  const navbar = document.getElementById("navbar");

  navbar.classList.toggle("invisible");
});

// const tabButton = document.querySelectorAll("#btn-tab");
// const techStack = document.getElementById("tech_stack");
// const tools = document.getElementById("tools");

// tabButton[0].addEventListener("click", function () {
//   techStack.classList.remove("hidden");
//   techStack.classList.add("grid");

//   tools.classList.remove("grid");
//   tools.classList.add("hidden");
// });

// tabButton[1].addEventListener("click", function () {
//   techStack.classList.remove("grid");
//   techStack.classList.add("hidden");

//   tools.classList.remove("hidden");
//   tools.classList.add("grid");
// });
