<template>
	<div
		v-if="!isDone"
		ref="preloaderRef"
		class="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-12 bg-black text-[#f6f6f6] select-none pointer-events-auto"
	>
		<!-- Top Bar: Status / Counter -->
		<div class="flex items-center justify-between text-xs font-geist-pixel tracking-widest text-neutral-500">
			<div class="flex items-center gap-2">
				<span>zaa-dev</span>
			</div>
			<span>{{ currentIndex + 1 }} / {{ greetings.length }}</span>
		</div>

		<!-- Center: Greeting Word Animation -->
		<div class="flex flex-col items-center justify-center my-auto">
			<div class="h-20 sm:h-28 flex items-center justify-center overflow-hidden">
				<Transition name="greeting-swap" mode="out-in">
					<h1
						:key="currentGreeting.text"
						class="text-4xl sm:text-6xl md:text-7xl font-medium font-instrument-serif italic text-center flex items-center gap-3 sm:gap-4 tracking-wide"
						:dir="currentGreeting.lang === 'ar' ? 'rtl' : 'ltr'"
					>
						<span>{{ currentGreeting.text }}</span>
					</h1>
				</Transition>
			</div>
			<p class="text-xs sm:text-sm font-geist-pixel uppercase tracking-[0.25em] text-neutral-400 mt-3 transition-opacity">
				{{ currentGreeting.country }}
			</p>
		</div>

		<!-- Bottom Bar: Branding -->
		<div class="flex items-center justify-between text-xs font-geist-pixel text-neutral-500">
			<span>PORTFOLIO</span>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const emit = defineEmits(["complete"]);

const greetings = [
	{ text: "Halo", lang: "id", country: "Indonesia" },
	{ text: "Hello", lang: "en", country: "English" },
	{ text: "Hola", lang: "es", country: "Spanish" },
	{ text: "こんにちは", lang: "ja", country: "Japanese" },
	{ text: "Hallo", lang: "de", country: "German" },
	{ text: "Bonjour", lang: "fr", country: "French" },
	{ text: "مرحباً", lang: "ar", country: "Arabic" },
	{ text: "Привет", lang: "ru", country: "Russian" },
];

const currentIndex = ref(0);
const isDone = ref(false);
const preloaderRef = ref(null);
let intervalId = null;

const currentGreeting = computed(() => greetings[currentIndex.value]);

function exitPreloader() {
	if (!preloaderRef.value) {
		isDone.value = true;
		document.body.style.overflow = "";
		emit("complete");
		ScrollTrigger.refresh();
		return;
	}

	gsap.to(preloaderRef.value, {
		yPercent: -100,
		duration: 0.85,
		ease: "power4.inOut",
		onComplete: () => {
			isDone.value = true;
			document.body.style.overflow = "";
			emit("complete");
			ScrollTrigger.refresh();
		},
	});
}

onMounted(() => {
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReducedMotion) {
		isDone.value = true;
		emit("complete");
		return;
	}

	document.body.style.overflow = "hidden";

	intervalId = setInterval(() => {
		if (currentIndex.value < greetings.length - 1) {
			currentIndex.value++;
		} else {
			clearInterval(intervalId);
			setTimeout(exitPreloader, 220);
		}
	}, 500);
});

onUnmounted(() => {
	if (intervalId) clearInterval(intervalId);
	document.body.style.overflow = "";
});
</script>

<style scoped>
.greeting-swap-enter-active,
.greeting-swap-leave-active {
	transition: opacity 0.12s cubic-bezier(0.25, 1, 0.5, 1), transform 0.12s cubic-bezier(0.25, 1, 0.5, 1);
}
.greeting-swap-enter-from {
	opacity: 0;
	transform: translateY(14px);
}
.greeting-swap-leave-to {
	opacity: 0;
	transform: translateY(-14px);
}
</style>
