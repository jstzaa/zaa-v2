<template>
	<section id="contact">
		<div class="transition-colors duration-500">
			<div class="py-20 px-10 lg:px-20 flex flex-col items-center gap-5">
				<h1 class="text-3xl md:text-5xl font-medium font-instrument-serif italic" data-aos="fade-up" data-aos-delay="300">
					{{ t('contact_title') }}
				</h1>

				<div class="flex flex-row gap-2 text-5xl" data-aos="fade-up" data-aos-delay="300">
					<a href="https://www.instagram.com/jstzaa28" target="_blank" rel="noopener noreferrer">
						<i class="fa-brands fa-instagram hover:scale-105 transition-all duration-200"></i>
					</a>
					<a href="https://github.com/jstzaa" target="_blank" rel="noopener noreferrer">
						<i class="fa-brands fa-github hover:scale-105 transition-all duration-200"></i>
					</a>
					<a href="https://www.linkedin.com/in/fahriza-kurniawan/" target="_blank" rel="noopener noreferrer">
						<i class="fa-brands fa-linkedin hover:scale-105 transition-all duration-200"></i>
					</a>
				</div>
			</div>

			<footer class="flex justify-center w-full px-20 leading-none overflow-hidden">
				<p class="z-20 text-[4rem] md:text-[8rem] lg:text-[12rem] text-nowrap font-bold font-syne tracking-tighter select-none pointer-events-none translate-y-[20%] text-black dark:text-white">
					z<em>aa</em>-<em>d</em>ev
				</p>
			</footer>
		</div>
	</section>
</template>

<script setup>
import { useLanguage } from "../composables/useLanguage";

const { t } = useLanguage();
</script>
