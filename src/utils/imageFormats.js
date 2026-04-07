const MODERN_IMAGE_EXTENSION_PATTERN = /\.(png|jpe?g|webp|avif)$/i;
const AVIF_EXTENSION_PATTERN = /\.avif$/i;

export const getModernImageSources = (imagePath) => {
	if (!imagePath || typeof imagePath !== "string") {
		return null;
	}

	if (!MODERN_IMAGE_EXTENSION_PATTERN.test(imagePath)) {
		return {
			avif: null,
			webp: null,
			fallback: imagePath,
		};
	}

	const basePath = imagePath.replace(MODERN_IMAGE_EXTENSION_PATTERN, "");
	const fallback = AVIF_EXTENSION_PATTERN.test(imagePath)
		? `${basePath}.webp`
		: imagePath;

	return {
		avif: `${basePath}.avif`,
		webp: `${basePath}.webp`,
		fallback,
	};
};
