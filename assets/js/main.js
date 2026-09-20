/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    if(navMenu) navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    if(header){
        window.scrollY >= 50 ? header.classList.add('blur-header') 
                             : header.classList.remove('blur-header')
    }
}
window.addEventListener('scroll', blurHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(sectionsClass){
            if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link')
            } else {
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUpBtn = document.getElementById('scroll-up')
    if(scrollUpBtn){
        window.scrollY >= 350 ? scrollUpBtn.classList.add('show-scroll')
                              : scrollUpBtn.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollUp)

/*=============== DAY COUNTER FOR CHRISTMAS ===============*/
const homeTitle = document.getElementById('home-title')
const statsDays = document.getElementById('stats-days-count')
const statsHours = document.getElementById('stats-hours-count')

const christmasCountdown = () => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentDay = now.getDate()
    const currentYear = now.getFullYear()

    let nextChristmasYear = currentYear
    if (currentMonth === 11 && currentDay > 25) {
        nextChristmasYear += 1
    }

    if (currentMonth === 11 && currentDay === 25) {
        if(homeTitle) homeTitle.innerHTML = `<span>Merry Christmas!</span><br>Today is Christmas Day`
        if(statsDays) statsDays.textContent = '00'
        if(statsHours) statsHours.textContent = '00'
        return
    }

    const christmasDate = new Date(nextChristmasYear, 11, 25, 0, 0, 0)
    const timeLeft = christmasDate - now

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
    const seconds = Math.floor((timeLeft / 1000) % 60)

    const format = (n) => (n < 10 ? `0${n}` : `${n}`)

    if(statsDays) statsDays.textContent = format(days)
    if(statsHours) statsHours.textContent = format(hours)

    if(homeTitle){
        if (days > 0) {
            homeTitle.innerHTML = `Last <span>${format(days)}</span> Days To Receive Christmas`
        } else if (hours > 0) {
            homeTitle.innerHTML = `Last <span>${format(hours)}:${format(minutes)}</span> Hours To Receive Christmas`
        } else if (minutes > 0) {
            homeTitle.innerHTML = `Last <span>${format(minutes)}:${format(seconds)}</span> Minutes To Receive Christmas`
        } else {
            homeTitle.innerHTML = `Last <span>00:00:${format(seconds)}</span> Seconds To Receive Christmas`
        }
    }
}

if(homeTitle){
    christmasCountdown()
    setInterval(christmasCountdown, 1000)
}

/*=============== TOAST NOTIFICATIONS ===============*/
let toastTimeout = null
window.showToast = (title, message) => {
    const toast = document.getElementById('toast')
    const toastTitle = document.getElementById('toast-title')
    const toastMsg = document.getElementById('toast-msg')

    if(!toast) return
    if(toastTitle) toastTitle.textContent = title
    if(toastMsg) toastMsg.textContent = message

    toast.classList.add('show-toast')

    if(toastTimeout) clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show-toast')
    }, 4000)
}

/*=============== CARD CUSTOMIZER & LIVE PREVIEW ===============*/
const themes = {
    santa: {
        badge: "Santa's Delivery",
        stamp: 'Merry Christmas',
        img: 'assets/img/santa.png',
        fallback: 'https://cdn.jsdelivr.net/gh/bedimcode/responsive-christmas-website-3@main/assets/img/santa.png',
        cardClass: ''
    },
    golden: {
        badge: 'Golden Starlight',
        stamp: 'Joy & Peace',
        img: 'assets/img/bell.png',
        fallback: 'https://cdn.jsdelivr.net/gh/bedimcode/responsive-christmas-website-3@main/assets/img/bell.png',
        cardClass: 'theme-golden'
    },
    snowman: {
        badge: 'Winter Snowman',
        stamp: 'Season Greetings',
        img: 'assets/img/snowman.jpg',
        fallback: 'src/assets/images/card_snowman_1789915242435.jpg',
        cardClass: 'theme-snowman'
    }
}

let currentTheme = 'santa'

window.selectCardTheme = (themeKey) => {
    if(!themes[themeKey]) return
    currentTheme = themeKey

    const canvas = document.getElementById('festive-card-canvas')
    const badge = document.getElementById('card-preview-theme-badge')
    const stamp = document.getElementById('card-preview-stamp')
    const img = document.getElementById('card-preview-img')

    if(canvas){
        canvas.className = 'festive-card ' + themes[themeKey].cardClass
    }
    if(badge) badge.textContent = themes[themeKey].badge
    if(stamp) stamp.textContent = themes[themeKey].stamp
    if(img) {
        img.onerror = function() {
            if(window.handleImgError) {
                window.handleImgError(this);
            } else if(themes[themeKey].fallback) {
                this.src = themes[themeKey].fallback;
            }
        };
        img.src = themes[themeKey].img;
    }

    // Update pill styles
    document.querySelectorAll('.theme-pill').forEach(pill => pill.classList.remove('active'))
    const activePill = document.getElementById('pill-' + themeKey)
    if(activePill) activePill.classList.add('active')

    // Smooth scroll to customizer if clicked from card article
    const customizer = document.getElementById('card-customizer')
    if(customizer){
        customizer.scrollIntoView({ behavior: 'smooth' })
    }
}

// Live inputs update
const inputTo = document.getElementById('input-card-to')
const inputMsg = document.getElementById('input-card-message')
const inputFrom = document.getElementById('input-card-from')

const previewTo = document.getElementById('card-preview-to')
const previewMsg = document.getElementById('card-preview-message')
const previewFrom = document.getElementById('card-preview-from')

if(inputTo && previewTo){
    inputTo.addEventListener('input', (e) => {
        previewTo.textContent = `To: ${e.target.value || 'Dearest Friend'}`
    })
}

if(inputMsg && previewMsg){
    inputMsg.addEventListener('input', (e) => {
        previewMsg.textContent = `"${e.target.value || 'Wishing you holiday joy and blessings!'}"`
    })
}

if(inputFrom && previewFrom){
    inputFrom.addEventListener('input', (e) => {
        previewFrom.textContent = `Warmly from, ${e.target.value || 'Santa’s Helper'}`
    })
}

// Greeting Presets
window.setGreetingPreset = (presetNum) => {
    if(!inputMsg || !previewMsg) return
    let text = ''
    if(presetNum === 1){
        text = 'May your holidays be filled with joy, peace, laughter, and endless holiday wonder!'
    } else if(presetNum === 2){
        text = 'Sending you warm winter hugs, steaming cups of cocoa, and the happiest moments this holiday!'
    } else {
        text = 'May your days be merry and bright, and may all your Christmases be white!'
    }
    inputMsg.value = text
    previewMsg.textContent = `"${text}"`
    playHolidayChime()
}

// Card Counter & Dispatch with Confetti
let cardsSent = 2
let totalCardsCounter = 12482

window.sendCustomCard = () => {
    cardsSent++
    totalCardsCounter++

    const navCount = document.getElementById('nav-card-count')
    const statSent = document.getElementById('stats-sent-count')

    if(navCount) navCount.textContent = cardsSent
    if(statSent) statSent.textContent = totalCardsCounter.toLocaleString()

    triggerConfetti()
    playHolidayChime()

    const toVal = inputTo ? inputTo.value : 'Friend'
    window.showToast('Card Dispatched with Love!', `Christmas card dispatched for ${toVal}! Happy Holidays!`)
}

/*=============== CONFETTI CELEBRATION EFFECT ===============*/
function triggerConfetti() {
    const colors = ['#d2ec57', '#ffffff', '#ff4d4d', '#ffd700', '#2cb67d']
    const container = document.body

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div')
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.floor(Math.random() * 8) + 6
        
        confetti.style.position = 'fixed'
        confetti.style.zIndex = '999'
        confetti.style.width = `${size}px`
        confetti.style.height = `${size * 1.4}px`
        confetti.style.backgroundColor = color
        confetti.style.borderRadius = '2px'
        confetti.style.left = `${Math.random() * 80 + 10}vw`
        confetti.style.top = '-20px'
        confetti.style.pointerEvents = 'none'
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`
        confetti.style.transition = 'transform 2.5s ease-out, top 2.5s ease-out, opacity 2.5s ease-out'
        
        container.appendChild(confetti)

        requestAnimationFrame(() => {
            confetti.style.top = `${window.innerHeight + 50}px`
            confetti.style.transform = `rotate(${Math.random() * 720}deg) scale(0.6)`
            confetti.style.opacity = '0'
        })

        setTimeout(() => {
            confetti.remove()
        }, 2600)
    }
}

/*=============== WEB AUDIO API HOLIDAY BELLS SYNTHESIZER ===============*/
let audioCtx = null

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        audioCtx = new AudioContext()
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume()
    }
    return audioCtx
}

window.ringBell = (frequency, noteName) => {
    try {
        const ctx = getAudioContext()
        const now = ctx.currentTime

        // Primary bell oscillator
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        // Harmonic overtone oscillator for bright bell chime
        const overtoneOsc = ctx.createOscillator()
        const overtoneGain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(frequency, now)

        overtoneOsc.type = 'triangle'
        overtoneOsc.frequency.setValueAtTime(frequency * 2.76, now)

        gain.gain.setValueAtTime(0.35, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)

        overtoneGain.gain.setValueAtTime(0.12, now)
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)

        osc.connect(gain)
        overtoneOsc.connect(overtoneGain)
        gain.connect(ctx.destination)
        overtoneGain.connect(ctx.destination)

        osc.start(now)
        overtoneOsc.start(now)
        osc.stop(now + 1.25)
        overtoneOsc.stop(now + 0.65)

        // Visual feedback on keyboard key
        const keyMap = {
            261.63: 'bell-key-c',
            293.66: 'bell-key-d',
            329.63: 'bell-key-e',
            349.23: 'bell-key-f',
            392.00: 'bell-key-g',
            440.00: 'bell-key-a',
            523.25: 'bell-key-high-c'
        }
        const keyId = keyMap[frequency]
        if(keyId){
            const el = document.getElementById(keyId)
            if(el){
                el.classList.add('playing')
                setTimeout(() => el.classList.remove('playing'), 200)
            }
        }
    } catch(err) {
        console.warn('Audio chime note:', err)
    }
}

window.playHolidayChime = () => {
    const notes = [329.63, 392.00, 523.25]
    notes.forEach((freq, idx) => {
        setTimeout(() => {
            window.ringBell(freq)
        }, idx * 140)
    })
}

// Jingle Bells tune: E E E - E E E - E G C D E
let isSongPlaying = false
window.playJingleBellsSong = () => {
    if(isSongPlaying) return
    isSongPlaying = true

    const song = [
        { freq: 329.63, delay: 0 },    // E
        { freq: 329.63, delay: 280 },  // E
        { freq: 329.63, delay: 560 },  // E (hold)
        { freq: 329.63, delay: 1100 }, // E
        { freq: 329.63, delay: 1380 }, // E
        { freq: 329.63, delay: 1660 }, // E (hold)
        { freq: 329.63, delay: 2200 }, // E
        { freq: 392.00, delay: 2480 }, // G
        { freq: 261.63, delay: 2760 }, // C
        { freq: 293.66, delay: 3040 }, // D
        { freq: 329.63, delay: 3320 }, // E
    ]

    song.forEach(note => {
        setTimeout(() => {
            window.ringBell(note.freq)
        }, note.delay)
    })

    setTimeout(() => {
        isSongPlaying = false
    }, 4000)
}

/*=============== FORM SUBMISSION HANDLERS ===============*/
window.handleContactSubmit = (e) => {
    e.preventDefault()
    const nameInput = document.getElementById('contact-name')
    const name = nameInput ? nameInput.value : 'Friend'
    
    window.showToast('Note Dispatched!', `Thank you ${name}, your holiday letter has been sent straight to Santa's workshop!`)
    e.target.reset()
}

window.handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const emailInput = document.getElementById('footer-newsletter-email')
    const email = emailInput ? emailInput.value : ''

    window.showToast('Subscribed!', `You are on Santa's priority holiday list. Merry Christmas!`)
    e.target.reset()
}


