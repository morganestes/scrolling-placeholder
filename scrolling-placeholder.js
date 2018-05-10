'use strict';

(function scrollingPlaceholder(window) {
	/**
	 * Create hash from a string.
	 *
	 * @link http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
	 */
	String.prototype.hashCode = function () {
		let hash = 0,
			chr;

		if (this.length === 0) {
			return hash;
		}

		for (let i = 0; i < this.length; i++) {
			chr = this.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	};

	const key = `scrollPoint_${window.location.href.hashCode()}`;

	/**
	 * Record the scroll position in storage.
	 *
	 * @param {integer} point The scroll point to store.
	 */
	const setScrollPoint = (point) => window.sessionStorage.setItem(key, point);

	/**
	 * Get the scroll position from storage.
	 *
	 * @returns {integer} The scroll point.
	 */
	const getScrollPoint = () => window.sessionStorage.getItem(key);

	let lastKnownScrollPosition = 0;
	let ticking = false;

	/**
	 * Store the scroll position while scrolling.
	 *
	 * @link http://www.html5rocks.com/en/tutorials/speed/animations/
	 */
	window.addEventListener('scroll', () => {
		lastKnownScrollPosition = window.scrollY;

		if (!ticking) {
			window.requestAnimationFrame(() => {
				setScrollPoint(lastKnownScrollPosition);
				ticking = false;
			});

			ticking = true;
		}
	});

	// Scroll to the last known position when the page loads.
	window.addEventListener('load', () => window.scrollTo(0, getScrollPoint()));
})(window);
