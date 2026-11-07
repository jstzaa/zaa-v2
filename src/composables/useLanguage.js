import { ref, computed } from "vue";
import { portfolioData } from "../data/portfolioData";

const currentLang = ref(localStorage.getItem("lang") || "en");

function toggleLanguage() {
	currentLang.value = currentLang.value === "en" ? "id" : "en";
	localStorage.setItem("lang", currentLang.value);
}

function setLanguage(lang) {
	currentLang.value = lang;
	localStorage.setItem("lang", lang);
}

function t(key) {
	return portfolioData.dictionaries[currentLang.value]?.[key] || key;
}

const activeData = computed(() => {
	return portfolioData.data[currentLang.value];
});

function projectDetails(name) {
	const details = portfolioData.projectInsights[currentLang.value]?.[name];
	return (
		details || {
			overview: currentLang.value === "id" ? "Detail proyek belum ditambahkan." : "Project details are not available yet.",
			focus: currentLang.value === "id" ? "Fokus utama belum ditentukan." : "Main focus is not defined yet.",
			impact: currentLang.value === "id" ? "Dampak proyek akan ditampilkan di sini." : "Project impact will appear here.",
			highlights: [],
			themes: [],
		}
	);
}

export function useLanguage() {
	return {
		currentLang,
		toggleLanguage,
		setLanguage,
		t,
		activeData,
		projectDetails,
	};
}
