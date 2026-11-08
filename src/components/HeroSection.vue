<template>
	<section id="home">
		<div class="relative w-full min-h-screen overflow-hidden dark:[--color-primary:var(--color-dark)] transition-colors duration-500">
			<div class="absolute inset-0 z-0">
				<CRTWarp
					color="#3B82F6"
					:backgroundColor="isDark ? '#000000' : '#f6f6f6'"
					:speed="0.2"
					:curvature="0.25"
					:scanlineStrength="0.25"
					:scanlineFrequency="200"
					:waveAmplitude="0.3"
					:waveFrequency="2.5"
					:bloom="1.5"
					:bloomRadius="1"
					:noise="0.1"
					:vignette="0"
					:brightness="1.25"
					:pixelation="1"
					:rgbShift="0.015"
					mouseReact
					:mouseStrength="0.5"
					:dpr="1"
					:fps="30"
				/>
			</div>

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
					<span ref="typedEl" class="text-2xl md:text-3xl font-geist-pixel" translate="no"></span>
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
					<GlassSurface
						as="a"
						:displace="0.5"
						:distortion-scale="-100"
						:red-offset="0"
						:green-offset="10"
						:blue-offset="20"
						:brightness="50"
						:opacity="0.93"
						:width="200"
						:height="50"
						:border-radius="30"
						mix-blend-mode="screen"
						href="https://drive.google.com/uc?export=download&id=1wluovSh9J_fcF8Sa35e0HbDC8XVaGgzO"
						class="flex justify-center items-center font-geist-pixel gap-2 px-10 py-2 bg-transparent rounded-full backdrop-blur-sm border border-white/20 cursor-pointer hover:bg-secondary hover:text-primary transition-all duration-300"
					>
						Download CV
					</GlassSurface>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Typed from "typed.js";
import GlassSurface from "./GlassSurface.vue";
import CRTWarp from "./CRTWarp.vue";
import { useLanguage } from "../composables/useLanguage";
import { useTheme } from "../composables/useTheme";
import { resolveAsset } from "../utils/assets";

const { t } = useLanguage();
const { isDark } = useTheme();
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
