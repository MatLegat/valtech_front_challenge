
const loadImage = (img) => {
  img.setAttribute('src', img.getAttribute('data-src'))
  img.onload = () => {
    img.removeAttribute('data-src')
  }
}

const loadImagesOnViewport = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const imgElements = Array.from(document.getElementsByTagName('img'))
  const notLoadedImages = imgElements.filter(img => !img.getAttribute('src'))
  const imagesToLoad = notLoadedImages.filter(img => {
    const imgBoundingRect = img.parentElement.getBoundingClientRect()
    return imgBoundingRect.top < viewportHeight && imgBoundingRect.bottom > 0
  })
  imagesToLoad.forEach(loadImage)
}

window.onscroll = loadImagesOnViewport
window.onresize = loadImagesOnViewport

const oldOnload = window.onload
window.onload = () => {
  if (typeof(oldOnload) == 'function') {
    oldOnload()
  }
  loadImagesOnViewport()
}
