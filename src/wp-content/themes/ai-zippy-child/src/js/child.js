document.addEventListener("DOMContentLoaded", () => {
	const animatedElements = document.querySelectorAll(".v-animate");

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Add visible class
					entry.target.classList.add("is-visible");
					// Stop observing once animated
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.1, // trigger when 10% of the element is visible
			rootMargin: "0px 0px -40px 0px"
		});

		animatedElements.forEach((el) => observer.observe(el));
	} else {
		// Fallback for older browsers
		animatedElements.forEach((el) => el.classList.add("is-visible"));
	}
});
