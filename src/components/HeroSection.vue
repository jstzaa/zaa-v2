<template>
	<section id="home">
		<div class="bg-home relative w-full min-h-screen overflow-hidden dark:[--color-primary:var(--color-dark)] transition-colors duration-500">
			<!-- Video Background -->
			<video autoplay muted loop playsinline class="video-bg opacity-0 dark:opacity-100 transition-opacity">
				<source :src="resolveAsset('src/vid/bg-hero-dark.webm')" type="video/webm" />
			</video>
			<video autoplay muted loop playsinline class="video-bg opacity-100 dark:opacity-0 transition-opacity">
				<source :src="resolveAsset('src/vid/bg-hero-light.webm')" type="video/webm" />
			</video>

			<!-- Konten Website -->
			<div class="relative z-10 flex flex-col items-center pt-32 px-4">
				<div class="w-56 h-56 rounded-full border-8 border-secondary shadow-lg shadow-dark/50" data-aos="fade-down" data-aos-delay="50">
					<img :src="resolveAsset('src/img/profile.webp')" alt="Profile Picture" class="rounded-full object-cover w-full h-full" />
				</div>
				<h1 class="text-center font-medium font-instrument-serif italic text-3xl md:text-4xl mt-5" data-aos="fade-down" data-aos-delay="150">
					<span>{{ t('hero_hi') }}</span><br />
					<span>{{ t('hero_intro') }}</span>
				</h1>
				<div class="h-full my-3" data-aos="fade-down" data-aos-delay="200">
					<span ref="typedEl" class="text-2xl md:text-3xl" translate="no"></span>
				</div>
				<div class="flex flex-col lg:flex-row items-center gap-3 lg:gap-5" data-aos="fade-down" data-aos-delay="250">
					<div class="flex flex-row items-center gap-2 text-5xl">
						<a href="https://www.instagram.com/jstzaa28" target="_blank" rel="noopener noreferrer">
							<i class="fa-brands fa-instagram hover:scale-105 transition-all duration-300"></i>
						</a>
						<a href="https://github.com/jstzaa" target="_blank" rel="noopener noreferrer">
							<i class="fa-brands fa-github hover:scale-105 transition-all duration-300"></i>
						</a>
						<a href="https://www.linkedin.com/in/fahriza-kurniawan/" target="_blank" rel="noopener noreferrer">
							<i class="fa-brands fa-linkedin hover:scale-105 transition-all duration-300"></i>
						</a>
					</div>
					<LiquidGlass
						as="a"
						:border-radius="24"
						:border-width="0.05"
						:brightness="75"
						:opacity="0.95"
						:blur="100"
						:displace="0.4"
						:background-opacity="0.25"
						:saturation="1.2"
						:distortion-scale="0.4"
						:red-offset="0"
						:green-offset="10"
						:blue-offset="5"
						x-channel="R"
						y-channel="G"
						mix-blend-mode="difference"
						href="https://drive.google.com/uc?export=download&id=1wluovSh9J_fcF8Sa35e0HbDC8XVaGgzO"
						class="flex items-center gap-2 px-10 py-2 bg-transparent rounded-full backdrop-blur-sm border border-white/20 cursor-pointer hover:bg-secondary hover:text-primary transition-all duration-300"
					>
						Download CV
					</LiquidGlass>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Typed from "typed.js";
import LiquidGlass from "./LiquidGlass.vue";
import { useLanguage } from "../composables/useLanguage";
import { resolveAsset } from "../utils/assets";

const { t } = useLanguage();
const typedEl = ref(null);
let typedInstance = null;

onMounted(() => {
	if (typedEl.value) {
		typedInstance = new Typed(typedEl.value, {
			strings: ["Web Developer", "Tech Enthusiast"],
			typeSpeed: 100,
			startDelay: 800,
			backSpeed: 100,
			smartBackspace: true,
			backDelay: 100,
			loop: true,
			loopCount: Infinity,
		});
	}
});

onUnmounted(() => {
	if (typedInstance) {
		typedInstance.destroy();
	}
});
</script>
