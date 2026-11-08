<template>
	<section id="skills">
		<div class="bg-grid dark:[--color-primary:var(--color-dark)] transition-colors duration-500">
			<div class="py-20 px-10 lg:px-20 flex flex-col items-center gap-5">
				<h1 class="text-3xl md:text-5xl font-medium font-instrument-serif italic" data-aos="fade-up" data-aos-delay="300">
					{{ t('skills_title') }}
				</h1>

				<div
					class="relative grid grid-cols-2 backdrop-blur-xs bg-hvPrimary/50 dark:bg-neutral-800/50 shadow-xl border border-primary/70 dark:border-secondary/20 text-sm p-1 rounded-2xl w-[270px]"
					data-aos="fade-up"
					data-aos-delay="300"
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

				<div
					class="w-full flex justify-center my-4 min-h-[380px]"
					data-aos="fade-up"
					data-aos-delay="300"
				>
					<Transition name="tab-content" mode="out-in">
						<!-- Tech Stack -->
						<div
							v-if="activeTab === 'tab1'"
							key="tab1"
							class="grid grid-cols-2 gap-10 my-4 md:grid-cols-3 lg:grid-cols-4"
						>
							<div
								v-for="skill in activeData.utils_skills"
								:key="skill.name"
								class="group relative bg-hvPrimary w-32 h-32 gap-2 shadow-xl border border-black dark:border-white shadow-secondary/20 dark:shadow-black/20 flex flex-col justify-center items-center cursor-pointer lg:grayscale-100 lg:hover:scale-[1.02] lg:hover:grayscale-0 transition-all duration-300"
							>
								<div class="lg:hidden lg:group-hover:flex absolute -top-1.5 -right-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
								<div class="lg:hidden lg:group-hover:flex absolute -top-1.5 -left-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
								<div class="lg:hidden lg:group-hover:flex absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
								<div class="lg:hidden lg:group-hover:flex absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
								<img :src="resolveAsset(skill.logo)" :alt="skill.name + ' Logo'" class="h-12 w-12 object-contain" />
								<p class="text-base font-medium">{{ skill.name }}</p>
							</div>
						</div>

						<!-- Tools -->
						<div
							v-else-if="activeTab === 'tab2'"
							key="tab2"
							class="grid grid-cols-2 gap-10 my-4 md:grid-cols-3 lg:grid-cols-4"
						>
							<div
								v-for="tool in activeData.utils_tools"
								:key="tool.name"
								class="group relative bg-hvPrimary w-32 h-32 gap-2 border border-black dark:border-white shadow-xl shadow-secondary/20 dark:shadow-black/20 flex flex-col justify-center items-center cursor-pointer lg:grayscale-100 lg:hover:scale-[1.02] lg:hover:grayscale-0 transition-all duration-300"
							>
								<div class="lg:hidden lg:group-hover:flex absolute -top-1.5 -right-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
								<div class="lg:hidden lg:group-hover:flex absolute -top-1.5 -left-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
								<div class="lg:hidden lg:group-hover:flex absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
								<div class="lg:hidden lg:group-hover:flex absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-black dark:bg-white border border-black dark:border-white"></div>
								<img :src="resolveAsset(tool.logo)" :alt="tool.name + ' Logo'" class="h-12 w-12 object-contain" />
								<p class="text-base font-medium">{{ tool.name }}</p>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { resolveAsset } from "../utils/assets";

const { t, activeData } = useLanguage();
const activeTab = ref("tab1");
</script>

<style scoped>
.tab-content-enter-active,
.tab-content-leave-active {
	transition: opacity 0.22s cubic-bezier(0.25, 1, 0.5, 1), transform 0.22s cubic-bezier(0.25, 1, 0.5, 1);
}
.tab-content-enter-from {
	opacity: 0;
	transform: translateY(10px) scale(0.99);
}
.tab-content-leave-to {
	opacity: 0;
	transform: translateY(-8px) scale(0.99);
}
</style>
