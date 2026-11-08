<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onUnmounted, ref, watch, type CSSProperties } from 'vue';

interface CRTWarpProps {
  color?: string;
  backgroundColor?: string;
  speed?: number;
  curvature?: number;
  scanlineStrength?: number;
  scanlineFrequency?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  bloom?: number;
  bloomRadius?: number;
  noise?: number;
  vignette?: number;
  brightness?: number;
  pixelation?: number;
  rgbShift?: number;
  mouseReact?: boolean;
  mouseStrength?: number;
  dpr?: number;
  fps?: number;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
}

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBackgroundColor;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanlineFrequency;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uBloom;
uniform float uBloomRadius;
uniform float uNoise;
uniform float uVignette;
uniform float uBrightness;
uniform float uPixelation;
uniform float uRgbShift;
uniform vec2 uPointer;
uniform float uMouseStrength;
uniform float uMouseReact;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 crtCurve(vec2 uv, float radius) {
  vec2 p = (uv - 0.5) * 2.0;
  float safeRadius = max(radius, 1.415);
  float cornerScale = safeRadius / sqrt(max(safeRadius * safeRadius - 2.0, 0.001));
  p = safeRadius * p / sqrt(max(safeRadius * safeRadius - dot(p, p), 0.001));
  p /= cornerScale;
  return p * 0.5 + 0.5;
}

float referencePlasma(vec2 uv, float t) {
  float frequencyScale = max(uWaveFrequency / 2.2, 0.001);
  uv = (uv - 0.5) * frequencyScale + 0.5;

  float scanline = 0.5 - 0.5 * cos(uv.y * 3.14159265 * uScanlineFrequency);
  scanline = mix(1.0, scanline, uScanlineStrength);

  uv *= vec2(80.0, 24.0);
  uv = ceil(uv);
  uv /= vec2(80.0, 24.0);

  float amplitude = uWaveAmplitude / 0.28;
  float field = 0.0;
  field += 0.7 * sin(0.5 * uv.x + t / 5.0);
  field += 3.0 * sin(1.6 * uv.y + t / 5.0);
  field += sin(10.0 * (uv.y * sin(t / 2.0) + uv.x * cos(t / 5.0)) + t / 2.0);

  float cx = uv.x + 0.5 * sin(t / 2.0);
  float cy = uv.y + 0.5 * cos(t / 4.0);
  field += 0.4 * sin(sqrt(100.0 * cx * cx + 100.0 * cy * cy + 1.0) + t);
  field += 0.9 * sin(sqrt(75.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field -= 1.4 * sin(sqrt(256.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field += 0.3 * sin(0.5 * uv.y + uv.x + sin(t));

  return scanline * floor(3.0 * (0.5 + 0.499 * sin(field * amplitude))) / 3.0;
}

void main() {
  vec2 uv = vUv;
  if (uPixelation > 1.001) {
    vec2 cells = max(uResolution / uPixelation, vec2(1.0));
    uv = (floor(uv * cells) + 0.5) / cells;
  }

  float curveRadius = 1.1 + 0.42 / max(uCurvature, 0.001);
  if (uMouseReact > 0.5) {
    curveRadius *= exp(-uPointer.y * uMouseStrength * 0.4);
  }
  vec2 curvedUv = crtCurve(uv, curveRadius);
  if (uMouseReact > 0.5) {
    curvedUv.x -= uPointer.x * uMouseStrength * 0.035;
  }

  float signal = referencePlasma(curvedUv, uTime);
  float radius = 0.01 * uBloomRadius;
  float glow = signal * 0.2;
  glow += referencePlasma(curvedUv + vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv - vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(radius, -radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(-radius, radius), uTime) * 0.08;

  float redSignal = referencePlasma(curvedUv + vec2(uRgbShift, 0.0), uTime);
  float blueSignal = referencePlasma(curvedUv - vec2(uRgbShift, 0.0), uTime);
  vec3 channelSignal = vec3(redSignal, signal, blueSignal);
  vec3 waveColor = uColor * (0.3 + signal * 0.7 + glow * uBloom * 0.65);
  waveColor += (channelSignal - signal) * 0.42;

  float edge = clamp(1.0 - dot(vUv - 0.5, vUv - 0.5) * 2.0, 0.0, 1.0);
  float edgeFade = mix(1.0, smoothstep(0.0, 1.0, edge), uVignette);
  float waveMask = clamp(signal * 0.82 + glow * 0.52, 0.0, 1.0) * edgeFade;

  float grain = hash21(gl_FragCoord.xy + vec2(fract(uTime) * 173.0));
  waveColor = max(waveColor * uBrightness, vec3(0.0));
  vec3 color = mix(uBackgroundColor, waveColor, waveMask);
  color += (grain - 0.5) * uNoise;
  gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
}
`;

interface Vec2Value {
  value: THREE.Vector2;
}
interface ColorValue {
  value: THREE.Color;
}
interface ScalarValue {
  value: number;
}

interface CRTUniforms {
  uResolution: Vec2Value;
  uTime: ScalarValue;
  uSpeed: ScalarValue;
  uColor: ColorValue;
  uBackgroundColor: ColorValue;
  uCurvature: ScalarValue;
  uScanlineStrength: ScalarValue;
  uScanlineFrequency: ScalarValue;
  uWaveAmplitude: ScalarValue;
  uWaveFrequency: ScalarValue;
  uBloom: ScalarValue;
  uBloomRadius: ScalarValue;
  uNoise: ScalarValue;
  uVignette: ScalarValue;
  uBrightness: ScalarValue;
  uPixelation: ScalarValue;
  uRgbShift: ScalarValue;
  uPointer: Vec2Value;
  uMouseStrength: ScalarValue;
  uMouseReact: ScalarValue;
}

const props = withDefaults(defineProps<CRTWarpProps>(), {
  color: '#c755f7',
  backgroundColor: '#05010a',
  speed: 0.5,
  curvature: 0.25,
  scanlineStrength: 0.25,
  scanlineFrequency: 200,
  waveAmplitude: 0.3,
  waveFrequency: 2.5,
  bloom: 1.5,
  bloomRadius: 1,
  noise: 0.1,
  vignette: 0,
  brightness: 1.25,
  pixelation: 1,
  rgbShift: 0.015,
  mouseReact: true,
  mouseStrength: 0.5,
  dpr: 1,
  fps: 30,
  paused: false
});

const containerRef = ref<HTMLDivElement | null>(null);

let uniforms: CRTUniforms | null = null;
let threeRenderer: THREE.WebGLRenderer | null = null;
let teardown: (() => void) | null = null;

onMounted(() => {
  const container = containerRef.value;
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uSpeed: { value: props.speed },
      uColor: { value: new THREE.Color(props.color) },
      uBackgroundColor: { value: new THREE.Color(props.backgroundColor) },
      uCurvature: { value: props.curvature },
      uScanlineStrength: { value: props.scanlineStrength },
      uScanlineFrequency: { value: props.scanlineFrequency },
      uWaveAmplitude: { value: props.waveAmplitude },
      uWaveFrequency: { value: props.waveFrequency },
      uBloom: { value: props.bloom },
      uBloomRadius: { value: props.bloomRadius },
      uNoise: { value: props.noise },
      uVignette: { value: props.vignette },
      uBrightness: { value: props.brightness },
      uPixelation: { value: props.pixelation },
      uRgbShift: { value: props.rgbShift },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: props.mouseStrength },
      uMouseReact: { value: props.mouseReact ? 1 : 0 }
    }
  });
  const mu = material.uniforms as unknown as CRTUniforms;
  uniforms = mu;

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
  threeRenderer = renderer;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, props.dpr));
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  container.appendChild(renderer.domElement);

  const resize = () => {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);
    mu.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const clock = new THREE.Clock();
  let visible = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  visibilityObserver.observe(container);

  const pointerTarget = new THREE.Vector2(0, 0);
  const pointerCurrent = new THREE.Vector2(0, 0);

  let lastFrame = 0;
  let raf = 0;

  const render = (now: number) => {
    raf = requestAnimationFrame(render);
    if (!visible || document.hidden) return;
    const interval = 1000 / Math.max(1, props.fps);
    if (now - lastFrame < interval) return;
    lastFrame = now - ((now - lastFrame) % interval);
    const delta = Math.min(clock.getDelta(), 0.1);
    if (!props.paused) mu.uTime.value += delta * mu.uSpeed.value;
    pointerCurrent.lerp(pointerTarget, 0.08);
    mu.uPointer.value.copy(pointerCurrent);
    renderer.render(scene, camera);
  };

  render(0);

  const onPointerMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    pointerTarget.set(
      ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1,
      -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1)
    );
  };
  const onPointerLeave = () => pointerTarget.set(0, 0);
  container.addEventListener('pointermove', onPointerMove, { passive: true });
  container.addEventListener('pointerleave', onPointerLeave);

  teardown = () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    container.removeEventListener('pointermove', onPointerMove);
    container.removeEventListener('pointerleave', onPointerLeave);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    uniforms = null;
    threeRenderer = null;
  };
});

onUnmounted(() => {
  teardown?.();
  teardown = null;
});

watch(
  () => [
    props.backgroundColor,
    props.bloom,
    props.bloomRadius,
    props.brightness,
    props.color,
    props.curvature,
    props.dpr,
    props.mouseReact,
    props.mouseStrength,
    props.noise,
    props.pixelation,
    props.rgbShift,
    props.scanlineFrequency,
    props.scanlineStrength,
    props.speed,
    props.fps,
    props.vignette,
    props.waveAmplitude,
    props.waveFrequency
  ],
  () => {
    const mu = uniforms;
    const renderer = threeRenderer;
    if (!mu || !renderer) return;

    mu.uColor.value.set(props.color);
    mu.uBackgroundColor.value.set(props.backgroundColor);
    mu.uSpeed.value = props.speed;
    mu.uCurvature.value = props.curvature;
    mu.uScanlineStrength.value = props.scanlineStrength;
    mu.uScanlineFrequency.value = props.scanlineFrequency;
    mu.uWaveAmplitude.value = props.waveAmplitude;
    mu.uWaveFrequency.value = props.waveFrequency;
    mu.uBloom.value = props.bloom;
    mu.uBloomRadius.value = props.bloomRadius;
    mu.uNoise.value = props.noise;
    mu.uVignette.value = props.vignette;
    mu.uBrightness.value = props.brightness;
    mu.uPixelation.value = props.pixelation;
    mu.uRgbShift.value = props.rgbShift;
    mu.uMouseReact.value = props.mouseReact ? 1 : 0;
    mu.uMouseStrength.value = props.mouseStrength;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, props.dpr));

    const container = containerRef.value;
    if (container) {
      renderer.setSize(Math.max(container.clientWidth, 1), Math.max(container.clientHeight, 1), false);
      mu.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
    }
  }
);
</script>

<template>
  <div ref="containerRef" class="relative w-full h-full overflow-hidden" :class="className" :style="style" />
</template>
