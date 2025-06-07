import { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } from './config.js'

// ================= POPUP =================
const overlay = document.getElementById('popupOverlay')
const closePopup = () => {
	overlay.classList.remove('active')
	setTimeout(() => (overlay.style.display = 'none'), 300)
}

document.querySelectorAll('.open-popup').forEach(btn => {
	btn.addEventListener('click', () => {
		overlay.style.display = 'flex'
		requestAnimationFrame(() => overlay.classList.add('active'))
	})
})

document.getElementById('popupClose')?.addEventListener('click', closePopup)
overlay.addEventListener('click', e => {
	if (e.target === e.currentTarget) closePopup()
})

// ================= ACCORDION =================
document.querySelectorAll('.faq__item-header').forEach(header => {
	header.addEventListener('click', () => {
		const item = header.closest('.faq__item')
		const body = item.querySelector('.faq__item-body')

		const isActive = item.classList.contains('active')
		body.style.maxHeight = isActive ? '0' : '100px'
		body.style.paddingTop = isActive ? '0' : '20px'
		body.style.paddingBottom = isActive ? '0' : '20px'
		item.classList.toggle('active')
	})
})

// ================= SWIPER =================
const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 3,
	spaceBetween: 50,
	watchOverflow: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: true
	},
	speed: 1000,
	breakpoints: {
		0: { slidesPerView: 1, spaceBetween: 0 },
		768: { slidesPerView: 2, spaceBetween: 30 },
		1240: { slidesPerView: 3 }
	},
	pagination: { el: '.swiper-pagination', clickable: true },
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})

// ================= CONTACT TOGGLE =================
document.querySelector('.header__contacts-btn')?.addEventListener('click', () => {
	document.querySelector('.header__contacts-list')?.classList.toggle('active')
})

// ================= HEADER =================
const header = document.querySelector('.header')
let lastScroll = 0

window.addEventListener('scroll', () => {
	const currentScroll = window.scrollY
	if (currentScroll > lastScroll && currentScroll > 100) {
		header.classList.remove('fixed')
		header.classList.add('hide-up')
	} else {
		header.classList.add('fixed')
		header.classList.remove('hide-up')
	}
	lastScroll = currentScroll
})

// ================= BURGER MENU =================
const burger = document.getElementById('burger')
const menu = document.getElementById('menu')

burger?.addEventListener('click', () => {
	const isActive = menu.classList.contains('menu--active')
	menu.style.maxHeight = isActive ? '0' : '300px'
	menu.style.paddingTop = isActive ? '0' : '20px'
	menu.style.paddingBottom = isActive ? '0' : '20px'
	menu.classList.toggle('menu--active')
})

// ================= PHONE MASK =================
const phoneInput = document.getElementById('phone')
if (phoneInput) {
	IMask(phoneInput, { mask: '+{7} (000) 000-00-00' })
}

// ================= MENU LINK ACTIVE =================
const links = document.querySelectorAll('.menu__link')
const sections = document.querySelectorAll('section')

function setActiveLink(id) {
	links.forEach(link => {
		link.parentElement.classList.toggle('active', link.getAttribute('href') === `#${id}`)
	})
}

links.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		const id = link.getAttribute('href').substring(1)
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
		setActiveLink(id)
	})
})

window.addEventListener('scroll', () => {
	let current = 'home'
	const scrollY = window.scrollY
	const scrollBottom = scrollY + window.innerHeight
	const docHeight = document.body.offsetHeight

	sections.forEach(section => {
		if (scrollY >= section.offsetTop - window.innerHeight / 2) {
			current = section.id
		}
	})

	if (scrollBottom >= docHeight - 100) {
		current = 'clients'
	}

	setActiveLink(current)
})

// ================= FORM SEND =================
const forms = document.querySelectorAll('form')

forms.forEach(form => {
	form.addEventListener('submit', async e => {
		e.preventDefault()

		const name = form.querySelector('[name="name"]')
		const phone = form.querySelector('[name="phone"]')
		const question = form.querySelector('[name="question"]') || { value: '' }
		const comment = form.querySelector('[name="comment"]') || { value: '' }
		const consent = form.querySelector('[name="consent"]')

		if (!name.value.trim() || !phone.value.trim() || !consent.checked) {
			alert('Пожалуйста, заполните имя, телефон и дайте согласие.')
			return
		}

		const message = `
📝 Новая заявка с формы:
------------------------------------
👤 Имя: ${name.value}
📞 Телефон: ${phone.value}
❓ Вопрос: ${question.value || comment.value}
-----------------------------------
🔐 Согласие: ${consent.checked ? '✅' : '❌'}
`

		await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: TELEGRAM_CHAT_ID,
				text: message
			})
		})

		form.reset()
	})
})
