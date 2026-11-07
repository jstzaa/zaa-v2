<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				v-if="isOpen && project"
				class="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6"
				@keydown.escape="emit('close')"
				role="dialog"
				aria-modal="true"
				:aria-label="project.name"
				tabindex="-1"
			>
				<!-- Backdrop -->
				<div
					@click="emit('close')"
					class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
				></div>

				<!-- Modal Dialog Box -->
				<div
					class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-primary dark:bg-hvPrimary border border-secondary/15 dark:border-white/15 shadow-2xl shadow-black/40 z-10 flex flex-col transition-all duration-300 transform-gpu"
				>
					<div class="overflow-y-auto overflow-x-hidden">
						<div class="grid grid-cols-1 lg:grid-cols-12">
							<!-- Left Column: Visual Showcase & Actions -->
							<div class="lg:col-span-5 p-6 lg:p-7 flex flex-col gap-5 bg-hvPrimary/40 dark:bg-black/20 border-b lg:border-b-0 lg:border-r border-secondary/10 dark:border-white/10">
								<!-- Project Screenshot -->
								<div class="relative w-full aspect-video rounded-xl overflow-hidden border border-secondary/10 dark:border-white/10 shadow-sm bg-neutral-200 dark:bg-neutral-800">
									<img
										:src="resolveAsset(project.foto)"
										:alt="project.name"
										class="w-full h-full object-cover object-top"
									/>
								</div>

								<!-- Tech Stack -->
								<div v-if="project.tech && project.tech.length" class="flex flex-col gap-2">
									<span class="text-xs font-semibold uppercase tracking-wider text-neutral-400">
										{{ currentLang === 'id' ? 'Teknologi' : 'Tech Stack' }}
									</span>
									<div class="flex flex-wrap gap-1.5">
										<span
											v-for="tech in project.tech"
											:key="tech"
											class="px-2.5 py-1 text-xs font-medium rounded-lg bg-secondary/5 dark:bg-white/5 border border-secondary/10 dark:border-white/10 text-secondary dark:text-neutral-200"
										>
											{{ tech }}
										</span>
									</div>
								</div>

								<!-- Action Links (Live Demo & Source Code) -->
								<div class="flex flex-wrap gap-2.5 mt-auto pt-4 border-t border-secondary/10 dark:border-white/10">
									<a
										v-if="project.demo"
										:href="project.demo"
										target="_blank"
										rel="noopener noreferrer"
										class="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-primary font-medium text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm"
									>
										<i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
										<span>{{ currentLang === 'id' ? 'Kunjungi Demo' : 'Live Demo' }}</span>
									</a>

									<a
										v-if="project.github"
										:href="project.github"
										target="_blank"
										rel="noopener noreferrer"
										class="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-secondary/20 dark:border-white/20 text-secondary dark:text-white font-medium text-sm hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
									>
										<i class="fa-brands fa-github text-sm"></i>
										<span>GitHub</span>
									</a>
								</div>
							</div>

							<!-- Right Column: Project Details & Story -->
							<div class="lg:col-span-7 p-6 lg:p-7 relative flex flex-col justify-between">
								<!-- Close Button -->
								<button
									type="button"
									@click="emit('close')"
									class="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-xl border border-secondary/15 dark:border-white/15 text-neutral-500 hover:text-secondary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer z-10"
									:aria-label="currentLang === 'id' ? 'Tutup modal' : 'Close modal'"
								>
									<span class="material-symbols-outlined text-xl">close</span>
								</button>

								<div class="flex flex-col gap-5 pr-8">
									<!-- Title & Core Description -->
									<div class="space-y-2">
										<h2 class="text-2xl md:text-3xl font-bold font-instrument-serif italic text-secondary dark:text-white">
											{{ project.name }}
										</h2>
										<p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
											{{ project.desc }}
										</p>
									</div>

									<!-- Overview -->
									<div v-if="insights.overview" class="space-y-1">
										<h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-400">
											{{ currentLang === 'id' ? 'Ikhtisar' : 'Overview' }}
										</h3>
										<p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
											{{ insights.overview }}
										</p>
									</div>

									<!-- Focus & Impact Grid -->
									<div v-if="insights.focus || insights.impact" class="grid sm:grid-cols-2 gap-4 pt-1">
										<div v-if="insights.focus" class="space-y-1">
											<h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-400">
												{{ currentLang === 'id' ? 'Fokus Utama' : 'Key Focus' }}
											</h3>
											<p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
												{{ insights.focus }}
											</p>
										</div>
										<div v-if="insights.impact" class="space-y-1">
											<h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-400">
												{{ currentLang === 'id' ? 'Dampak' : 'Impact' }}
											</h3>
											<p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
												{{ insights.impact }}
											</p>
										</div>
									</div>

									<!-- Highlights as Clean List -->
									<div v-if="insights.highlights && insights.highlights.length" class="space-y-2 pt-1">
										<h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-400">
											{{ currentLang === 'id' ? 'Sorotan Fitur' : 'Highlights' }}
										</h3>
										<ul class="space-y-2">
											<li
												v-for="point in insights.highlights"
												:key="point"
												class="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-300"
											>
												<i class="fa-solid fa-check text-xs text-secondary mt-1 shrink-0"></i>
												<span>{{ point }}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { resolveAsset } from "../utils/assets";

const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
	project: {
		type: Object,
		default: null,
	},
});

const emit = defineEmits(["close"]);

const { currentLang, projectDetails } = useLanguage();

const insights = computed(() => {
	if (!props.project) return {};
	return projectDetails(props.project.name);
});

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
	transition: opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}

.modal-enter-active .transform-gpu,
.modal-leave-active .transform-gpu {
	transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.modal-enter-from .transform-gpu,
.modal-leave-to .transform-gpu {
	transform: scale(0.96) translateY(10px);
	opacity: 0;
}
</style>
