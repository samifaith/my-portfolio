import "@testing-library/jest-dom/vitest";

if (!window.matchMedia) {
	window.matchMedia = (query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	});
}

Object.defineProperty(window, "scrollTo", {
	value: () => {},
	writable: true,
});

if (window.SVGElement && !window.SVGElement.prototype.getTotalLength) {
	window.SVGElement.prototype.getTotalLength = () => 0;
}
