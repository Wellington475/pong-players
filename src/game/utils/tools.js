const constrain = (n, min, max) => {
    return Math.max(Math.min(n, max), min)
}

const mapScale = (n, start1, stop1, start2, stop2) => {
    return ((n - start1)/(stop1 - start1)) * (stop2 - start2) + start2
}

const isMobile = () => {
  return /Android|iPhone|iPad|iPod|Windos Phone/i.test(window.navigator.userAgent)
}

module.exports = { constrain, mapScale, isMobile }
