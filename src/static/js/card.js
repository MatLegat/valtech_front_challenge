const captionMovement = 0.25
const textMovement = 0.85
let activeCards = []

const getChildDivs = (card) =>
  Array.from(card.getElementsByClassName('content')[0].childNodes)
    .filter(node => node.tagName == 'DIV')

const getBtn = (card) =>
  Array.from(card.getElementsByClassName('content')[0].childNodes)
    .filter(node => node.tagName == 'BUTTON')[0]

const mouseOverAnimation = (card) => {
  if (activeCards.includes(card)) {
    return
  }
  activeCards.push(card)
  const childDivs = getChildDivs(card)
  const caption = childDivs[0]
  const text = childDivs[1]
  const button = getBtn(card)

  const currentCaptionTop = (parseInt(getComputedStyle(caption).top))
  caption.style.top = currentCaptionTop * captionMovement + 'px'

  const currentTextTop = (parseInt(getComputedStyle(caption).top))
  text.style.top = currentTextTop * textMovement + 'px'
  text.style.opacity = 1

  setTimeout(() => {
    if (!activeCards.includes(card)) {
      return
    }
    button.style.opacity = 1
  }, 400)
}

const mouseOutAnimation = (card, event) => {
  activeCards = activeCards.filter(c => c != card)
  const childDivs = getChildDivs(card)
  const caption = childDivs[0]
  const text = childDivs[1]
  const button = getBtn(card)

  caption.style.top = ''
  text.style.top = ''
  text.style.opacity = 0
  button.style.opacity = 0
}

window.onload = () => {
  const cards = Array.from(document.getElementsByClassName('card'))
  const animatedCards = cards.filter(card => !card.classList.contains('taller'))
  animatedCards.forEach(card => {
    card.onmouseover = () => mouseOverAnimation(card)
    card.onmouseleave = (event) => mouseOutAnimation(card, event)
  })
}
