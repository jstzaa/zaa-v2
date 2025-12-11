const sideButton = document.getElementById("sidebar");

sideButton.addEventListener("click", function () {
	const navbar = document.getElementById("navbar");

	navbar.classList.toggle("invisible");
});

document.addEventListener("DOMContentLoaded", () => {
	const content = document.getElementById("nav");
	setTimeout(() => {
		content.classList.remove("opacity-0");
		content.classList.add("opacity-100");
	}, 300);
});
