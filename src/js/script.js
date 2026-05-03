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
				exp_tab3: "Awards",
				award_empty: "Add awards or certificates here when you're ready to showcase them.",
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
				exp_tab3: "Prestasi",
				// award_empty: "Tambahkan award atau sertifikat di sini saat sudah siap ditampilkan.",
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
					{ name: "Laravel", logo: "src/img/stack/laravel.svg" },
					{ name: "Tailwind", logo: "src/img/stack/tailwind.svg" },
					{ name: "Alpine.JS", logo: "src/img/stack/alpinejs.svg" },
					{ name: "MySQL", logo: "src/img/stack/mysql.svg" },
					{ name: "Bootstrap", logo: "src/img/stack/bootstrap.svg" },
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
					{ name: "Laporin!", desc: "Create a school facility complaint system", foto: "src/img/porto/porto9.png" },
					{ name: "Docs Club Taekwondo", desc: "Create a Taekwondo Club application guide website", foto: "src/img/porto/porto8.png" },
					{ name: "Portfolio V2", desc: "Personal portfolio website V2", foto: "src/img/porto/porto1.png" },
					{ name: "Company Profile CV. Access Media", desc: "Create a company profile website", foto: "src/img/porto/porto2.png" },
					{ name: "Landing Page PPDB", desc: "Landing page website PPDB SMK Al-Khoeriyah", foto: "src/img/porto/porto3.png" },
					{ name: "Landing Page RPL", desc: "Landing page website RPL SMK Al-Khoeriyah", foto: "src/img/porto/porto4.png" },
					{ name: "UI Design Digilib", desc: "UI Design Digital Library SMK Al-Khoeriyah", foto: "src/img/porto/porto5.png" },
					{ name: "Portfolio V1", desc: "Personal portfolio website V1", foto: "src/img/porto/porto6.png" },
				],
				experiences_work: [{ title: "CV. Access Media", type: "Internship", year: "2025-2026", logo: "src/img/work/acm.png", desc: "During my four-month internship program, I was directly involved in various projects. Through this experience, I developed my technical skills, enhanced my teamwork skills, and gained a deeper understanding of the professional environment and demands of the industry. Here are some of the activities I undertook during my internship.", tasks: ["Presenting a company profile", "Learning Tailwind CSS", "Learning Laravel", "Learn SQL queries", "Creating a personal profile website", "Creating a company profile website","Create a Taekwondo Club application guide website"] }],
				experiences_org: [
					{ title: "OSIS SMK Al-Khoeriyah", type: "Head of Section IX (ICT)", year: "2024-2025", logo: "src/img/org/osis.png" },
					{ title: "Jurnalis SMK Al-Khoeriyah", type: "Editor", year: "2024-2025", logo: "src/img/org/jurnalis.png" },
					{ title: "TIK SMK Al-Khoeriyah", type: "Extracurricular Club Leader", year: "2024-2025", logo: "src/img/org/tik.png" },
					{ title: "OSIS SMK Al-Khoeriyah", type: "Member of Section IX (ICT)", year: "2023-2024", logo: "src/img/org/osis.png" },
				],
				experiences_award: [],
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
					{ name: "Laravel", logo: "src/img/stack/laravel.svg" },
					{ name: "Tailwind", logo: "src/img/stack/tailwind.svg" },
					{ name: "Alpine.JS", logo: "src/img/stack/alpinejs.svg" },
					{ name: "MySQL", logo: "src/img/stack/mysql.svg" },
					{ name: "Bootstrap", logo: "src/img/stack/bootstrap.svg" },
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
					{ name: "Laporin!", desc: "Membuat sistem pengaduan sarana sekolah", foto: "src/img/porto/porto9.png" },
					{ name: "Docs Club Taekwondo", desc: "Membuat website panduan aplikasi Club Taekwondo", foto: "src/img/porto/porto8.png" },
					{ name: "Portfolio V2", desc: "Website portofolio pribadi V2", foto: "src/img/porto/porto1.png" },
					{ name: "Profil Perusahaan CV. Access Media", desc: "Membuat website profil perusahaan", foto: "src/img/porto/porto2.png" },
					{ name: "Landing Page PPDB", desc: "Landing page website PPDB SMK Al-Khoeriyah", foto: "src/img/porto/porto3.png" },
					{ name: "Landing Page RPL", desc: "Landing page website RPL SMK Al-Khoeriyah", foto: "src/img/porto/porto4.png" },
					{ name: "Desain UI Digilib", desc: "Desain UI Digital Library SMK Al-Khoeriyah", foto: "src/img/porto/porto5.png" },
					{ name: "Portfolio V1", desc: "Website portofolio pribadi V1", foto: "src/img/porto/porto6.png" },
				],
				experiences_work: [{ title: "CV. Access Media", type: "Praktik Kerja Lapangan", year: "2025-2026", logo: "src/img/work/acm.png", desc: "Selama mengikuti program Praktik Kerja Lapangan dalam waktu 4 bulan, saya terlibat langsung dalam berbagai proyek. Melalui pengalaman ini, saya mampu mengembangkan keterampilan teknis, meningkatkan kemampuan kerja sama tim, serta memperoleh pemahaman yang lebih mendalam mengenai lingkungan dan tuntutan profesional di dunia industri. Berikut beberapa kegiatan yang saya lakukan selama Praktik Kerja Lapangan.", tasks: ["Mempresentasikan profil perusahaan", "Mempelajari Tailwind CSS", "Mempelajari Laravel", "Mempelajari kueri SQL", "Membuat website profil pribadi", "Membuat website profil perusahaan", "Membuat website panduan aplikasi Club Taekwondo"] }],
				experiences_org: [
					{ title: "OSIS SMK Al-Khoeriyah", type: "Ketua Sekbid IX (TIK)", year: "2024-2025", logo: "src/img/org/osis.png" },
					{ title: "Jurnalis SMK Al-Khoeriyah", type: "Editor", year: "2024-2025", logo: "src/img/org/jurnalis.png" },
					{ title: "TIK SMK Al-Khoeriyah", type: "Ketua Ekstrakurikuler", year: "2024-2025", logo: "src/img/org/tik.png" },
					{ title: "OSIS SMK Al-Khoeriyah", type: "Anggota Sekbid IX (TIK)", year: "2023-2024", logo: "src/img/org/osis.png" },
				],
				experiences_award: [],
			},
		},
		projectInsights: {
			en: {
				"Laporin!": {
					overview: "A school facility complaint system that turns scattered reports into a simple digital workflow for students and staff.",
					focus: "Fast reporting, clear categorization, and a clean flow that keeps the complaint process short and easy to understand.",
					impact: "Helps the school track issues more consistently and makes follow-up easier for everyone involved.",
					highlights: ["Complaint submission flow", "Structured issue handling", "Student-friendly interface"],
					themes: ["Workflow design", "Service dashboard", "Simple reporting"],
				},
				"Docs Club Taekwondo": {
					overview: "A documentation and guidance website for a Taekwondo club application, built to help members understand the system faster.",
					focus: "Clear information hierarchy, practical guidance, and a tidy presentation of club features and usage notes.",
					impact: "Makes onboarding easier by combining instructions and club documentation in one place.",
					highlights: ["Guided documentation", "Readable content structure", "Member onboarding support"],
					themes: ["Guide content", "Information design", "Responsive layout"],
				},
				"Portfolio V2": {
					overview: "A personal portfolio rebuild focused on a cleaner presentation and a stronger visual identity.",
					focus: "Sharper hierarchy, smoother browsing, and section spacing that makes projects easier to scan.",
					impact: "Shows projects and skills with a more polished personal brand and a clearer storytelling flow.",
					highlights: ["Modern personal branding", "Structured portfolio sections", "Responsive showcase layout"],
					themes: ["Personal brand", "Gallery cards", "Portfolio story"],
				},
				"Company Profile CV. Access Media": {
					overview: "A company profile website created to present business identity, services, and credibility in a professional way.",
					focus: "Trust-building visuals, concise messaging, and a layout that explains the company quickly.",
					impact: "Helps the business present itself more clearly to potential clients or partners.",
					highlights: ["Professional introduction", "Service presentation", "Business credibility"],
					themes: ["Corporate profile", "Service cards", "Professional layout"],
				},
				"Landing Page PPDB": {
					overview: "A recruitment landing page designed to introduce admissions information and guide prospective students to take action.",
					focus: "Attention-grabbing hero sections, clear CTAs, and concise blocks that explain the school quickly.",
					impact: "Supports school promotion by turning key admission details into a clear conversion path.",
					highlights: ["Admissions promotion", "CTA-driven structure", "Mobile-friendly landing page"],
					themes: ["Landing page", "Promotion", "Action flow"],
				},
				"Landing Page RPL": {
					overview: "A landing page for the RPL major that presents the program in a simple, persuasive format.",
					focus: "Program highlights, visual rhythm, and a layout that is easy to scan on every screen size.",
					impact: "Helps prospective students understand the RPL major faster and more confidently.",
					highlights: ["Major overview", "Informative sections", "Clear program positioning"],
					themes: ["Educational landing page", "Program overview", "Responsive sections"],
				},
				"UI Design Digilib": {
					overview: "A UI concept for a digital library that explores a cleaner reading and catalog browsing experience.",
					focus: "Navigation clarity, reading comfort, and a visual system suited for digital content.",
					impact: "Provides a design direction for a more organized and pleasant digital library experience.",
					highlights: ["Library interface concept", "Readable layouts", "Catalog browsing flow"],
					themes: ["UI concept", "Digital library", "Information architecture"],
				},
				"Portfolio V1": {
					overview: "The first version of the personal portfolio, created as an early foundation for the developer brand.",
					focus: "Basic self-introduction, project showcase, and an initial responsive structure.",
					impact: "Served as the starting point for later iterations and design improvements.",
					highlights: ["First portfolio version", "Early responsive practice", "Foundational personal brand"],
					themes: ["Portfolio basics", "Introduction page", "Responsive practice"],
				},
				"Calculator": {
					overview: "A lightweight calculator built for quick arithmetic tasks with a straightforward interface.",
					focus: "Fast input, clear result display, and minimal interaction overhead.",
					impact: "Shows practical logic handling in a compact UI.",
					highlights: ["Arithmetic interaction", "Clean output display", "Minimal UI"],
					themes: ["Logic demo", "Utility app", "Simple controls"],
				},
			},
			id: {
				"Laporin!": {
					overview: "Sistem pengaduan sarana sekolah yang mengubah laporan yang tercecer menjadi alur digital yang lebih rapi untuk siswa dan guru.",
					focus: "Pelaporan cepat, kategori yang jelas, dan alur yang singkat agar proses pengaduan mudah dipahami.",
					impact: "Membantu sekolah memantau masalah secara lebih teratur dan memudahkan tindak lanjut.",
					highlights: ["Alur pengajuan pengaduan", "Penanganan masalah terstruktur", "Antarmuka ramah siswa"],
					themes: ["Desain alur", "Dashboard layanan", "Pelaporan sederhana"],
				},
				"Docs Club Taekwondo": {
					overview: "Website dokumentasi dan panduan untuk aplikasi Club Taekwondo yang dibuat agar anggota lebih cepat memahami sistemnya.",
					focus: "Hierarki informasi yang jelas, panduan praktis, dan penyajian fitur klub yang rapi.",
					impact: "Membuat proses onboarding lebih mudah karena instruksi dan dokumentasi terkumpul di satu tempat.",
					highlights: ["Dokumentasi terpandu", "Struktur konten mudah dibaca", "Dukungan onboarding anggota"],
					themes: ["Konten panduan", "Desain informasi", "Layout responsif"],
				},
				"Portfolio V2": {
					overview: "Pembaruan portofolio pribadi yang fokus pada tampilan lebih bersih dan identitas visual yang lebih kuat.",
					focus: "Hierarki yang lebih jelas, navigasi yang lebih halus, dan jarak antarbagian yang lebih nyaman dibaca.",
					impact: "Menampilkan proyek dan keahlian dengan personal brand yang lebih rapi dan alur cerita yang lebih kuat.",
					highlights: ["Branding pribadi modern", "Bagian portofolio terstruktur", "Layout showcase responsif"],
					themes: ["Brand pribadi", "Kartu galeri", "Cerita portofolio"],
				},
				"Profil Perusahaan CV. Access Media": {
					overview: "Website profil perusahaan yang dibuat untuk menampilkan identitas bisnis, layanan, dan kredibilitas secara profesional.",
					focus: "Visual yang membangun kepercayaan, pesan yang ringkas, dan layout yang membantu perusahaan dipahami dengan cepat.",
					impact: "Membantu bisnis memperkenalkan diri dengan lebih jelas kepada calon klien atau mitra.",
					highlights: ["Pengenalan profesional", "Presentasi layanan", "Kredibilitas bisnis"],
					themes: ["Profil korporat", "Kartu layanan", "Layout profesional"],
				},
				"Landing Page PPDB": {
					overview: "Landing page untuk promosi PPDB yang dirancang untuk memperkenalkan informasi penerimaan dan mendorong calon siswa mengambil aksi.",
					focus: "Hero yang menarik, CTA yang jelas, dan blok informasi singkat yang memudahkan calon siswa memahami sekolah.",
					impact: "Mendukung promosi sekolah dengan mengubah detail penting PPDB menjadi jalur aksi yang jelas.",
					highlights: ["Promosi penerimaan", "Struktur berbasis CTA", "Landing page ramah mobile"],
					themes: ["Landing page", "Promosi", "Alur aksi"],
				},
				"Landing Page RPL": {
					overview: "Landing page untuk jurusan RPL yang menyajikan program secara sederhana dan persuasif.",
					focus: "Sorotan program, ritme visual, dan layout yang mudah dipindai di berbagai ukuran layar.",
					impact: "Membantu calon siswa memahami jurusan RPL dengan lebih cepat dan percaya diri.",
					highlights: ["Gambaran jurusan", "Bagian informatif", "Posisi program yang jelas"],
					themes: ["Landing page edukasi", "Ikhtisar program", "Bagian responsif"],
				},
				"Desain UI Digilib": {
					overview: "Konsep UI untuk perpustakaan digital yang mengeksplorasi pengalaman membaca dan menjelajah katalog yang lebih rapi.",
					focus: "Kejelasan navigasi, kenyamanan membaca, dan sistem visual yang cocok untuk konten digital.",
					impact: "Memberikan arah desain untuk pengalaman perpustakaan digital yang lebih tertata dan nyaman.",
					highlights: ["Konsep antarmuka library", "Layout yang mudah dibaca", "Alur browsing katalog"],
					themes: ["Konsep UI", "Perpustakaan digital", "Arsitektur informasi"],
				},
				"Portfolio V1": {
					overview: "Versi pertama portofolio pribadi yang menjadi pondasi awal untuk membangun personal brand developer.",
					focus: "Perkenalan diri, showcase proyek, dan struktur responsif yang masih sederhana.",
					impact: "Menjadi titik awal untuk iterasi berikutnya dan peningkatan desain di versi selanjutnya.",
					highlights: ["Versi awal portofolio", "Latihan responsif dasar", "Fondasi brand pribadi"],
					themes: ["Dasar portofolio", "Halaman perkenalan", "Latihan responsif"],
				},
				"Kalkulator": {
					overview: "Kalkulator ringan untuk kebutuhan aritmetika cepat dengan antarmuka yang sederhana.",
					focus: "Input yang cepat, tampilan hasil yang jelas, dan interaksi yang minimal.",
					impact: "Menunjukkan pengolahan logika praktis dalam UI yang ringkas.",
					highlights: ["Interaksi aritmetika", "Tampilan hasil bersih", "UI minimal"],
					themes: ["Demo logika", "Aplikasi utilitas", "Kontrol sederhana"],
				},
			},
		},
		projectDetails(name) {
			const details = this.projectInsights[this.current][name];

			return (
				details || {
					overview: this.current === "id" ? "Detail proyek belum ditambahkan." : "Project details are not available yet.",
					focus: this.current === "id" ? "Fokus utama belum ditentukan." : "Main focus is not defined yet.",
					impact: this.current === "id" ? "Dampak proyek akan ditampilkan di sini." : "Project impact will appear here.",
					highlights: [],
					themes: [],
				}
			);
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
