import React, { useEffect, useRef } from "react";

const Paint = () => {
	const canvasRef = useRef(null);
	const brushRef = useRef(null);
	const dropsRef = useRef([]);
	const contextRef = useRef(null);
	let lastX = 0,
		lastY = 0,
		lastTime = 0;

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		contextRef.current = ctx;

		// Resize canvas
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		class Brush {
			constructor(color = "rgba(255, 255, 255, 0.2)", size = 35) {
				this.color = color;
				this.size = size;
				this.isDrawing = false;
			}

			startStroke(x, y) {
				this.isDrawing = true;
				lastX = x;
				lastY = y;
				lastTime = Date.now();
			}

			endStroke() {
				this.isDrawing = false;
				addDrip(lastX, lastY); // Add a drip when the brush stops
			}

			draw(x, y) {
				if (!this.isDrawing || !contextRef.current) return;
				const ctx = contextRef.current;
				const currentTime = Date.now();
				const timeDiff = currentTime - lastTime;
				const speed = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2) / timeDiff;

				// Normal stroke
				ctx.strokeStyle = this.color;
				ctx.lineWidth = this.size;
				ctx.lineCap = "round";
				ctx.beginPath();
				ctx.moveTo(lastX, lastY);
				ctx.lineTo(x, y);
				ctx.stroke();

				// Add a splash if moving fast
				if (speed > 0.5) addSplash(x, y);

				// Update last position
				lastX = x;
				lastY = y;
				lastTime = currentTime;
			}
		}

		class Drop {
			constructor(x, y, size, color) {
				this.x = x;
				this.y = y;
				this.size = size;
				this.color = color;
				this.velocity = Math.random() * 1.5 + 1; // Speed of drop fall
			}

			update() {
				this.y += this.velocity;
				this.size *= 0.98; // Shrinks slightly
				if (this.size < 0.5) return false; // Remove small drops
				return true;
			}

			draw(ctx) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.fillStyle = this.color;
				ctx.fill();
			}
		}

		const addDrip = (x, y) => {
			if (Math.random() > 0.5) return; // Random chance for a drip
			const drop = new Drop(
				x,
				y,
				Math.random() * 5 + 2,
				"rgba(255,255,255,0.7)"
			);
			dropsRef.current.push(drop);
		};

		const addSplash = (x, y) => {
			const ctx = contextRef.current;
			ctx.save();
			ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
			ctx.beginPath();
			for (let i = 0; i < 5; i++) {
				const angle = Math.PI * 2 * Math.random();
				const radius = Math.random() * 10 + 3;
				const sx = x + Math.cos(angle) * radius;
				const sy = y + Math.sin(angle) * radius;
				ctx.moveTo(sx, sy);
				ctx.arc(sx, sy, Math.random() * 3 + 1, 0, Math.PI * 2);
			}
			ctx.fill();
			ctx.restore();
		};

		const updateDrops = () => {
			const ctx = contextRef.current;
			dropsRef.current = dropsRef.current.filter((drop) => drop.update());
			dropsRef.current.forEach((drop) => drop.draw(ctx));
			requestAnimationFrame(updateDrops);
		};
		updateDrops();

		brushRef.current = new Brush();

		// Event listeners
		const handleMouseMove = (e) => {
			brushRef.current.draw(e.clientX, e.clientY);
		};

		const handleMouseDown = (e) => {
			brushRef.current.startStroke(e.clientX, e.clientY);
		};

		const handleMouseUp = () => {
			brushRef.current.endStroke();
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				background: "rgba(0,0,0,0.5)",
				zIndex: -1,
				pointerEvents: "none",
			}}
		/>
	);
};

export default Paint;
