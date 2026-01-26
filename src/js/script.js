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
function updateIcon() {
	// Add rotation/scale effect
	icon.style.transform = "rotate(360deg) scale(0)";

	setTimeout(() => {
		if (html.classList.contains("dark")) {
			icon.innerHTML = "wb_sunny";
			darkToggle.classList.remove("bg-dark");
			darkToggle.classList.add("bg-hvPrimary");
			icon.classList.add("text-primary");
		} else {
			icon.innerHTML = "brightness_3";
			darkToggle.classList.add("bg-dark");
			darkToggle.classList.remove("bg-hvPrimary");
			icon.classList.remove("text-primary");
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
	if (icon) {
		icon.innerHTML = "wb_sunny";
		darkToggle.classList.remove("bg-dark");
		darkToggle.classList.add("bg-hvPrimary");
		icon.classList.add("text-primary");
	}
} else {
	html.classList.remove("dark");
}

if (darkToggle) {
	darkToggle.addEventListener("click", () => {
		html.classList.toggle("dark");

		if (html.classList.contains("dark")) {
			localStorage.theme = "dark";
		} else {
			localStorage.theme = "light";
		}
		updateIcon();
	});
}

// Translation Logic
document.addEventListener("alpine:init", () => {
	Alpine.store("lang", {
		current: localStorage.getItem("lang") || "en",
		toggle() {
			this.current = this.current === "en" ? "id" : "en";
			localStorage.setItem("lang", this.current);
			updateLangIcon();
			if (window.updateTyped) window.updateTyped();
		},
		t(key) {
			return this.dictionaries[this.current][key] || key;
		},
		dictionaries: {
			en: {
				nav_home: "Home",
				nav_about: "About",
				nav_skills: "Skills",
				nav_project: "Projects",
				nav_experience: "Experience",
				nav_contact: "Contact",
				hero_hi: "Hi there!",
				hero_intro: "I'm Fahriza Kurniawan",
				about_title: "About me",
				about_desc: "A student with a high interest and enthusiasm for developing in the field of technology, who is dedicated to software development in order to create relevant solutions to problems in the digital world.",
				edu_title: "Educational Background",
				skills_title: "Skills",
				skills_tab1: "Tech Stack",
				skills_tab2: "Tools",
				projects_title: "Projects",
				exp_title: "Experience",
				exp_tab1: "Work",
				exp_tab2: "Organization",
				contact_title: "Let's Connect!",
				contact_name: "Your Name",
				contact_email: "Your Email",
				contact_subject: "Subject",
				contact_msg: "Your Message...",
				contact_submit: "Submit",
				footer_text: "2025 Fahriza Kurniawan",
			},
			id: {
				nav_home: "Beranda",
				nav_about: "Tentang",
				nav_skills: "Keahlian",
				nav_project: "Proyek",
				nav_experience: "Pengalaman",
				nav_contact: "Kontak",
				hero_hi: "Halo!",
				hero_intro: "Saya Fahriza Kurniawan",
				about_title: "Tentang Saya",
				about_desc: "Seorang siswa dengan minat dan antusiasme tinggi untuk berkembang di bidang teknologi, yang berdedikasi pada pengembangan perangkat lunak guna menciptakan solusi yang relevan untuk masalah di dunia digital.",
				edu_title: "Latar Belakang Pendidikan",
				skills_title: "Keahlian",
				skills_tab1: "Teknologi",
				skills_tab2: "Alat",
				projects_title: "Proyek",
				exp_title: "Pengalaman",
				exp_tab1: "Pekerjaan",
				exp_tab2: "Organisasi",
				contact_title: "Mari Terhubung!",
				contact_name: "Nama Anda",
				contact_email: "Email Anda",
				contact_subject: "Subjek",
				contact_msg: "Pesan Anda...",
				contact_submit: "Kirim",
				footer_text: "2025 Fahriza Kurniawan",
			},
		},
		data: {
			en: {
				educations: [
					{ name: "SMK Al-Khoeriyah", logo: "src/img/edu/smkak.png", year: "2023 - 2026" },
					{ name: "MTsN 1 Kota Tasikmalaya", logo: "src/img/edu/mtsn1.png", year: "2020 - 2023" },
					{ name: "SDN 1 Karangsambung", logo: "src/img/edu/sdn.png", year: "2014 - 2020" },
				],
				utils_skills: [
					{ name: "HTML", logo: "src/img/stack/html.svg" },
					{ name: "CSS", logo: "src/img/stack/css.svg" },
					{ name: "JavaScript", logo: "src/img/stack/javascript.svg" },
					{ name: "Bootstrap", logo: "src/img/stack/bootstrap.svg" },
					{ name: "Tailwind", logo: "src/img/stack/tailwind.svg" },
					{ name: "Laravel", logo: "src/img/stack/laravel.svg" },
					{ name: "MySQL", logo: "src/img/stack/mysql.svg" },
				],
				utils_tools: [
					{ name: "VS Code", logo: "src/img/tools/vscode.svg" },
					{ name: "Git", logo: "src/img/tools/git.svg" },
					{ name: "GitHub", logo: "src/img/tools/github.svg" },
					{ name: "Vercel", logo: "src/img/tools/vercel.svg" },
					{ name: "Canva", logo: "src/img/tools/canva.svg" },
					{ name: "Capcut", logo: "src/img/tools/capcut.svg" },
				],
				portfolios: [
					{ name: "Docs Club Taekwondo", desc: "Create a Taekwondo Club application guide website", foto: "src/img/porto/porto8.png" },
					{ name: "Portfolio V2", desc: "Personal portfolio website V2", foto: "src/img/porto/porto1.png" },
					{ name: "Company Profile CV. Access Media", desc: "Create a company profile website", foto: "src/img/porto/porto2.png" },
					{ name: "Landing Page PPDB", desc: "Landing page website PPDB SMK Al-Khoeriyah", foto: "src/img/porto/porto3.png" },
					{ name: "Landing Page RPL", desc: "Landing page website RPL SMK Al-Khoeriyah", foto: "src/img/porto/porto4.png" },
					{ name: "UI Design Digilib", desc: "UI Design Digital Library SMK Al-Khoeriyah", foto: "src/img/porto/porto5.png" },
					{ name: "Portfolio V1", desc: "Personal portfolio website V1", foto: "src/img/porto/porto6.png" },
					{ name: "Calculator", desc: "Simple calculator", foto: "src/img/porto/porto7.png" },
				],
				experiences_work: [{ title: "CV. Access Media", type: "Internship", year: "2025-2026", logo: "src/img/work/acm.png", desc: "During my four-month internship program, I was directly involved in various projects. Through this experience, I developed my technical skills, enhanced my teamwork skills, and gained a deeper understanding of the professional environment and demands of the industry. Here are some of the activities I undertook during my internship.", tasks: ["Presenting a company profile", "Learning Tailwind CSS", "Learning Laravel", "Learn SQL queries", "Creating a personal profile website", "Creating a company profile website","Create a Taekwondo Club application guide website"] }],
				experiences_org: [
					{ title: "OSIS SMK Al-Khoeriyah", type: "Head of Section IX (ICT)", year: "2024-2025", logo: "src/img/org/osis.png" },
					{ title: "Jurnalis SMK Al-Khoeriyah", type: "Editor", year: "2024-2025", logo: "src/img/org/jurnalis.png" },
					{ title: "TIK SMK Al-Khoeriyah", type: "Extracurricular Club Leader", year: "2024-2025", logo: "src/img/org/tik.png" },
					{ title: "OSIS SMK Al-Khoeriyah", type: "Member of Section IX (ICT)", year: "2023-2024", logo: "src/img/org/osis.png" },
				],
			},
			id: {
				educations: [
					{ name: "SMK Al-Khoeriyah", logo: "src/img/edu/smkak.png", year: "2023 - 2026" },
					{ name: "MTsN 1 Kota Tasikmalaya", logo: "src/img/edu/mtsn1.png", year: "2020 - 2023" },
					{ name: "SDN 1 Karangsambung", logo: "src/img/edu/sdn.png", year: "2014 - 2020" },
				],
				utils_skills: [
					{ name: "HTML", logo: "src/img/stack/html.svg" },
					{ name: "CSS", logo: "src/img/stack/css.svg" },
					{ name: "JavaScript", logo: "src/img/stack/javascript.svg" },
					{ name: "Bootstrap", logo: "src/img/stack/bootstrap.svg" },
					{ name: "Tailwind", logo: "src/img/stack/tailwind.svg" },
					{ name: "Laravel", logo: "src/img/stack/laravel.svg" },
					{ name: "MySQL", logo: "src/img/stack/mysql.svg" },
				],
				utils_tools: [
					{ name: "VS Code", logo: "src/img/tools/vscode.svg" },
					{ name: "Git", logo: "src/img/tools/git.svg" },
					{ name: "GitHub", logo: "src/img/tools/github.svg" },
					{ name: "Vercel", logo: "src/img/tools/vercel.svg" },
					{ name: "Canva", logo: "src/img/tools/canva.svg" },
					{ name: "Capcut", logo: "src/img/tools/capcut.svg" },
				],
				portfolios: [
					{ name: "Docs Club Taekwondo", desc: "Membuat website panduan aplikasi Club Taekwondo", foto: "src/img/porto/porto8.png" },
					{ name: "Portfolio V2", desc: "Website portofolio pribadi V2", foto: "src/img/porto/porto1.png" },
					{ name: "Profil Perusahaan CV. Access Media", desc: "Membuat website profil perusahaan", foto: "src/img/porto/porto2.png" },
					{ name: "Landing Page PPDB", desc: "Landing page website PPDB SMK Al-Khoeriyah", foto: "src/img/porto/porto3.png" },
					{ name: "Landing Page RPL", desc: "Landing page website RPL SMK Al-Khoeriyah", foto: "src/img/porto/porto4.png" },
					{ name: "Desain UI Digilib", desc: "Desain UI Digital Library SMK Al-Khoeriyah", foto: "src/img/porto/porto5.png" },
					{ name: "Portfolio V1", desc: "Website portofolio pribadi V1", foto: "src/img/porto/porto6.png" },
					{ name: "Kalkulator", desc: "Kalkulator sederhana", foto: "src/img/porto/porto7.png" },
				],
				experiences_work: [{ title: "CV. Access Media", type: "Praktik Kerja Lapangan", year: "2025-2026", logo: "src/img/work/acm.png", desc: "Selama mengikuti program Praktik Kerja Lapangan dalam waktu 4 bulan, saya terlibat langsung dalam berbagai proyek. Melalui pengalaman ini, saya mampu mengembangkan keterampilan teknis, meningkatkan kemampuan kerja sama tim, serta memperoleh pemahaman yang lebih mendalam mengenai lingkungan dan tuntutan profesional di dunia industri. Berikut beberapa kegiatan yang saya lakukan selama Praktik Kerja Lapangan.", tasks: ["Mempresentasikan profil perusahaan", "Mempelajari Tailwind CSS", "Mempelajari Laravel", "Mempelajari kueri SQL", "Membuat website profil pribadi", "Membuat website profil perusahaan", "Membuat website panduan aplikasi Club Taekwondo"] }],
				experiences_org: [
					{ title: "OSIS SMK Al-Khoeriyah", type: "Ketua Sekbid IX (TIK)", year: "2024-2025", logo: "src/img/org/osis.png" },
					{ title: "Jurnalis SMK Al-Khoeriyah", type: "Editor", year: "2024-2025", logo: "src/img/org/jurnalis.png" },
					{ title: "TIK SMK Al-Khoeriyah", type: "Ketua Ekstrakurikuler", year: "2024-2025", logo: "src/img/org/tik.png" },
					{ title: "OSIS SMK Al-Khoeriyah", type: "Anggota Sekbid IX (TIK)", year: "2023-2024", logo: "src/img/org/osis.png" },
				],
			},
		},
		get activeData() {
			return this.data[this.current];
		},
	});

	// Initialize Lang Icon
	updateLangIcon();
});

// Lang Toggle Listener
document.addEventListener("DOMContentLoaded", () => {
	const langToggle = document.getElementById("lang-toggle");
	if (langToggle) {
		langToggle.addEventListener("click", () => {
			// Note: We use Alpine.store directly, but the click handling is easier via Alpine @click in HTML.
			// However, to keep consistency with the dark mode implementation:
			Alpine.store("lang").toggle();
		});
	}
});

function updateLangIcon() {
	const langToggle = document.getElementById("lang-toggle");
	if (!langToggle) return;
	const langIcon = langToggle.querySelector("#bahasa");
	const current = localStorage.getItem("lang") || "en";

	// Add rotation/scale effect
	langIcon.style.transform = "scale(0)";

	setTimeout(() => {
		if (current === "id") {
			langIcon.innerHTML = "EN";
		} else {
			langIcon.innerHTML = "ID";
		}
		// Reset transform
		langIcon.style.transform = "scale(1)";
	}, 200);
}
