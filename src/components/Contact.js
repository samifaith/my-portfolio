import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import "./../App.css";

const ContactBar = () => {
	const barRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/contact") {
			// When on the contact page, flip horizontally and center the bar
			gsap.to(barRef.current, {
				duration: 0.5,
				rotation: 0,
				xPercent: -50,
				yPercent: -50,
				left: "50%",
				top: "50%",
				ease: "power2.out",
			});
		} else {
			// On other pages, keep the bar vertical on the left
			gsap.to(barRef.current, {
				duration: 0.5,
				rotation: -90,
				xPercent: 0,
				yPercent: -50,
				left: "0%",
				top: "50%",
				ease: "power2.in",
			});
		}
	}, [location]);

	return (
		<div ref={barRef} className="contact-bar">
			contact: sfdecoteau@gmail.com | 617.947.2402
		</div>
	);
};

export default ContactBar;
