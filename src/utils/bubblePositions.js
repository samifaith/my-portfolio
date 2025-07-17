// Dynamic bubble positioning that scales with any number of sections
export const generateBubblePositions = (sectionCount) => {
	// Base positions for first 4 bubbles
	const basePositions = [
		{ top: "25%", left: "15%" },
		{ top: "20%", right: "15%" },
		{ bottom: "30%", left: "20%" },
		{ bottom: "35%", right: "20%" },
	];

	// If we have 4 or fewer sections, use base positions
	if (sectionCount <= 4) {
		return basePositions.slice(0, sectionCount);
	}

	// For more than 4 sections, generate additional positions
	const positions = [...basePositions];

	// Generate additional positions in a circular/spiral pattern
	for (let i = 4; i < sectionCount; i++) {
		const angle = (i - 4) * (360 / (sectionCount - 4));
		const radius = 30; // Percentage from center

		const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
		const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

		positions.push({
			top: `${Math.max(10, Math.min(90, y))}%`,
			left: `${Math.max(10, Math.min(90, x))}%`,
		});
	}

	return positions;
};

export const getBubblePosition = (index, totalSections) => {
	const positions = generateBubblePositions(totalSections);
	return positions[index] || { top: "50%", left: "50%" };
};
