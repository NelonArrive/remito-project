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

// ========= Swiper =========
const swiper = new Swiper(".swiper", {
	loop: true,
	slidesPerView: 3,
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

//

const form = document.getElementById("form")
const TOKEN = "7886052411:AAFRj31H-lb2iX6Pbnybl03M3ETFZ6uWFMI"
const CHAT_ID = "@message_remito_project_bot"
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`

form.addEventListener("submit", function (e) {
	e.preventDefault()

	const name = form.name.value
	const phone = form.phone.value
	const question = form.question.value
	const consent = form.consent.checked ? "✅ Согласен" : "❌ Не согласен"

	const text = `
		📝 Новая заявка с сайта:
		👤 Имя: ${name}
		📞 Телефон: ${phone}
		❓ Вопрос: ${question}
		🔐 Согласие: ${consent}
`

	fetch(URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: CHAT_ID,
			text: text,
		}),
	})
		.then(res => {
			if (res.ok) {
				alert("Отправлено!")
				form.reset()
			} else {
				alert("Ошибка отправки")
			}
		})
		.catch(() => alert("Ошибка сети"))
})

// PopUp
const trigger = document.querySelector(".header__contact__btn")
const popup = document.querySelector(".header__contact__list")

trigger.addEventListener("click", () => {
	popup.classList.toggle("active")
})

// HEADER FIXED
window.addEventListener("scroll", () => {
	const header = document.querySelector(".header__content")
	const homeContent = document.querySelector(".home__content")

	const triggerPoint = homeContent.offsetTop

	if (window.scrollY >= triggerPoint) {
		header.classList.add("fixed")
	} else {
		header.classList.remove("fixed")
	}
})
