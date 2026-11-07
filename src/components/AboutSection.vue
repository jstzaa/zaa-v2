<template>
	<section id="about">
		<div class="bg-hvPrimary transition-colors duration-500">
			<div class="py-20 px-10 lg:px-20 flex flex-col items-center gap-5">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-start">
					<div class="order-2 lg:order-1 flex flex-col gap-3 items-center lg:items-start">
						<h1 class="text-3xl md:text-5xl font-medium font-instrument-serif italic" data-aos="fade-up" data-aos-delay="100">
							{{ t('about_title') }}
						</h1>
						<p class="text-base md:text-lg text-center lg:text-left" data-aos="fade-up" data-aos-delay="200">
							{{ t('about_desc') }}
						</p>
					</div>

					<!-- Business Card Mockup -->
					<div
						class="order-1 lg:order-2 w-full bg-[#1e1e1e] dark:bg-[#0d0d0d] rounded-xl overflow-hidden shadow-2xl border border-neutral-700/50 font-mono text-sm transform group"
						data-aos="fade-up"
						data-aos-delay="400"
					>
						<div class="bg-[#2d2d2d] dark:bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-neutral-700/50">
							<div class="flex gap-2">
								<div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
								<div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
								<div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
							</div>
							<span class="text-neutral-400 text-xs font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
								business_card.json
							</span>
							<div class="w-10"></div>
						</div>
						<div class="p-6 text-[#d4d4d4] dark:text-[#c9d1d9] leading-relaxed">
							<span class="text-[#f1fa8c] dark:text-[#e36209]">{</span><br />
							&nbsp;&nbsp;<span class="text-[#8be9fd] dark:text-[#79c0ff]">"name"</span>:
							<span class="text-[#50fa7b] dark:text-[#a5d6ff]">"Fahriza Kurniawan"</span>,<br />
							&nbsp;&nbsp;<span class="text-[#8be9fd] dark:text-[#79c0ff]">"role"</span>:
							<span class="text-[#50fa7b] dark:text-[#a5d6ff]">"Student & Web Developer"</span>,<br />
							&nbsp;&nbsp;<span class="text-[#8be9fd] dark:text-[#79c0ff]">"uni"</span>:
							<span class="text-[#50fa7b] dark:text-[#a5d6ff]">"Siliwangi University"</span>,<br />
							&nbsp;&nbsp;<span class="text-[#8be9fd] dark:text-[#79c0ff]">"location"</span>:
							<span class="text-[#50fa7b] dark:text-[#a5d6ff]">"Tasikmalaya, ID"</span>,<br />
							&nbsp;&nbsp;<span class="text-[#8be9fd] dark:text-[#79c0ff]">"github"</span>:
							<span class="text-[#50fa7b] dark:text-[#a5d6ff] hover:text-secondary hover:underline">
								"<a href="https://github.com/jstzaa" target="_blank" rel="noopener noreferrer">https://github.com/jstzaa</a>"
							</span><br />
							<span class="text-[#f1fa8c] dark:text-[#e36209]">}</span>
						</div>
					</div>
				</div>

				<div class="flex flex-col justify-center items-center gap-4">
					<h1 class="text-2xl md:text-3xl font-medium font-instrument-serif italic" data-aos="fade-up" data-aos-delay="300">
						{{ t('edu_title') }}
					</h1>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-3" data-aos="fade-up" data-aos-delay="400">
						<div
							v-for="education in activeData.educations"
							:key="education.name"
							class="flex flex-row gap-4 bg-primary dark:bg-dark rounded-2xl py-3 px-6 shadow-xl shadow-secondary/20 dark:shadow-black/20 items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
						>
							<img :src="resolveAsset(education.logo)" :alt="education.name" class="h-10 object-contain" />
							<div class="flex flex-col">
								<h1 class="text-lg font-bold lg:text-md">{{ education.name }}</h1>
								<p class="text-base lg:text-sm">{{ education.year }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useLanguage } from "../composables/useLanguage";
import { resolveAsset } from "../utils/assets";

const { t, activeData } = useLanguage();
</script>
