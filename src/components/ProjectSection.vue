<template>
	<section id="project">
		<div class="bg-hvPrimary transition-colors duration-500">
			<div class="py-20 px-10 lg:px-20 flex flex-col items-center gap-5">
				<h1 class="text-3xl md:text-5xl font-medium font-instrument-serif italic">
					{{ t('projects_title') }}
				</h1>

				<!-- Stacked Scroll Projects -->
				<div class="flex flex-col gap-12 w-full max-w-4xl mt-10">
					<ProjectCard
						v-for="(portfolio, index) in activeData.portfolios"
						:key="portfolio.name"
						:portfolio="portfolio"
						:index="index"
						@open="openProjectModal"
					/>
				</div>

				<!-- Project Detail Modal -->
				<ProjectModal
					:is-open="showProjectModal"
					:project="selectedProject"
					@close="closeProjectModal"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from "vue";
import ProjectCard from "./ProjectCard.vue";
import ProjectModal from "./ProjectModal.vue";
import { useLanguage } from "../composables/useLanguage";

const { t, activeData } = useLanguage();

const showProjectModal = ref(false);
const selectedProject = ref(null);

function openProjectModal(portfolio) {
	selectedProject.value = portfolio;
	showProjectModal.value = true;
}

function closeProjectModal() {
	showProjectModal.value = false;
	selectedProject.value = null;
}
</script>
