document.addEventListener("DOMContentLoaded", () => {
	const items = document.querySelectorAll(".faq__item")

	items.forEach(item => {
		const spoiler = item.querySelector(".faq__item-spoiler")
		const text = item.querySelector(".faq__item-text")

		text.style.maxHeight = "0px"

		spoiler.addEventListener("click", () => {
			items.forEach(el => {
				if (el !== item) {
					el.classList.remove("open")
					el.querySelector(".faq__item-text").style.maxHeight = "0px"
				}
			})

			if (item.classList.contains("open")) {
				item.classList.remove("open")
				text.style.maxHeight = "0px"
			} else {
				item.classList.add("open")
				text.style.maxHeight = text.scrollHeight + "px"
			}
		})
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
		let height = target.scrollHeight + "px"

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

// ========= SWIPER SLIDER =========
const swiper = new Swiper(".swiper", {
	loop: true,
	slidesPerView: 3,
	spaceBetween: 50,
	watchOverflow: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: true,
	},
	speed: 1000,
	breakpoints: {
		0: {
			slidesPerView: 1,
			spaceBetween: 50,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 50,
		},
		// от 1240px и выше — 3 слайда
		1240: {
			slidesPerView: 3,
			spaceBetween: 50,
		},
	},

	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
})

// POPUP
const trigger = document.querySelector(".header__contact__btn")
const popup = document.querySelector(".header__contact__list")

trigger.addEventListener("click", () => {
	popup.classList.toggle("active")
})

// HEADER FIXED
const mainMenu = document.querySelector(".header")
window.addEventListener("scroll", () => {
	if (this.scrollY > 150) {
		mainMenu.classList.add("fixed")
	} else {
		mainMenu.classList.remove("fixed")
	}
})

// BURGER MENU
const burger = document.getElementById("burger")
const menu = document.getElementById("menu")

burger.addEventListener("click", () => {
	if (menu.classList.contains("menu--active")) {
		menu.style.maxHeight = "0"
		menu.style.paddingTop = "0"
		menu.style.paddingBottom = "0"
		menu.classList.remove("menu--active")
	} else {
		menu.classList.add("menu--active")
		menu.style.maxHeight = "400px"
		menu.style.paddingTop = "20px"
		menu.style.paddingBottom = "20px"
	}
})

// Mask Phone
const element = document.getElementById("phone")
const maskOptions = { mask: "+{7} (000) 000-00-00" }
IMask(element, maskOptions)

// Active class Menu link
const links = document.querySelectorAll(".menu__link")
const sections = document.querySelectorAll("section")

function setActiveLink(id) {
	links.forEach(link => {
		link.parentElement.classList.toggle(
			"active",
			link.getAttribute("href") === `#${id}`
		)
	})
}

links.forEach(link => {
	link.addEventListener("click", e => {
		e.preventDefault()
		const targetId = link.getAttribute("href").substring(1)
		document.getElementById(targetId).scrollIntoView({ behavior: "smooth" })
		setActiveLink(targetId)
	})
})

window.addEventListener("scroll", () => {
	let current = "home"
	const scrollY = window.scrollY
	const scrollBottom = scrollY + window.innerHeight
	const docHeight = document.body.offsetHeight

	sections.forEach(section => {
		if (scrollY >= section.offsetTop - window.innerHeight / 2) {
			current = section.id
		}
	})

	if (scrollBottom >= docHeight - 200) {
		current = "clients"
	}

	setActiveLink(current)
})
