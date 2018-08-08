const captionMovement = 120
const textMovement = 25
let activeCards = []

const getChildDivs = (card) =>
  Array.from(card.getElementsByClassName('content')[0].childNodes)
    .filter(node => node.tagName == 'DIV')

const mouseOverAnimation = (card) => {
  if (activeCards.includes(card)) {
    return
  }
  activeCards.push(card)
  const childDivs = getChildDivs(card)
  const caption = childDivs[0]
  const text = childDivs[1]

  const currentCaptionTop = (parseInt(getComputedStyle(caption).top))
  caption.style.top = currentCaptionTop - captionMovement + 'px'

  const currentTextTop = (parseInt(getComputedStyle(caption).top))
  text.style.opacity = 1
  text.style.top = currentTextTop - textMovement + 'px'

  console.log(caption)
}

const mouseOutAnimation = (card, event) => {
  activeCards = activeCards.filter(c => c != card)
  const childDivs = getChildDivs(card)
  const caption = childDivs[0]
  const text = childDivs[1]
  caption.style.top = ''
  text.style.top = ''
  text.style.opacity = 0
}

window.onload = () => {
  const cards = Array.from(document.getElementsByClassName('card'))
  const animatedCards = cards.filter(card => !card.classList.contains('taller'))
  animatedCards.forEach(card => {
    card.onmouseover = () => mouseOverAnimation(card)
    card.onmouseleave = (event) => mouseOutAnimation(card, event)
  })
}
