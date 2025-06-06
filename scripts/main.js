// ACORDEON
document.querySelectorAll('.faq__item-header').forEach(img => {
	img.addEventListener('click', () => {
		const item = img.closest('.faq__item')
		const text = item.querySelector('.faq__item-title')

		if (item.classList.contains('active')) {
			text.style.maxHeight = '0'
			text.style.paddingTop = '0'
			text.style.paddingBottom = '0'
			item.classList.remove('active')
		} else {
			item.classList.add('active')
			text.style.maxHeight = '100px'
			text.style.paddingTop = '20px'
			text.style.paddingBottom = '20px'
		}
	})
})

// ========= SWIPER SLIDER =========
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
		0: {
			spaceBetween: 0,
			slidesPerView: 1
		},
		768: {
			spaceBetween: 30,
			slidesPerView: 2
		},
		1240: {
			slidesPerView: 3
		}
	},

	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})

// POPUP
const trigger = document.querySelector('.header__contacts-btn')
const popup = document.querySelector('.header__contacts-list')

trigger.addEventListener('click', () => {
	popup.classList.toggle('active')
})

// HEADER FIXED
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

// BURGER MENU
const burger = document.getElementById('burger')
const menu = document.getElementById('menu')

burger.addEventListener('click', () => {
	if (menu.classList.contains('menu--active')) {
		menu.style.maxHeight = '0'
		menu.style.paddingTop = '0'
		menu.style.paddingBottom = '0'
		menu.classList.remove('menu--active')
	} else {
		menu.classList.add('menu--active')
		menu.style.maxHeight = '300px'
		menu.style.paddingTop = '20px'
		menu.style.paddingBottom = '20px'
	}
})

// Mask Phone
const element = document.getElementById('phone')
const maskOptions = { mask: '+{7} (000) 000-00-00' }
IMask(element, maskOptions)

// Active class Menu link
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
		const targetId = link.getAttribute('href').substring(1)
		document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' })
		setActiveLink(targetId)
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

// Bot Send Form
document.getElementById('form').addEventListener('submit', async e => {
	e.preventDefault()
	const form = e.target
	const name = form.name.value
	const phone = form.phone.value
	const question = form.question.value
	const consent = form.consent.checked ? '✅' : '❌'

	const message = `
📝 Новая заявка с формы:
------------------------------------
👤 Имя: ${name}
📞 Телефон: ${phone}
❓ Вопрос: ${question}
-----------------------------------
🔐 Согласие: ${consent}
`

	await fetch(`https://api.telegram.org/bot7886052411:AAFRj31H-lb2iX6Pbnybl03M3ETFZ6uWFMI/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: '6430141755',
			text: message
		})
	})

	form.reset()
})
