<template>
	<div class="dark:text-secondary min-h-screen">
		<!-- Desktop Navbar -->
		<NavbarDesktop :active-section="activeSection" @select-section="handleSelectSection" />

		<!-- Mobile Bottom Dock -->
		<MobileDock :active-section="activeSection" @select-section="handleSelectSection" />

		<!-- Main Sections -->
		<main>
			<HeroSection />
			<AboutSection />
			<SkillsSection />
			<ProjectSection />
			<ExperienceSection />
			<ContactSection />
		</main>

		<!-- Back To Top Button -->
		<BackToTop />
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import AOS from "aos";
import NavbarDesktop from "./components/NavbarDesktop.vue";
import MobileDock from "./components/MobileDock.vue";
import HeroSection from "./components/HeroSection.vue";
import AboutSection from "./components/AboutSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectSection from "./components/ProjectSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import ContactSection from "./components/ContactSection.vue";
import BackToTop from "./components/BackToTop.vue";
import { useTheme } from "./composables/useTheme";

const { initTheme } = useTheme();
const activeSection = ref("home");
let observer = null;

function handleSelectSection(id) {
	activeSection.value = id;
}

onMounted(() => {
	initTheme();

	nextTick(() => {
		AOS.init({
			duration: 800,
			easing: "ease-in-out",
			once: false,
			mirror: true,
			offset: 120,
		});

		// IntersectionObserver matching exact behavior from original liquid-glass.js
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.id) {
						activeSection.value = entry.target.id;
					}
				});
			},
			{ threshold: 0, rootMargin: "-30% 0px -65% 0px" }
		);

		document.querySelectorAll("section").forEach((section) => {
			observer.observe(section);
		});
	});
});

onUnmounted(() => {
	if (observer) {
		observer.disconnect();
	}
});
</script>
