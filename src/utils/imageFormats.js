const MODERN_IMAGE_EXTENSION_PATTERN = /\.(png|jpe?g|webp|avif)$/i;

export const getModernImageSources = (imagePath) => {
	if (!imagePath || typeof imagePath !== "string") {
		return null;
	}

	const basePath = imagePath.replace(MODERN_IMAGE_EXTENSION_PATTERN, "");
	const fallback = imagePath.endsWith(".avif")
		? `${basePath}.webp`
		: imagePath;

	return {
		avif: `${basePath}.avif`,
		webp: `${basePath}.webp`,
		fallback,
	};
};
