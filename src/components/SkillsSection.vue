<template>
	<section id="skills" ref="sectionRef">
		<div class="bg-grid dark:[--color-primary:var(--color-dark)] transition-colors duration-500">
			<div class="py-20 px-4 sm:px-10 lg:px-20 flex flex-col items-center gap-6 overflow-hidden">
				<h1 class="skills-title text-3xl md:text-5xl font-medium font-instrument-serif italic">
					{{ t('skills_title') }}
				</h1>

				<!-- Tab Switcher -->
				<div
					class="skills-tabs relative grid grid-cols-2 backdrop-blur-xs bg-hvPrimary/50 dark:bg-neutral-800/50 shadow-xl border border-primary/70 dark:border-secondary/20 text-sm p-1 rounded-2xl w-[270px]"
				>
					<div
						class="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-secondary/50 rounded-xl transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
						:class="activeTab === 'tab1' ? 'translate-x-0' : 'translate-x-full'"
					></div>

					<button
						type="button"
						@click="activeTab = 'tab1'"
						class="relative z-10 h-10 rounded-xl font-medium transition-colors duration-200 cursor-pointer"
						:class="activeTab === 'tab1' ? 'text-secondary font-bold' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'"
					>
						{{ t('skills_tab1') }}
					</button>

					<button
						type="button"
						@click="activeTab = 'tab2'"
						class="relative z-10 h-10 rounded-xl font-medium transition-colors duration-200 cursor-pointer"
						:class="activeTab === 'tab2' ? 'text-secondary font-bold' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'"
					>
						{{ t('skills_tab2') }}
					</button>
				</div>

				<!-- Horizontal Logo Loop (Marquee) -->
				<div class="w-full flex justify-center my-4 overflow-hidden min-h-[170px]">
					<Transition name="tab-content" mode="out-in">
						<!-- Tech Stack Marquee Loop -->
						<div
							v-if="activeTab === 'tab1'"
							key="tab1"
							class="marquee-container w-full max-w-7xl overflow-hidden py-4 select-none relative"
						>
							<div class="marquee-track flex w-max animate-marquee-left">
								<!-- First Track Half -->
								<div class="flex items-center gap-6 pr-6 shrink-0">
									<div
										v-for="(skill, index) in skillsLoop"
										:key="'skill-1-' + index"
										class="group relative bg-hvPrimary w-32 h-32 gap-2 shadow-xl border border-black dark:border-white shadow-secondary/20 dark:shadow-black/20 flex flex-col justify-center items-center cursor-pointer lg:grayscale-100 lg:hover:scale-[1.05] lg:hover:grayscale-0 transition-all duration-300 shrink-0"
									>
										<div class="corner-square lg:hidden lg:group-hover:flex absolute -top-1.5 -right-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
										<div class="corner-square lg:hidden lg:group-hover:flex absolute -top-1.5 -left-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
										<div class="corner-square lg:hidden lg:group-hover:flex absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
										<div class="corner-square lg:hidden lg:group-hover:flex absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
										<img :src="resolveAsset(skill.logo)" :alt="skill.name + ' Logo'" class="h-15 w-15 object-contain pointer-events-none" />
										
									</div>
								</div>
							</div>
						</div>

						<!-- Tools Marquee Loop -->
						<div
							v-else-if="activeTab === 'tab2'"
							key="tab2"
							class="marquee-container w-full max-w-7xl overflow-hidden py-4 select-none relative"
						>
							<div class="marquee-track flex w-max animate-marquee-right">
								<!-- First Track Half -->
								<div class="flex items-center gap-6 pr-6 shrink-0">
									<div
										v-for="(tool, index) in toolsLoop"
										:key="'tool-1-' + index"
										class="group relative bg-hvPrimary w-32 h-32 gap-2 border border-black dark:border-white shadow-xl shadow-secondary/20 dark:shadow-black/20 flex flex-col justify-center items-center cursor-pointer lg:grayscale-100 lg:hover:scale-[1.05] lg:hover:grayscale-0 transition-all duration-300 shrink-0"
									>
										<div class="corner-square lg:hidden lg:group-hover:flex absolute -top-1.5 -right-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
										<div class="corner-square lg:hidden lg:group-hover:flex absolute -top-1.5 -left-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
										<div class="corner-square lg:hidden lg:group-hover:flex absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
										<div class="corner-square lg:hidden lg:group-hover:flex absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
										<img :src="resolveAsset(tool.logo)" :alt="tool.name + ' Logo'" class="h-15 w-15 object-contain pointer-events-none" />
										
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../composables/useLanguage";
import { resolveAsset } from "../utils/assets";

const { t, activeData } = useLanguage();
const activeTab = ref("tab1");
const sectionRef = ref(null);
let ctx = null;

const skillsLoop = computed(() => {
	const list = activeData.value?.utils_skills || [];
	return [...list, ...list];
});

const toolsLoop = computed(() => {
	const list = activeData.value?.utils_tools || [];
	return [...list, ...list];
});

onMounted(() => {
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReducedMotion || !sectionRef.value) return;

	ctx = gsap.context(() => {
		gsap.from(".skills-title", {
			scrollTrigger: {
				trigger: ".skills-title",
				start: "top 88%",
				toggleActions: "play none none reverse",
			},
			y: -25,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out",
		});

		gsap.from(".skills-tabs", {
			scrollTrigger: {
				trigger: ".skills-tabs",
				start: "top 88%",
				toggleActions: "play none none reverse",
			},
			scale: 0.85,
			opacity: 0,
			duration: 0.6,
			ease: "back.out(1.6)",
		});
	}, sectionRef.value);
});

onUnmounted(() => {
	if (ctx) ctx.revert();
});
</script>

<style scoped>
.marquee-container {
	mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
	-webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
}

.animate-marquee-left {
	animation: marquee-left 28s linear infinite;
}

.animate-marquee-right {
	animation: marquee-right 24s linear infinite;
}

.marquee-container:hover .marquee-track,
.marquee-container:focus-within .marquee-track {
	animation-play-state: paused;
}

@keyframes marquee-left {
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(-50%, 0, 0);
	}
}

@keyframes marquee-right {
	0% {
		transform: translate3d(-50%, 0, 0);
	}
	100% {
		transform: translate3d(0, 0, 0);
	}
}

@media (prefers-reduced-motion: reduce) {
	.animate-marquee-left,
	.animate-marquee-right {
		animation: none !important;
	}
	.marquee-container {
		overflow-x: auto;
		mask-image: none;
		-webkit-mask-image: none;
	}
}

.tab-content-enter-active,
.tab-content-leave-active {
	transition: opacity 0.25s ease, transform 0.25s ease;
}
.tab-content-enter-from {
	opacity: 0;
	transform: scale(0.98);
}
.tab-content-leave-to {
	opacity: 0;
	transform: scale(0.98);
}
</style>
