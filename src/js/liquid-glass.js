document.addEventListener('alpine:init', () => {
    Alpine.data('liquidGlass', (initialProps) => ({
        ...initialProps,
        active: 'home',
        setActive(id) {
            this.active = id;
        },
        uniqueId: Math.random().toString(36).substring(2, 15),
        get filterId() { return `glass-filter-${this.uniqueId}`; },
        get redGradId() { return `red-grad-${this.uniqueId}`; },
        get blueGradId() { return `blue-grad-${this.uniqueId}`; },

        init() {
            // 1. Injeksi SVG secara otomatis ke dalam elemen kontainer
            this.injectSvgFilter();

            // 2. Logika IntersectionObserver bawaan Anda
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.active = entry.target.id;
                    }
                });
            }, { threshold: 0, rootMargin: '-30% 0px -65% 0px' });

            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });

            // 3. Jalankan pembaruan displacement map setelah terinjeksi
            this.$nextTick(() => {
                this.updateDisplacementMap();
                this.updateFilterElements();
                this.setupResizeObserver();
            });
        },

        injectSvgFilter() {
            // Template SVG yang otomatis dibuat dengan ID unik per komponen
            const svgHTML = `
                <svg class="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="${this.filterId}" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">
                            <feImage id="feImage-${this.uniqueId}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
                            <feDisplacementMap id="redChannel-${this.uniqueId}" in="SourceGraphic" in2="map" result="dispRed" />
                            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
                            <feDisplacementMap id="greenChannel-${this.uniqueId}" in="SourceGraphic" in2="map" result="dispGreen" />
                            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
                            <feDisplacementMap id="blueChannel-${this.uniqueId}" in="SourceGraphic" in2="map" result="dispBlue" />
                            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
                            <feBlend in="red" in2="green" mode="screen" result="rg" />
                            <feBlend in="rg" in2="blue" mode="screen" result="output" />
                            <feGaussianBlur id="gaussianBlur-${this.uniqueId}" in="output" stdDeviation="0.7" />
                        </filter>
                    </defs>
                </svg>
            `;
            // Masukkan ke dalam elemen kontainer utama secara otomatis di awal
            this.$el.insertAdjacentHTML('afterbegin', svgHTML);
        },

        generateDisplacementMap() {
            const rect = this.$el?.getBoundingClientRect();
            const actualWidth = rect?.width || 600;
            const actualHeight = rect?.height || 64;

            const svgContent = `
                <svg viewBox="0 0 ${actualWidth} ${actualHeight}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="${this.redGradId}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#808080"/>
                            <stop offset="50%" stop-color="#ff0000"/>
                            <stop offset="100%" stop-color="#808080"/>
                        </linearGradient>
                        <linearGradient id="${this.blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#808080"/>
                            <stop offset="50%" stop-color="#0000ff"/>
                            <stop offset="100%" stop-color="#808080"/>
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="#808080"></rect>
                    <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${this.borderRadius}" fill="url(#${this.redGradId})" />
                    <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${this.borderRadius}" fill="url(#${this.blueGradId})" style="mix-blend-mode: ${this.mixBlendMode}" />
                </svg>
            `;
            return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
        },

        updateDisplacementMap() {
            const feImage = this.$el.querySelector(`#feImage-${this.uniqueId}`);
            if (feImage) {
                feImage.setAttribute('href', this.generateDisplacementMap());
            }
        },

        updateFilterElements() {
            const redChannel = this.$el.querySelector(`#redChannel-${this.uniqueId}`);
            const greenChannel = this.$el.querySelector(`#greenChannel-${this.uniqueId}`);
            const blueChannel = this.$el.querySelector(`#blueChannel-${this.uniqueId}`);
            const gaussianBlur = this.$el.querySelector(`#gaussianBlur-${this.uniqueId}`);

            if (redChannel) {
                redChannel.setAttribute('scale', (this.distortionScale + this.redOffset).toString());
                redChannel.setAttribute('xChannelSelector', this.xChannel);
                redChannel.setAttribute('yChannelSelector', this.yChannel);
            }
            if (greenChannel) {
                greenChannel.setAttribute('scale', (this.distortionScale + this.greenOffset).toString());
                greenChannel.setAttribute('xChannelSelector', this.xChannel);
                greenChannel.setAttribute('yChannelSelector', this.yChannel);
            }
            if (blueChannel) {
                blueChannel.setAttribute('scale', (this.distortionScale + this.blueOffset).toString());
                blueChannel.setAttribute('xChannelSelector', this.xChannel);
                blueChannel.setAttribute('yChannelSelector', this.yChannel);
            }
            if (gaussianBlur) {
                gaussianBlur.setAttribute('stdDeviation', this.displace.toString());
            }
        },

        setupResizeObserver() {
            if (!this.$el || typeof ResizeObserver === 'undefined') return;
            const observer = new ResizeObserver(() => {
                setTimeout(() => this.updateDisplacementMap(), 0);
            });
            observer.observe(this.$el);
        },

        get containerStyles() {
            return {
                borderRadius: `${this.borderRadius}px`,
                background: `hsl(0 0% 0% / ${this.backgroundOpacity})`,
                backdropFilter: `url(#${this.filterId}) saturate(${this.saturation})`,
                WebkitBackdropFilter: `url(#${this.filterId}) saturate(${this.saturation})`
            };
        }
    }));
});