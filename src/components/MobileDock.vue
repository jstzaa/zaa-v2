<template>
	<!-- Backdrop to close popup on click outside -->
	<div
		v-if="showSettings"
		class="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
		@click="showSettings = false"
	></div>

	<!-- Settings Popup using GlassSurface -->
	<Transition name="popover">
		<GlassSurface
			v-if="showSettings"
			as="div"
			id="mobile-settings-popup"
			:displace="0.5"
			:distortion-scale="-100"
			:red-offset="0"
			:green-offset="10"
			:blue-offset="20"
			:brightness="50"
			:opacity="0.93"
			:width="200"
			:height="160"
			:border-radius="30"
			mix-blend-mode="screen"
			class="lg:hidden fixed bottom-[80px] right-7 sm:right-3 z-50 p-2.5 bg-hvPrimary/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-secondary/15 dark:border-white/15 flex flex-col gap-1.5 w-[230px]"
		>
			<div class="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-secondary/10 dark:border-white/10 flex items-center justify-between">
				<span>{{ t('nav_settings') }}</span>
				<button
					type="button"
					@click="showSettings = false"
					class="text-neutral-400 hover:text-secondary dark:hover:text-white p-0.5 rounded cursor-pointer"
					aria-label="Close settings"
				>
					<span class="material-symbols-outlined text-sm leading-none">close</span>
				</button>
			</div>

			<!-- Theme Toggle Button -->
			<button
				type="button"
				@click="handleThemeToggle"
				class="flex items-center justify-between gap-3 w-full px-2.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium text-secondary dark:text-white cursor-pointer"
			>
				<div class="flex items-center gap-2.5">
					<span
						class="material-symbols-outlined transition-transform duration-500 text-lg"
						:style="{ transform: `rotate(${iconRotate}deg) scale(${iconScale})` }"
					>
						{{ isDark ? 'wb_sunny' : 'brightness_3' }}
					</span>
					<span>{{ isDark ? (currentLang === 'id' ? 'Mode Gelap' : 'Dark Mode') : (currentLang === 'id' ? 'Mode Terang' : 'Light Mode') }}</span>
				</div>
			</button>

			<!-- Language Toggle Button -->
			<button
				type="button"
				@click="handleLangToggle"
				class="flex items-center justify-between gap-3 w-full px-2.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium text-secondary dark:text-white cursor-pointer"
			>
				<div class="flex items-center gap-2.5">
					<span class="material-symbols-outlined text-lg">translate</span>
					<span>{{ currentLang === 'id' ? 'Bahasa' : 'Language' }}</span>
				</div>
			</button>
		</GlassSurface>
	</Transition>

	<!-- Mobile Bottom Dockbar -->
	<GlassSurface
		as="nav"
		id="mobile-dock"
		:displace="0.5"
		:distortion-scale="-100"
		:red-offset="0"
		:green-offset="10"
		:blue-offset="20"
		:brightness="50"
		:opacity="0.93"
		:width="320"
		:height="60"
		:border-radius="30"
		mix-blend-mode="screen"
		class="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center gap-0.5 sm:gap-1 px-2 py-1.5 max-w-[calc(100vw-1rem)] bg-hvPrimary/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-2xl shadow-xl shadow-dark/20 border border-secondary/10 transition-all duration-300 overflow-x-auto scrollbar-hide"
	>
		<!-- Home -->
		<a
			href="#home"
			@click="emit('select-section', 'home')"
			:aria-label="t('nav_home')"
			:aria-current="activeSection === 'home' ? 'page' : undefined"
			class="min-w-[40px] h-11 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
			:class="activeSection === 'home' ? 'scale-105 text-secondary dark:text-white font-semibold' : 'text-neutral-500 hover:text-secondary dark:text-neutral-400 dark:hover:text-white'"
		>
			<span class="material-symbols-outlined" style="font-size: 22px">home</span>
		</a>

		<!-- About -->
		<a
			href="#about"
			@click="emit('select-section', 'about')"
			:aria-label="t('nav_about')"
			:aria-current="activeSection === 'about' ? 'page' : undefined"
			class="min-w-[40px] h-11 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
			:class="activeSection === 'about' ? 'scale-105 text-secondary dark:text-white font-semibold' : 'text-neutral-500 hover:text-secondary dark:text-neutral-400 dark:hover:text-white'"
		>
			<span class="material-symbols-outlined" style="font-size: 22px">person</span>
		</a>

		<!-- Skills -->
		<a
			href="#skills"
			@click="emit('select-section', 'skills')"
			:aria-label="t('nav_skills')"
			:aria-current="activeSection === 'skills' ? 'page' : undefined"
			class="min-w-[40px] h-11 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
			:class="activeSection === 'skills' ? 'scale-105 text-secondary dark:text-white font-semibold' : 'text-neutral-500 hover:text-secondary dark:text-neutral-400 dark:hover:text-white'"
		>
			<span class="material-symbols-outlined" style="font-size: 22px">code</span>
		</a>

		<!-- Projects -->
		<a
			href="#project"
			@click="emit('select-section', 'project')"
			:aria-label="t('nav_project')"
			:aria-current="activeSection === 'project' ? 'page' : undefined"
			class="min-w-[40px] h-11 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
			:class="activeSection === 'project' ? 'scale-105 text-secondary dark:text-white font-semibold' : 'text-neutral-500 hover:text-secondary dark:text-neutral-400 dark:hover:text-white'"
		>
			<span class="material-symbols-outlined" style="font-size: 22px">folder_open</span>
		</a>

		<!-- Experience -->
		<a
			href="#experience"
			@click="emit('select-section', 'experience')"
			:aria-label="t('nav_experience')"
			:aria-current="activeSection === 'experience' ? 'page' : undefined"
			class="min-w-[40px] h-11 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
			:class="activeSection === 'experience' ? 'scale-105 text-secondary dark:text-white font-semibold' : 'text-neutral-500 hover:text-secondary dark:text-neutral-400 dark:hover:text-white'"
		>
			<span class="material-symbols-outlined" style="font-size: 22px">work</span>
		</a>

		<!-- Contact -->
		<a
			href="#contact"
			@click="emit('select-section', 'contact')"
			:aria-label="t('nav_contact')"
			:aria-current="activeSection === 'contact' ? 'page' : undefined"
			class="min-w-[40px] h-11 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
			:class="activeSection === 'contact' ? 'scale-105 text-secondary dark:text-white font-semibold' : 'text-neutral-500 hover:text-secondary dark:text-neutral-400 dark:hover:text-white'"
		>
			<span class="material-symbols-outlined" style="font-size: 22px">mail</span>
		</a>

		<!-- Divider -->
		<div class="w-px h-6 bg-secondary/20 dark:bg-white/20 mx-0.5 rounded-full" aria-hidden="true"></div>

		<!-- Settings Button (Consolidating Theme & Language toggles) -->
		<button
			id="settings-toggle-dock"
			type="button"
			@click="toggleSettings"
			:aria-label="t('nav_settings')"
			:aria-expanded="showSettings"
			aria-haspopup="true"
			class="min-w-[40px] h-11 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
			:class="showSettings ? 'scale-105 text-secondary dark:text-white font-semibold' : 'text-neutral-500 hover:text-secondary dark:text-neutral-400 dark:hover:text-white'"
		>
			<span
				class="material-symbols-outlined transition-transform duration-300"
				:class="showSettings ? 'rotate-45' : 'rotate-0'"
				style="font-size: 22px"
			>
				settings
			</span>
		</button>
	</GlassSurface>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import GlassSurface from "./GlassSurface.vue";
import { useLanguage } from "../composables/useLanguage";
import { useTheme } from "../composables/useTheme";

const props = defineProps({
	activeSection: {
		type: String,
		default: "home",
	},
});

const emit = defineEmits(["select-section"]);

const { currentLang, toggleLanguage, t } = useLanguage();
const { isDark, toggleTheme } = useTheme();

const showSettings = ref(false);
const langScale = ref(1);
const iconRotate = ref(0);
const iconScale = ref(1);

function toggleSettings() {
	showSettings.value = !showSettings.value;
}

function handleLangToggle() {
	langScale.value = 0;
	setTimeout(() => {
		toggleLanguage();
		langScale.value = 1;
	}, 150);
}

function handleThemeToggle() {
	iconRotate.value = 360;
	iconScale.value = 0;
	setTimeout(() => {
		toggleTheme();
		iconRotate.value = 0;
		iconScale.value = 1;
	}, 200);
}

function handleKeydown(e) {
	if (e.key === "Escape" && showSettings.value) {
		showSettings.value = false;
	}
}

onMounted(() => {
	window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.popover-enter-active,
.popover-leave-active {
	transition: opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1), transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}
.popover-enter-from {
	opacity: 0;
	transform: translateY(20px);
}
.popover-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.popover-leave-from {
	opacity: 1;
	transform: translateY(0);
}
.popover-leave-to {
	opacity: 0;
	transform: translateY(12px);
}
</style>
