<template>
	<section id="experience">
		<div class="bg-primary dark:bg-dark transition-colors duration-500">
			<div class="py-20 px-10 lg:px-20 flex flex-col items-center gap-5">
				<h1 class="text-3xl md:text-5xl font-medium font-instrument-serif italic" data-aos="fade-up" data-aos-delay="300">
					{{ t('exp_title') }}
				</h1>

				<!-- Tab Switcher -->
				<div
					class="relative grid bg-hvPrimary/50 dark:bg-neutral-800/50 shadow-xl border border-primary/70 dark:border-secondary/20 text-sm p-1 rounded-2xl w-full"
					:class="hasAwards ? 'grid-cols-3 max-w-[420px]' : 'grid-cols-2 max-w-[320px]'"
					data-aos="fade-up"
					data-aos-delay="300"
				>
					<div
						class="absolute top-1 bottom-1 left-1 bg-secondary/50 rounded-xl transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
						:class="[hasAwards ? 'w-[calc(33.333%-4px)]' : 'w-[calc(50%-4px)]', tabIndicatorClass]"
					></div>

					<button
						type="button"
						@click="activeTab = 'tab1'"
						class="relative z-10 h-10 rounded-xl font-medium transition-colors duration-200 cursor-pointer"
						:class="activeTab === 'tab1' ? 'text-secondary font-bold' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'"
					>
						{{ t('exp_tab1') }}
					</button>

					<button
						type="button"
						@click="activeTab = 'tab2'"
						class="relative z-10 h-10 rounded-xl font-medium transition-colors duration-200 cursor-pointer"
						:class="activeTab === 'tab2' ? 'text-secondary font-bold' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'"
					>
						{{ t('exp_tab2') }}
					</button>

					<button
						v-if="hasAwards"
						type="button"
						@click="activeTab = 'tab3'"
						class="relative z-10 h-10 rounded-xl font-medium transition-colors duration-200 cursor-pointer"
						:class="activeTab === 'tab3' ? 'text-secondary font-bold' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'"
					>
						{{ t('exp_tab3') }}
					</button>
				</div>

				<!-- Tabs Content -->
				<div
					class="w-full flex justify-center my-4 min-h-[300px]"
					data-aos="fade-up"
					data-aos-delay="300"
				>
					<Transition name="tab-content" mode="out-in">
						<!-- Tab 1: Work Experience -->
						<div
							v-if="activeTab === 'tab1'"
							key="tab1"
							class="flex flex-col gap-8 w-full items-center"
						>
							<div
								v-for="(experience, index) in activeData.experiences_work"
								:key="index"
								@click="openModal(experience)"
								class="group flex flex-col md:w-2xl lg:w-4xl md:flex-row gap-3 md:gap-10 bg-primary dark:bg-hvPrimary rounded-2xl py-5 px-10 border border-hvPrimary/50 dark:border-secondary/20 shadow-xl shadow-secondary/20 dark:shadow-black/20 items-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-secondary/50"
							>
								<img
									:src="resolveAsset(experience.logo)"
									:alt="experience.title"
									class="w-20 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all object-contain"
								/>
								<div class="flex flex-col">
									<h2 class="text-2xl font-bold">{{ experience.title }}</h2>
									<p class="text-lg">{{ experience.type }}</p>
									<p class="text-lg">{{ experience.year }}</p>
									<div class="mt-2 flex items-center text-sm text-secondary font-medium">
										<span>{{ currentLang === 'id' ? 'Lihat Detail' : 'View Details' }}</span>
										<i class="fa-solid fa-arrow-right ml-1 transition-transform group-hover:translate-x-1"></i>
									</div>
								</div>
							</div>
						</div>

						<!-- Tab 2: Organization Experience -->
						<div
							v-else-if="activeTab === 'tab2'"
							key="tab2"
							class="flex flex-col gap-8 w-full items-center"
						>
							<div
								v-for="(experience, index) in activeData.experiences_org"
								:key="index"
								class="flex flex-col md:w-2xl lg:w-4xl md:flex-row gap-3 md:gap-10 bg-primary dark:bg-hvPrimary rounded-2xl py-5 px-10 border border-hvPrimary/50 shadow-xl shadow-secondary/20 dark:shadow-black/20 dark:border-secondary/20 items-center cursor-pointer transition-all duration-300 hover:scale-[1.02]"
							>
								<img :src="resolveAsset(experience.logo)" :alt="experience.title" class="w-20 object-contain" />
								<div class="flex flex-col">
									<h2 class="text-2xl font-bold">{{ experience.title }}</h2>
									<p class="text-lg">{{ experience.type }}</p>
									<p class="text-lg">{{ experience.year }}</p>
									<p v-if="experience.desc" class="text-base">{{ experience.desc }}</p>
									<ul v-if="experience.tasks && experience.tasks.length" class="text-base text-neutral-600 dark:text-gray-300 list-disc list-outside ml-4 space-y-1">
										<li v-for="task in experience.tasks" :key="task">{{ task }}</li>
									</ul>
								</div>
							</div>
						</div>

						<!-- Tab 3: Awards Experience -->
						<div
							v-else-if="hasAwards && activeTab === 'tab3'"
							key="tab3"
							class="w-full flex flex-col items-center gap-8"
						>
							<div
								v-for="(award, index) in activeData.experiences_award"
								:key="index"
								class="group flex flex-col md:w-2xl lg:w-4xl md:flex-row gap-3 md:gap-10 bg-primary dark:bg-hvPrimary rounded-2xl py-5 px-10 border border-hvPrimary/50 dark:border-secondary/20 shadow-xl shadow-secondary/20 dark:shadow-black/20 items-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-secondary/50"
							>
								<div class="w-20 h-20 rounded-2xl bg-hvPrimary/80 dark:bg-white/5 flex items-center justify-center shrink-0">
									<i class="fa-solid fa-award text-3xl text-secondary"></i>
								</div>
								<div class="flex flex-col">
									<h2 class="text-2xl font-bold">{{ award.title }}</h2>
									<p class="text-lg">{{ award.type }}</p>
									<p class="text-lg">{{ award.year }}</p>
									<p class="text-base text-neutral-600 dark:text-gray-300">{{ award.desc }}</p>
								</div>
							</div>
						</div>
					</Transition>
				</div>

				<!-- Experience Detail Modal -->
				<ExperienceModal
					:is-open="showModal"
					:experience="selectedExp"
					@close="closeModal"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from "vue";
import ExperienceModal from "./ExperienceModal.vue";
import { useLanguage } from "../composables/useLanguage";
import { resolveAsset } from "../utils/assets";

const { t, currentLang, activeData } = useLanguage();

const activeTab = ref("tab1");
const showModal = ref(false);
const selectedExp = ref(null);

const hasAwards = computed(() => {
	return Boolean(activeData.value?.experiences_award && activeData.value.experiences_award.length > 0);
});

const tabIndicatorClass = computed(() => {
	if (!hasAwards.value) {
		return activeTab.value === "tab1" ? "translate-x-0" : "translate-x-full";
	}
	if (activeTab.value === "tab1") return "translate-x-0";
	if (activeTab.value === "tab2") return "translate-x-full";
	return "translate-x-[203%]";
});

function openModal(exp) {
	selectedExp.value = exp;
	showModal.value = true;
}

function closeModal() {
	showModal.value = false;
	selectedExp.value = null;
}
</script>

<style scoped>
.tab-content-enter-active,
.tab-content-leave-active {
	transition: opacity 0.22s cubic-bezier(0.25, 1, 0.5, 1), transform 0.22s cubic-bezier(0.25, 1, 0.5, 1);
}
.tab-content-enter-from {
	opacity: 0;
	transform: translateY(12px) scale(0.99);
}
.tab-content-leave-to {
	opacity: 0;
	transform: translateY(-8px) scale(0.99);
}
</style>
