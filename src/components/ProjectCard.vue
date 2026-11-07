<template>
	<div
		ref="cardRef"
		role="button"
		tabindex="0"
		@click="emit('open', portfolio)"
		@keydown.enter.prevent="emit('open', portfolio)"
		@keydown.space.prevent="emit('open', portfolio)"
		class="sticky w-full h-[420px] md:h-[400px] rounded-2xl bg-primary dark:bg-hvPrimary border border-secondary/20 dark:shadow-black/40 overflow-hidden cursor-pointer group flex flex-col md:flex-row transition-transform duration-100 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
		:style="{
			top: `${112 + index * 12}px`,
			zIndex: 10 + index,
			transform: `scale(${scale})`,
		}"
	>
		<!-- Right Column: Image -->
		<div class="w-full md:w-[45%] h-40 md:h-full relative overflow-hidden flex-shrink-0">
			<img
				class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
				:src="resolveAsset(portfolio.foto)"
				:alt="portfolio.name"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
		</div>

		<!-- Left Column: Details -->
		<div class="flex-1 p-6 md:p-10 flex flex-col justify-between overflow-hidden">
			<div>
				<div class="flex justify-between items-center mb-3">
					<span class="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
						{{ `0${index + 1} / PROJECT` }}
					</span>
				</div>
				<h2 class="text-xl md:text-3xl font-medium font-instrument-serif italic text-secondary truncate">
					{{ portfolio.name }}
				</h2>
				<p class="text-xs md:text-base text-neutral-600 dark:text-gray-300 mt-3 line-clamp-2 md:line-clamp-none leading-relaxed">
					{{ portfolio.desc }}
				</p>
			</div>
			<div class="mt-4 flex items-center text-sm font-semibold text-secondary gap-2">
				<span>{{ currentLang === 'id' ? 'Lihat Detail Proyek' : 'View Project Details' }}</span>
				<i class="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1.5"></i>
			</div>
		</div>

	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { resolveAsset } from "../utils/assets";

const props = defineProps({
	portfolio: {
		type: Object,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits(["open"]);

const { currentLang } = useLanguage();
const cardRef = ref(null);
const scale = ref(1);

function updateScale() {
	if (!cardRef.value) return;
	const rect = cardRef.value.getBoundingClientRect();
	const stickyTop = 112 + props.index * 12;
	const range = 300;
	const maxScale = 1.02;
	const distance = rect.top - stickyTop;
	const progress = 1 - Math.min(Math.max(distance / range, 0), 1);
	scale.value = 1 + (maxScale - 1) * progress;
}

onMounted(() => {
	window.addEventListener("scroll", updateScale, { passive: true });
	window.addEventListener("resize", updateScale, { passive: true });
	updateScale();
});

onUnmounted(() => {
	window.removeEventListener("scroll", updateScale);
	window.removeEventListener("resize", updateScale);
});
</script>
