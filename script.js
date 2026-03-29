/**
 * LUIS & JOY | THE ENCHANTED JOURNEY
 * Complete Website Logic
 */

// 1. SELECTORS & INITIALIZATION
const canvas = document.getElementById('diamondDust');
const ctx = canvas.getContext('2d');
const openBtn = document.getElementById('openBtn');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('main-content');
const audio = document.getElementById('weddingMusic');
const musicToggle = document.getElementById('musicToggle');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const quickNav = document.getElementById('quickNav');
const backToTopBtn = document.getElementById('backToTop');

let particles = [];

// --- ✨ THE ENCHANTED FLOATING FIREFLIES ✨ ---
function createEnchantedDust() {
    const container = document.getElementById('magic-dust-container');
    const dustCount = window.innerWidth < 768 ? 30 : 60; // Less on mobile for performance

    for (let i = 0; i < dustCount; i++) {
        const dust = document.createElement('div');
        dust.classList.add('firefly');
        
        // Randomize size
        const size = Math.random() * 5 + 2 + 'px';
        dust.style.width = size;
        dust.style.height = size;

        // Random starting position (across the width)
        dust.style.left = Math.random() * 100 + 'vw';
        
        // Randomize start height so they don't all appear at once
        dust.style.top = Math.random() * 100 + 'vh';

        // Choose color: Soft Gold or Rose Pink
        const isPink = Math.random() > 0.5;
        dust.style.background = isPink ? '#e4b4b4' : '#f9e295';
        dust.style.boxShadow = isPink 
            ? '0 0 10px 2px rgba(228, 180, 180, 0.8)' 
            : '0 0 10px 2px rgba(249, 226, 149, 0.8)';

        // Randomize animation speed and sway distance
        const duration = Math.random() * 15 + 15 + 's';
        const sway = (Math.random() * 100 - 50) + 'px'; // Sway left/right up to 50px
        const delay = Math.random() * 10 + 's';

        dust.style.setProperty('--duration', duration);
        dust.style.setProperty('--sway', sway);
        dust.style.animationDelay = delay;
        
        container.appendChild(dust);
    }
}


// 2. ✨ THE ENCHANTED DIAMOND DUST (Twinkling Sparkles) ✨
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class DiamondDust {
    constructor() { 
        this.reset(); 
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5;
        this.opacity = Math.random();
        this.fade = Math.random() * 0.005 + 0.002;
        
        // Sparkle oscillation properties
        this.shimmerSpeed = Math.random() * 0.08 + 0.02;
        this.angle = Math.random() * Math.PI * 2;

        const rand = Math.random();
        if (rand > 0.4) this.color = '#e4b4b4'; // Pink
        else if (rand > 0.1) this.color = '#c5a059'; // Gold
        else this.color = '#ffffff'; // White shimmer
    }

    update() {
        this.opacity -= this.fade;
        this.angle += this.shimmerSpeed;
        
        // Drifts slightly upwards for a magical feel
        this.y -= 0.2; 
        
        if (this.opacity <= 0 || this.y < 0) {
            this.reset();
            // If it reset because of Y, put it back at the bottom
            if (this.y < 0) this.y = canvas.height;
        }
    }

    draw() {
        // Twinkle effect using Sine wave
        let sparkle = Math.abs(Math.sin(this.angle)); 
        const currentOpacity = this.opacity * sparkle;
        
        const alpha = Math.floor(currentOpacity * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = this.color + alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Populate particle field
for (let i = 0; i < 120; i++) {
    particles.push(new DiamondDust());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// 3. ✨ WEDDING COUNTDOWN TIMER ✨
const weddingDate = new Date("April 19, 2026 16:00:00").getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        const countdownWrap = document.getElementById("countdown");
        if (countdownWrap) countdownWrap.innerHTML = "<p class='hero-tagline'>OUR JOURNEY HAS BEGUN ✨</p>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
    if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
    if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
    if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);


// --- QUICK NAV LOGIC ---

// Function to handle showing the "Back to Top" arrow on scroll
function handleScroll() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Use window.scrollY (modern) or pageYOffset
    const scrollPos = window.scrollY || window.pageYOffset;

    if (scrollPos > 400) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.visibility = "visible";
        backToTopBtn.style.transform = "translateY(0)";
    } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.visibility = "hidden";
        backToTopBtn.style.transform = "translateY(20px)";
    }
}

// Listen for scrolls
window.addEventListener('scroll', handleScroll);


// 4. ✨ NAVIGATION LOGIC (OPEN INVITATION) ✨
// if (openBtn) {
//     openBtn.addEventListener('click', () => {
//         createEnchantedDust();

//         //const qNav = document.getElementById('quickNav');
//         const mobileNav = document.querySelector('.mobile-nav');
//         if (mobileNav) {
//             mobileNav.classList.add('show-it');
//         }

//         if (mobileNav) quickNav.classList.add('show-it');
//         // 1. Handle Music
//         if (audio) {
//             audio.play()
//                 .then(() => console.log("Audio playing"))
//                 .catch(err => console.log("Playback blocked:", err));
//         }
        
//         const mainNav = document.getElementById('mainNav');
//         if (mainNav) {
//             mainNav.classList.add('show-it');
//         }
//         // 2. Show Music Toggle IMMEDIATELY
//         if (musicToggle) {
//             musicToggle.classList.add('show-it'); // This matches the CSS above
//         }

//         // 3. Start Transition
//         overlay.style.opacity = '0';
//         overlay.style.pointerEvents = 'none'; // Makes overlay "clickable-through" immediately
        
//         setTimeout(() => {
//             overlay.style.display = 'none';
//             mainContent.classList.remove('hidden');
//             mainContent.style.display = 'block';
            
//             setTimeout(() => {
//                 mainContent.style.opacity = '1';
//                 const anims = document.querySelectorAll('.animate-up');
//                 anims.forEach((el, i) => {
//                     setTimeout(() => el.classList.add('reveal'), 300 * i);
//                 });
//             }, 100);
//         }, 1500);
//     });
// }

// 4. ✨ NAVIGATION LOGIC (OPEN INVITATION) ✨
// if (openBtn) {
//     openBtn.addEventListener('click', () => {
//         // Start the magical firefly background
//         createEnchantedDust();

//         // 1. Show the Hamburger Menu (Mobile Navigation)
//         const mobileNav = document.querySelector('.mobile-nav');
//         if (mobileNav) {
//             mobileNav.classList.add('show-it');
//         }

//         // 2. Show the Quick Nav (Bottom RSVP & Back to Top buttons)
//         if (quickNav) {
//             quickNav.classList.add('show-it');
//         }

//         // 3. Show the Floating Music Toggle button
//         if (musicToggle) {
//             musicToggle.classList.add('show-it');
//         }

//         // 4. Handle Music Playback
//         if (audio) {
//             audio.play()
//                 .then(() => console.log("Audio playing"))
//                 .catch(err => console.log("Playback blocked by browser:", err));
//         }

//         // 5. Start the Entrance Screen Transition
//         overlay.style.opacity = '0';
//         overlay.style.transition = 'opacity 1.5s ease';
//         overlay.style.pointerEvents = 'none'; // Allows clicking through immediately

//         // 6. Reveal the Main Website Content
//         setTimeout(() => {
//             overlay.style.display = 'none';
            
//             if (mainContent) {
//                 mainContent.classList.remove('hidden');
//                 mainContent.style.display = 'block';
                
//                 // Small delay to ensure display:block has rendered before fading in
//                 setTimeout(() => {
//                     mainContent.style.opacity = '1';
//                     mainContent.style.transition = 'opacity 1s ease';
                    
//                     // Trigger "Animate Up" for all sections
//                     const anims = document.querySelectorAll('.animate-up');
//                     anims.forEach((el, i) => {
//                         setTimeout(() => el.classList.add('reveal'), 200 * i);
//                     });
//                 }, 50);
//             }
//         }, 1500);
//     });
// }

// 4. ✨ NAVIGATION LOGIC (OPEN INVITATION) ✨
if (openBtn) {
    openBtn.addEventListener('click', () => {
        // Start fireflies
        createEnchantedDust();

        // Show UI Elements
        const mobileNav = document.querySelector('.mobile-nav');
        const qNav = document.getElementById('quickNav');
        const musicBtn = document.getElementById('musicToggle');

        if (mobileNav) mobileNav.classList.add('show-it');
        if (qNav) qNav.classList.add('show-it');
        if (musicBtn) musicBtn.classList.add('show-it');

        // Handle Music
        if (audio) {
            audio.play().catch(err => console.log("Music blocked:", err));
        }

        // Start Transition
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        
        setTimeout(() => {
            overlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.display = 'block';
            
            setTimeout(() => {
                mainContent.style.opacity = '1';
                // Trigger animations
                const anims = document.querySelectorAll('.animate-up');
                anims.forEach((el, i) => {
                    setTimeout(() => el.classList.add('reveal'), 150 * i);
                });
            }, 100);
        }, 1500);
    });
}
// 2. Scroll Logic for "Back to Top" Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.transform = "translateY(0)";
        backToTopBtn.style.pointerEvents = "auto";
    } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.transform = "translateY(20px)";
        backToTopBtn.style.pointerEvents = "none";
    }
});

// Back to Top Click Action
document.addEventListener('click', function(e) {
    if (e.target.closest('#backToTop')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});


// 3. Smooth Scroll to Top
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 5. ✨ MUSIC TOGGLE LOGIC ✨
if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents click from bubbling up
        if (audio.paused) {
            audio.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            musicToggle.classList.remove('muted');
        } else {
            audio.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicToggle.classList.add('muted');
        }
    });
}

// 6. ✨ LOAD MORE IMAGES LOGIC ✨
if (loadMoreBtn) {
    const hiddenPhotos = document.querySelectorAll('.hidden-photo');
    loadMoreBtn.addEventListener('click', function() {
        hiddenPhotos.forEach((photo, index) => {
            photo.style.display = 'block';
            setTimeout(() => {
                photo.style.opacity = '1';
                photo.style.transform = 'translateY(0)';
            }, 150 * index); 
        });

        // Hide button after revealing all
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.display = 'none';
        }, 500);
    });
}

// 7. ✨ MAGICAL RSVP FORM SUBMISSION ✨
// --- UPDATE THIS LINE IN YOUR SCRIPT.JS ---
const rsvpForm = document.getElementById('rsvpForm');
const scriptURL = 'https://script.google.com/macros/s/AKfycbzF_X30-TUy117K6crAp7DvlcnCi_jRw14DVDHDBieellh2-hCzpRwIKIF1hWF7YrugvA/exec';

if (rsvpForm) {
    rsvpForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const btn = rsvpForm.querySelector('button');
        const container = document.querySelector('.dark-glass');
        
        // Show loading state
        btn.disabled = true;
        btn.innerHTML = "SENDING LOVE...";

        // Send data to your Google Sheet
        fetch(scriptURL, { method: 'POST', body: new FormData(rsvpForm)})
            .then(response => {
                console.log('Success!', response);
                
                // Show Magical Success Message
                container.innerHTML = `
                    <div class="magic-sparkle-icon reveal" style="font-size: 3.5rem; margin-bottom: 25px; color: #e4b4b4;">✨</div>
                    <h4 class="section-title-script gold-text" style="font-size: 3.5rem; margin-bottom: 10px; color: #f9e295;">Thank You!</h4>
                    <p class="white-text" style="font-size: 1.4rem; color: #ffffff; font-style: italic;">
                        Your response has been captured in our hearts. <br> 
                        We can't wait to see you soon! ✈️
                    </p>
                `;
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.disabled = false;
                btn.innerHTML = "TRY AGAIN";
                alert("Something went wrong. Please try again!");
            });
    });
}

// --- MOBILE NAV LOGIC ---
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-links a');

// 1. Toggle Menu Open/Close
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('open');
    });
}

// 2. Close Menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navOverlay.classList.remove('open');
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));


const sheetName = 'Sheet1' // Change this if your tab is named differently
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header) {
      if (header === 'Timestamp') return new Date()
      if (header === 'Name') return e.parameter.name
      if (header === 'Attendance') return e.parameter.attendance
      return ''
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (f) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': f }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

