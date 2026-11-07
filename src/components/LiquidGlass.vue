<template>
	<component :is="as" ref="containerRef" :style="containerStyles" :class="rootClasses">
		<!-- Injected SVG filter with unique ID -->
		<svg class="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<filter :id="filterId" color-interpolation-filters="sRGB" x="-10%" y="-10%" width="120%" height="120%">
					<feImage ref="feImageRef" :id="`feImage-${uid}`" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" :href="displacementMapUrl" />
					<feDisplacementMap :scale="distortionScale + redOffset" :xChannelSelector="xChannel" :yChannelSelector="yChannel" in="SourceGraphic" in2="map" result="dispRed" />
					<feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
					<feDisplacementMap :scale="distortionScale + greenOffset" :xChannelSelector="xChannel" :yChannelSelector="yChannel" in="SourceGraphic" in2="map" result="dispGreen" />
					<feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
					<feDisplacementMap :scale="distortionScale + blueOffset" :xChannelSelector="xChannel" :yChannelSelector="yChannel" in="SourceGraphic" in2="map" result="dispBlue" />
					<feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
					<feBlend in="red" in2="green" mode="screen" result="rg" />
					<feBlend in="rg" in2="blue" mode="screen" result="output" />
					<feGaussianBlur in="output" :stdDeviation="displace" />
				</filter>
			</defs>
		</svg>
		<slot />
	</component>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, useAttrs } from "vue";

const props = defineProps({
	as: {
		type: String,
		default: "div",
	},
	borderRadius: {
		type: Number,
		default: 24,
	},
	borderWidth: {
		type: Number,
		default: 0.05,
	},
	brightness: {
		type: Number,
		default: 75,
	},
	opacity: {
		type: Number,
		default: 0.95,
	},
	blur: {
		type: Number,
		default: 100,
	},
	displace: {
		type: Number,
		default: 0.4,
	},
	backgroundOpacity: {
		type: Number,
		default: 0.25,
	},
	saturation: {
		type: Number,
		default: 1.2,
	},
	distortionScale: {
		type: Number,
		default: 0.4,
	},
	redOffset: {
		type: Number,
		default: 0,
	},
	greenOffset: {
		type: Number,
		default: 10,
	},
	blueOffset: {
		type: Number,
		default: 5,
	},
	xChannel: {
		type: String,
		default: "R",
	},
	yChannel: {
		type: String,
		default: "G",
	},
	mixBlendMode: {
		type: String,
		default: "difference",
	},
});

const attrs = useAttrs();

const uid = Math.random().toString(36).substring(2, 9);
const filterId = `glass-filter-${uid}`;
const redGradId = `red-grad-${uid}`;
const blueGradId = `blue-grad-${uid}`;

const containerRef = ref(null);
const feImageRef = ref(null);
const dimensions = ref({ width: 600, height: 64 });
let resizeObserver = null;

const rootClasses = computed(() => {
	const userClass = String(attrs.class || "");
	const hasPosition = /\b(fixed|absolute|relative|sticky)\b/.test(userClass);
	return ["isolate overflow-hidden", hasPosition ? "" : "relative"];
});

function generateDisplacementMap(w, h) {
	const validW = Math.max(Math.round(w) || 0, 100);
	const validH = Math.max(Math.round(h) || 0, 30);
	const svgContent = `
        <svg viewBox="0 0 ${validW} ${validH}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="${redGradId}" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#808080"/>
                    <stop offset="50%" stop-color="#ff0000"/>
                    <stop offset="100%" stop-color="#808080"/>
                </linearGradient>
                <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#808080"/>
                    <stop offset="50%" stop-color="#0000ff"/>
                    <stop offset="100%" stop-color="#808080"/>
                </linearGradient>
            </defs>
            <rect x="0" y="0" width="${validW}" height="${validH}" fill="#808080"></rect>
            <rect x="0" y="0" width="${validW}" height="${validH}" rx="${props.borderRadius}" fill="url(#${redGradId})" />
            <rect x="0" y="0" width="${validW}" height="${validH}" rx="${props.borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${props.mixBlendMode}" />
        </svg>
    `;
	return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
}

const displacementMapUrl = computed(() => {
	const w = dimensions.value.width || 600;
	const h = dimensions.value.height || 64;
	return generateDisplacementMap(w, h);
});

function updateMap() {
	if (feImageRef.value) {
		const url = generateDisplacementMap(dimensions.value.width, dimensions.value.height);
		feImageRef.value.setAttribute("href", url);
		feImageRef.value.setAttribute("xlink:href", url);
	}
}

onMounted(() => {
	if (containerRef.value && typeof ResizeObserver !== "undefined") {
		const el = containerRef.value.$el || containerRef.value;
		if (el && el.getBoundingClientRect) {
			const rect = el.getBoundingClientRect();
			if (rect.width && rect.height) {
				dimensions.value = { width: rect.width, height: rect.height };
			}
			updateMap();
			resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const { width, height } = entry.contentRect;
					if (width && height) {
						dimensions.value = { width, height };
						updateMap();
					}
				}
			});
			resizeObserver.observe(el);
		}
	}
});

onUnmounted(() => {
	if (resizeObserver) {
		resizeObserver.disconnect();
	}
});

const containerStyles = computed(() => {
	return {
		borderRadius: `${props.borderRadius}px`,
		background: `hsl(0 0% 0% / ${props.backgroundOpacity})`,
		backdropFilter: `url(#${filterId}) saturate(${props.saturation})`,
		WebkitBackdropFilter: `url(#${filterId}) saturate(${props.saturation})`,
	};
});
</script>
