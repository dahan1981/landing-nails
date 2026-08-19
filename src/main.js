import './style.css'

const phone = '5521974334133'
const message = 'Oi, Thalita! Vi o site e gostaria de consultar os horários disponíveis para agendamento.'

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  link.target = '_blank'
  link.rel = 'noreferrer'
})

document.querySelector('#year').textContent = new Date().getFullYear()

const toggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('#nav')
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open')
  toggle.setAttribute('aria-expanded', String(open))
  document.body.classList.toggle('menu-open', open)
})
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open')
  document.body.classList.remove('menu-open')
  toggle.setAttribute('aria-expanded', 'false')
}))

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('in-view')
}), { threshold: 0.12 })
document.querySelectorAll('.section, .closing').forEach((el) => observer.observe(el))

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.gallery-item')]
  const current = document.querySelector('[data-carousel-current]')
  const prev = document.querySelector('[data-carousel-prev]')
  const next = document.querySelector('[data-carousel-next]')
  let startX = 0
  let startScroll = 0
  let dragging = false
  let moved = false

  const activeIndex = () => Math.round(carousel.scrollLeft / carousel.clientWidth)
  const update = () => { current.textContent = String(activeIndex() + 1).padStart(2, '0') }
  const goTo = (index) => carousel.scrollTo({ left: Math.max(0, Math.min(index, slides.length - 1)) * carousel.clientWidth, behavior: 'smooth' })

  carousel.addEventListener('pointerdown', (event) => {
    dragging = true
    moved = false
    startX = event.clientX
    startScroll = carousel.scrollLeft
    carousel.setPointerCapture(event.pointerId)
    carousel.classList.add('is-dragging')
  })
  carousel.addEventListener('pointermove', (event) => {
    if (!dragging) return
    const distance = event.clientX - startX
    if (Math.abs(distance) > 6) moved = true
    carousel.scrollLeft = startScroll - distance
  })
  const stopDrag = () => { dragging = false; carousel.classList.remove('is-dragging'); update() }
  carousel.addEventListener('pointerup', stopDrag)
  carousel.addEventListener('pointercancel', stopDrag)
  carousel.addEventListener('click', (event) => { if (moved) event.preventDefault() })
  carousel.addEventListener('scrollend', update)
  carousel.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true })
  carousel.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      carousel.scrollBy({ left: event.deltaY, behavior: 'smooth' })
      event.preventDefault()
    }
  }, { passive: false })
  prev.addEventListener('click', () => goTo(activeIndex() - 1))
  next.addEventListener('click', () => goTo(activeIndex() + 1))
})
