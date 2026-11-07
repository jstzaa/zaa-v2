const imageModules = import.meta.glob("../img/**/*.{webp,png,svg,jpg,jpeg}", { eager: true, import: "default" });
const videoModules = import.meta.glob("../vid/**/*.{webm,mp4}", { eager: true, import: "default" });

export function resolveAsset(path) {
	if (!path) return "";
	if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
		return path;
	}

	const clean = path.replace(/^(\.\/|\/)/, "");
	// Format is often "src/img/..." or "src/vid/..."
	if (clean.startsWith("src/img/")) {
		const rel = "../img/" + clean.slice(8);
		if (imageModules[rel]) return imageModules[rel];
	} else if (clean.startsWith("src/vid/")) {
		const rel = "../vid/" + clean.slice(8);
		if (videoModules[rel]) return videoModules[rel];
	}

	// Fallback to absolute public path
	return "/" + clean;
}
