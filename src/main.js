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
