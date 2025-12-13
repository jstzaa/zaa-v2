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

// Dark Mode Toggle
const darkToggle = document.getElementById("dark-toggle");
const html = document.documentElement;
const icon = darkToggle.querySelector("#toggle-icon");

// Function to update icon
// Function to update icon
function updateIcon() {
	// Add rotation/scale effect
	icon.style.transform = "rotate(360deg) scale(0)";

	setTimeout(() => {
		if (html.classList.contains("dark")) {
			icon.innerHTML = "wb_sunny";
			darkToggle.classList.remove("bg-dark");
			darkToggle.classList.add("bg-hvPrimary");
			icon.classList.add("text-dark");
		} else {
			icon.innerHTML = "brightness_3";
			darkToggle.classList.add("bg-dark");
			darkToggle.classList.remove("bg-hvPrimary");
			icon.classList.remove("text-dark");
		}
		// Reset transform
		icon.style.transform = "rotate(0deg) scale(1)";
	}, 200); // Wait for half the transition time
}

// Check local storage or system preference
if (localStorage.theme === "dark") {
	html.classList.add("dark");
	// Initialize correct state without animation for page load
	const icon = darkToggle.querySelector("#toggle-icon");
	icon.innerHTML = "wb_sunny";
	darkToggle.classList.remove("bg-dark");
	darkToggle.classList.add("bg-hvPrimary");
	icon.classList.add("text-dark");
} else {
	html.classList.remove("dark");
}

darkToggle.addEventListener("click", () => {
	html.classList.toggle("dark");

	if (html.classList.contains("dark")) {
		localStorage.theme = "dark";
	} else {
		localStorage.theme = "light";
	}
	updateIcon();
});
