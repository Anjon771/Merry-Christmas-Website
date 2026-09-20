/*=============== SNOW JS ===============*/
(function () {
  const canvas = document.createElement('canvas')
  canvas.id = 'snow-canvas'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '10'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)
  let isSnowing = true
  let animationFrameId = null

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  })

  const flakeCount = Math.min(80, Math.floor((width * height) / 12000))
  const flakes = []

  for (let i = 0; i < flakeCount; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 0.8 - 0.4,
      opacity: Math.random() * 0.7 + 0.3,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
    })
  }

  function render() {
    if (!isSnowing) return
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i]
      f.swing += f.swingSpeed
      f.x += f.speedX + Math.sin(f.swing) * 0.5
      f.y += f.speedY

      if (f.y > height) {
        f.y = -5
        f.x = Math.random() * width
      }
      if (f.x > width) f.x = 0
      else if (f.x < 0) f.x = width

      ctx.beginPath()
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`
      ctx.fill()
    }

    animationFrameId = requestAnimationFrame(render)
  }

  render()

  window.toggleSnow = function () {
    isSnowing = !isSnowing
    const icon = document.getElementById('icon-snow')
    const btn = document.getElementById('btn-toggle-snow')

    if (isSnowing) {
      canvas.style.display = 'block'
      if (icon) icon.className = 'ri-snowflake-line'
      if (btn) {
        btn.classList.remove('snow-off')
        btn.setAttribute('title', 'Pause Snowfall')
        btn.setAttribute('aria-label', 'Pause Snowfall')
      }
      render()
      if (window.showToast) window.showToast('Snowfall On', 'Delicate snowflakes are gently falling.')
    } else {
      canvas.style.display = 'none'
      if (icon) icon.className = 'ri-snowflake-line'
      if (btn) {
        btn.classList.add('snow-off')
        btn.setAttribute('title', 'Resume Snowfall')
        btn.setAttribute('aria-label', 'Resume Snowfall')
      }
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (window.showToast) window.showToast('Snowfall Paused', 'Snow animation has been paused.')
    }
  }
})()

