document.querySelectorAll(".faq__item-spoiler").forEach(spoiler => {
	spoiler.addEventListener("click", () => {
		let item = spoiler.parentElement
		let text = item.querySelector(".faq__item-text")

		document.querySelectorAll(".faq__item").forEach(el => {
			if (el !== item) {
				el.classList.remove("open")
				_slideUp(el.querySelector(".faq__item-text"), 300)
			}
		})

		if (item.classList.contains("open")) {
			item.classList.remove("open")
			_slideUp(text, 300)
		} else {
			item.classList.add("open")
			_slideDown(text, 300)
		}
	})
})

// Улучшенные анимации
let _slideUp = (target, duration = 300) => {
	if (!target.classList.contains("_slide")) {
		target.classList.add("_slide")
		target.style.willChange = "transform, height"
		target.style.transition = `transform ${duration}ms ease-in-out, height ${duration}ms ease-in-out`
		target.style.transform = "translateY(0)"
		target.style.height = target.offsetHeight + "px"
		requestAnimationFrame(() => {
			target.style.height = "0"
			target.style.transform = "translateY(-10px)"
		})

		setTimeout(() => {
			target.hidden = true
			target.style.removeProperty("height")
			target.style.removeProperty("transform")
			target.style.removeProperty("transition")
			target.style.removeProperty("will-change")
			target.classList.remove("_slide")
		}, duration)
	}
}

let _slideDown = (target, duration = 300) => {
	if (!target.classList.contains("_slide")) {
		target.classList.add("_slide")
		target.hidden = false
		let height = target.scrollHeight + "px" // Правильный расчет высоты

		target.style.willChange = "transform, height"
		target.style.transition = `transform ${duration}ms ease-in-out, height ${duration}ms ease-in-out`
		target.style.height = "0"
		target.style.transform = "translateY(-10px)"
		requestAnimationFrame(() => {
			target.style.height = height
			target.style.transform = "translateY(0)"
		})

		setTimeout(() => {
			target.style.removeProperty("height")
			target.style.removeProperty("transform")
			target.style.removeProperty("transition")
			target.style.removeProperty("will-change")
			target.classList.remove("_slide")
		}, duration)
	}
}

// ========= Swiper =========
const swiper = new Swiper(".swiper", {
	// Optional parameters
	loop: true,
	slidesPerView: 3.5,
	watchOverflow: true,
	spaceBetween: 50,
	autoplay: {
		delay: 2500,
		disableOnInteraction: true,
	},
	speed: 1000,

	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
})
