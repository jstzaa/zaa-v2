<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				v-if="isOpen && experience"
				class="fixed inset-0 z-60 flex items-center justify-center px-4"
				@keydown.escape="emit('close')"
				tabindex="-1"
			>
				<!-- Backdrop -->
				<div
					@click="emit('close')"
					class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
				></div>

				<!-- Modal Content -->
				<div
					class="relative bg-white dark:bg-hvPrimary w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl p-6 md:p-8 border border-white/10 scrollbar-hide z-10 transition-all duration-300 transform-gpu"
				>
					<div class="flex flex-col gap-6">
						<!-- Close Button -->
						<button
							type="button"
							@click="emit('close')"
							class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
							aria-label="Close modal"
						>
							<span class="material-symbols-outlined text-2xl text-gray-500 dark:text-gray-400">close</span>
						</button>

						<!-- Header -->
						<div class="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left mt-2">
							<div class="w-24 h-24 p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0">
								<img
									:src="resolveAsset(experience.logo)"
									:alt="experience.title"
									class="w-full h-full object-contain"
								/>
							</div>
							<div class="flex flex-col gap-2 grow">
								<h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white leading-tight">
									{{ experience.title }}
								</h2>
								<div class="flex flex-wrap gap-2 justify-center md:justify-start">
									<span class="flex items-center justify-center px-3 py-1 bg-hvPrimary/20 dark:bg-primary/10 text-secondary rounded-lg text-sm font-semibold">
										{{ experience.type }}
									</span>
									<span class="flex items-center justify-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium">
										<i class="fa-solid fa-calendar"></i>
										<span>{{ experience.year }}</span>
									</span>
								</div>
							</div>
						</div>

						<!-- Divider -->
						<div class="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

						<!-- Body -->
						<div class="space-y-6">
							<div v-if="experience.desc" class="space-y-2">
								<h3 class="text-lg font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
									<span>{{ currentLang === 'id' ? 'Deskripsi' : 'Description' }}</span>
								</h3>
								<p class="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
									{{ experience.desc }}
								</p>
							</div>

							<div v-if="experience.tasks && experience.tasks.length" class="space-y-2">
								<h3 class="text-lg font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
									<span>{{ currentLang === 'id' ? 'Aktivitas' : 'Activities' }}</span>
								</h3>
								<ul class="grid gap-3">
									<li
										v-for="task in experience.tasks"
										:key="task"
										class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
									>
										<i class="fa-solid fa-circle-check text-green-500 text-lg"></i>
										<span class="text-gray-600 dark:text-gray-300">{{ task }}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { resolveAsset } from "../utils/assets";

const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
	experience: {
		type: Object,
		default: null,
	},
});

const emit = defineEmits(["close"]);

const { currentLang } = useLanguage();

function handleKeydown(e) {
	if (e.key === "Escape" && props.isOpen) {
		emit("close");
	}
}

watch(
	() => props.isOpen,
	(val) => {
		if (val) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}
);

onMounted(() => {
	window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeydown);
	document.body.style.overflow = "";
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}

.modal-enter-active .transform-gpu,
.modal-leave-active .transform-gpu {
	transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .transform-gpu,
.modal-leave-to .transform-gpu {
	transform: scale(0.9) translateY(40px);
	opacity: 0;
}
</style>
