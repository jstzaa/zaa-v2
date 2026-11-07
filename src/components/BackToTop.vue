<template>
	<div class="hidden lg:block fixed bottom-5 right-5 z-50">
		<Transition name="fade-slide">
			<button
				v-show="showTopButton"
				@click="scrollToTop"
				class="w-12 h-12 bg-hvPrimary/50 backdrop-blur-sm text-secondary rounded-full flex justify-center items-center shadow-lg transition-all duration-500 hover:scale-110 cursor-pointer border border-white/20"
				aria-label="Back to top"
			>
				<span class="material-symbols-outlined transition-transform duration-500">
					arrow_upward
				</span>
			</button>
		</Transition>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showTopButton = ref(false);

function checkScroll() {
	showTopButton.value = window.pageYOffset > 300;
}

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
	window.addEventListener("scroll", checkScroll, { passive: true });
	checkScroll();
});

onUnmounted(() => {
	window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
	opacity: 0;
	transform: translateY(1rem);
}
</style>
