/* ============================================================
   CoffeeEQ — One-Stop Coffee Equipment Solution Provider
   Global JavaScript (v2)
   ============================================================ */

/* ============ NAV SCROLL SHADOW ============ */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ============ HAMBURGER MENU ============ */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
  hamburger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hamburger.click(); }
  });
})();

/* ============ SCROLL REVEAL ============ */
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function (el) { observer.observe(el); });
})();

/* ============ COUNT UP ANIMATION ============ */
(function () {
  const allCountEls = [...document.querySelectorAll('.stat-number[data-target]'), ...document.querySelectorAll('.stat-dark-number[data-target]')];
  if (!allCountEls.length) return;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { animateCount(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.3 });
  allCountEls.forEach(function (el) { observer.observe(el); });

  function animateCount(container) {
    const target = parseInt(container.getAttribute('data-target'));
    const countEl = container.querySelector('.count');
    if (!countEl) return;
    const duration = 2000, startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      countEl.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else countEl.textContent = target;
    }
    requestAnimationFrame(update);
  }
})();

/* ============ FAQ TOGGLE ============ */
(function () {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      // Close other items
      faqItems.forEach(function (other) {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });
})();

/* ============ CONTACT FORM ============ */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.querySelector('#formName').value.trim();
    const email = form.querySelector('#formEmail').value.trim();
    const message = form.querySelector('#formMessage').value.trim();
    if (!name || !email || !message) { alert('Please fill in the required fields.'); return; }
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending...'; btn.disabled = true;
    setTimeout(function () {
      btn.textContent = 'Sent Successfully!'; btn.style.background = '#4CAF50';
      setTimeout(function () { form.reset(); btn.textContent = 'Send Inquiry'; btn.disabled = false; btn.style.background = ''; }, 2000);
    }, 1500);
  });
})();

/* ============ SMOOTH SCROLL ============ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 0;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight, behavior: 'smooth' });
      }
    });
  });
})();
