<template>
	<div
		class="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none transition-opacity duration-300 ease-in"
		:class="navMounted ? 'opacity-100' : 'opacity-0'"
	>
		<GlassSurface
			as="nav"
			:displace="0.5"
			:distortion-scale="-100"
			:red-offset="0"
			:green-offset="10"
			:blue-offset="20"
			:brightness="50"
			:opacity="0.93"
			:width="700"
			:height="60"
			:border-radius="30"
			mix-blend-mode="screen"
			class="pointer-events-auto hidden lg:flex flex-row py-3 px-9 justify-center items-center mt-5 shadow-lg shadow-dark/20 transition-all duration-300 overflow-hidden isolate border border-white/20 whitespace-nowrap"
		>
			<ul class="relative z-20">
				<li class="flex flex-row items-center gap-7 text-base text-center whitespace-nowrap">
					<a
						v-for="item in navItems"
						:key="item.id"
						:href="`#${item.id}`"
						@click="emit('select-section', item.id)"
						class="transition-opacity duration-300 cursor-pointer"
						:class="activeSection === item.id ? 'opacity-100 font-medium' : 'opacity-40 hover:opacity-80'"
					>
						{{ t(item.key) }}
					</a>

					<span class="opacity-20">|</span>

					<!-- Language Toggle -->
					<button
						id="lang-toggle"
						type="button"
						@click="handleLangToggle"
						class="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
						:aria-label="currentLang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'"
					>
						<span
							id="bahasa"
							class="transition-transform duration-500 font-bold text-sm inline-block"
							:style="{ transform: `scale(${langScale})` }"
						>
							{{ nextLangLabel }}
						</span>
					</button>

					<!-- Dark Mode Toggle -->
					<button
						id="dark-toggle"
						type="button"
						@click="handleThemeToggle"
						class="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
						:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
					>
						<span
							id="toggle-icon"
							class="material-symbols-outlined transition-transform duration-500 text-xs inline-block"
							:style="{
								transform: `rotate(${iconRotate}deg) scale(${iconScale})`,
							}"
						>
							{{ isDark ? 'wb_sunny' : 'brightness_3' }}
						</span>
					</button>
				</li>
			</ul>
		</GlassSurface>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
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

const nextLangLabel = computed(() => {
	return currentLang.value === "id" ? "EN" : "ID";
});

const navMounted = ref(false);
const langScale = ref(1);
const iconRotate = ref(0);
const iconScale = ref(1);

const navItems = [
	{ id: "home", key: "nav_home" },
	{ id: "about", key: "nav_about" },
	{ id: "skills", key: "nav_skills" },
	{ id: "project", key: "nav_project" },
	{ id: "experience", key: "nav_experience" },
	{ id: "contact", key: "nav_contact" },
];

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

onMounted(() => {
	setTimeout(() => {
		navMounted.value = true;
	}, 300);
});
</script>
