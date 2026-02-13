import './style.css';

// ===== Preloader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 600);
});

// ===== Initialize Lucide Icons =====
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  if (window.lucide) window.lucide.createIcons();

  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initScrollProgress();
  initStats();
  initQuoteForm();
  initFAQ();
  initTestimonials();
  initBackToTop();
  initParticles();
  initSmoothScroll();
  initTiltCards();
  initHeroParallax();
  initHeroTyping();
  initButtonRipple();
  initWhatsAppTooltip();
  initPlanToggle();
});

// ===== Smooth Scroll for all anchor links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href') || '');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== Scroll Progress Bar =====
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = `${progress}%`;
  });
}

// ===== Header Scroll =====
function initHeader() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(section => {
      const el = section as HTMLElement;
      const top = el.offsetTop - 120;
      if (window.scrollY >= top) current = el.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) link.classList.add('active');
    });
  });
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const links = document.querySelectorAll('.mobile-link, .btn-mobile');

  const toggle = () => {
    btn?.classList.toggle('active');
    menu?.classList.toggle('active');
    overlay?.classList.toggle('active');
    document.body.style.overflow = menu?.classList.contains('active') ? 'hidden' : '';
  };

  btn?.addEventListener('click', toggle);
  overlay?.addEventListener('click', toggle);
  links.forEach(link => link.addEventListener('click', toggle));
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.coverage-card, .step-card, .plan-card, .contact-card, .stat-card, .faq-item, .quote-benefit, .section-header, .quote-form').forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
  });
}

// ===== Stats Counter =====
function initStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.count || '0');
        const suffix = el.dataset.suffix || '';
        const numEl = el.querySelector('.stat-number') as HTMLElement;
        if (!numEl) return;

        let step = 0;
        const duration = 1800;
        const steps = 60;

        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);

          if (step >= steps) {
            numEl.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            numEl.textContent = current.toLocaleString() + suffix;
          }
        }, duration / steps);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-card').forEach(el => observer.observe(el));
}

// ===== Hero Typing Effect =====
function initHeroTyping() {
  const typingEl = document.getElementById('hero-typing');
  if (!typingEl) return;

  const words = ['Ride Today', 'Motorcycle', 'Investment', 'Family'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pauseTime = 0;

  function type() {
    const currentWord = words[wordIndex];

    if (pauseTime > 0) {
      pauseTime--;
      requestAnimationFrame(() => setTimeout(type, 50));
      return;
    }

    if (!isDeleting) {
      typingEl!.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        pauseTime = 40; // Pause before deleting
        isDeleting = true;
      }
    } else {
      typingEl!.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(type, speed);
  }

  setTimeout(type, 1000);
}

// ===== Bike Models Data =====
const bikeModels: Record<string, string[]> = {
  honda: ['CD 70', 'CD 70 Dream', 'CG 125', 'CG 125 Self', 'CB 125F', 'CB 150F', 'CB 150F SE', 'Pridor', 'Deluxe'],
  yamaha: ['YBR 125', 'YBR 125G', 'YB 125Z', 'YB 125Z DX', 'NMAX 155'],
  suzuki: ['GD 110S', 'GD 110', 'GS 150', 'GS 150 SE', 'GSX 125', 'Gixxer 150'],
  united: ['US 70', 'US 100', 'US 125'],
  'road-prince': ['Passion 70', 'Passion Plus', 'Wego 100', 'RP 150'],
  'super-power': ['SP 70', 'SP 100', 'SP 125', 'Archi 150'],
  'hi-speed': ['SR 70', 'SR 100', 'Alpha 100'],
  metro: ['MR 70', 'MR 100 Plus'],
  crown: ['CR 70', 'CR 100', 'Lifan 150'],
  other: ['Other Model']
};

// ===== Quote Form =====
function initQuoteForm() {
  const form = document.getElementById('quote-form') as HTMLFormElement;
  const brandSelect = document.getElementById('bike-brand') as HTMLSelectElement;
  const modelSelect = document.getElementById('bike-model') as HTMLSelectElement;
  const yearSelect = document.getElementById('bike-year') as HTMLSelectElement;
  const valueInput = document.getElementById('bike-value') as HTMLInputElement;

  // Populate years
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= currentYear - 15; y--) {
    const opt = document.createElement('option');
    opt.value = String(y);
    opt.textContent = String(y);
    yearSelect?.appendChild(opt);
  }

  // Brand -> Model dependency
  brandSelect?.addEventListener('change', () => {
    const models = bikeModels[brandSelect.value] || [];
    if (modelSelect) {
      modelSelect.innerHTML = '<option value="">Select Model</option>';
      models.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.toLowerCase().replace(/\s+/g, '-');
        opt.textContent = m;
        modelSelect.appendChild(opt);
      });
    }
  });

  // Format currency input with Rs prefix
  valueInput?.addEventListener('input', () => {
    let val = valueInput.value.replace(/[^0-9]/g, '');
    if (val) valueInput.value = parseInt(val).toLocaleString();
  });

  // Step navigation with validation
  const step1Next = document.getElementById('step-1-next');
  const step2Prev = document.getElementById('step-2-prev');
  const step2Next = document.getElementById('step-2-next');
  const step3Prev = document.getElementById('step-3-prev');

  step1Next?.addEventListener('click', () => {
    if (validateStep(1)) goToStep(2);
  });
  step2Prev?.addEventListener('click', () => goToStep(1));
  step2Next?.addEventListener('click', () => {
    if (validateStep(2)) goToStep(3);
  });
  step3Prev?.addEventListener('click', () => goToStep(2));

  // Form submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('step-3')?.classList.remove('active');
    const success = document.getElementById('step-success');
    if (success) { success.style.display = 'block'; success.classList.add('active'); }
    document.querySelector('.form-steps')?.setAttribute('style', 'display:none');
    // @ts-ignore
    if (window.lucide) window.lucide.createIcons();
  });

  // New Quote
  document.getElementById('new-quote-btn')?.addEventListener('click', () => {
    form?.reset();
    const success = document.getElementById('step-success');
    if (success) { success.style.display = 'none'; success.classList.remove('active'); }
    document.querySelector('.form-steps')?.removeAttribute('style');
    goToStep(1);
  });
}

function validateStep(step: number): boolean {
  let valid = true;
  let panel = document.getElementById(`step-${step}`);
  if (!panel) return true;

  const requiredFields = panel.querySelectorAll('[required]') as NodeListOf<HTMLInputElement | HTMLSelectElement>;
  requiredFields.forEach(field => {
    const group = field.closest('.form-group');
    if (!field.value || field.value === '') {
      valid = false;
      group?.classList.add('error');
      field.classList.add('shake');
      setTimeout(() => {
        field.classList.remove('shake');
      }, 600);
    } else {
      group?.classList.remove('error');
    }
  });

  if (!valid) {
    // Find first empty field and focus it
    const firstInvalid = panel.querySelector('[required]:invalid, .error [required]') as HTMLElement;
    firstInvalid?.focus();
  }

  return valid;
}

function goToStep(step: number) {
  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`step-${step}`)?.classList.add('active');

  document.querySelectorAll('.form-step').forEach(s => {
    const sNum = parseInt(s.getAttribute('data-step') || '0');
    s.classList.remove('active', 'completed');
    if (sNum === step) s.classList.add('active');
    else if (sNum < step) s.classList.add('completed');
  });

  // Animate step line progress
  document.querySelectorAll('.step-line').forEach((line, i) => {
    const el = line as HTMLElement;
    el.style.background = i < step - 1 ? 'linear-gradient(135deg, #0c7fd9, #0dab8b)' : '#e2e8f0';
    el.style.transition = 'background 0.4s ease';
  });

  if (step === 3) populateReview();

  // Re-init lucide icons for any new icons
  // @ts-ignore
  if (window.lucide) setTimeout(() => window.lucide.createIcons(), 100);
}

function populateReview() {
  const brandEl = document.getElementById('bike-brand') as HTMLSelectElement;
  const modelEl = document.getElementById('bike-model') as HTMLSelectElement;
  const yearEl = document.getElementById('bike-year') as HTMLSelectElement;
  const ccEl = document.getElementById('bike-cc') as HTMLSelectElement;
  const valueEl = document.getElementById('bike-value') as HTMLInputElement;
  const cityEl = document.getElementById('bike-city') as HTMLSelectElement;
  const nameEl = document.getElementById('full-name') as HTMLInputElement;
  const phoneEl = document.getElementById('phone') as HTMLInputElement;

  const items = document.getElementById('review-items');
  if (!items) return;

  const data = [
    ['Bike Brand', brandEl?.selectedOptions[0]?.text || '-'],
    ['Bike Model', modelEl?.selectedOptions[0]?.text || '-'],
    ['Year', yearEl?.value || '-'],
    ['Engine', (ccEl?.value || '-') + 'cc'],
    ['Market Value', 'Rs ' + (valueEl?.value || '-')],
    ['City', cityEl?.selectedOptions[0]?.text || '-'],
    ['Name', nameEl?.value || '-'],
    ['Phone', '+92 ' + (phoneEl?.value || '-')],
  ];

  items.innerHTML = data.map(([label, val], i) =>
    `<div class="review-item" style="animation-delay:${i * 0.05}s"><span>${label}</span><span>${val}</span></div>`
  ).join('');

  const val = parseInt((valueEl?.value || '0').replace(/,/g, ''));
  const premium = Math.max(999, Math.round(val * 0.02));
  const premiumEl = document.getElementById('premium-value');
  if (premiumEl) {
    // Animated counter for premium
    let current = 0;
    const step = Math.ceil(premium / 30);
    const timer = setInterval(() => {
      current += step;
      if (current >= premium) {
        current = premium;
        clearInterval(timer);
      }
      premiumEl.textContent = 'Rs ' + current.toLocaleString();
    }, 30);
  }
}

// ===== FAQ Accordion =====
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-question');

  // Open first FAQ by default
  const firstItem = document.querySelector('.faq-item');
  const firstAnswer = firstItem?.querySelector('.faq-answer') as HTMLElement;
  if (firstItem && firstAnswer) {
    firstItem.classList.add('active');
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }

  faqItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item?.querySelector('.faq-answer') as HTMLElement;
      const isActive = item?.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('active');
        const fa = fi.querySelector('.faq-answer') as HTMLElement;
        if (fa) fa.style.maxHeight = '0';
      });

      if (!isActive && answer) {
        item?.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ===== Testimonials Slider =====
function initTestimonials() {
  const track = document.getElementById('testimonial-track');
  const cards = track?.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('slider-dots');
  if (!track || !cards || cards.length === 0) return;

  let current = 0;
  let visibleCards = getVisibleCards();
  let maxSlide = Math.max(0, cards.length - visibleCards);

  function getVisibleCards() {
    return window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    maxSlide = Math.max(0, cards!.length - visibleCards);
    for (let i = 0; i <= maxSlide; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => slideTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  updateDots();

  function slideTo(index: number) {
    current = Math.max(0, Math.min(index, maxSlide));
    const cardWidth = (cards![0] as HTMLElement).offsetWidth + 24;
    (track as HTMLElement).style.transform = `translateX(-${current * cardWidth}px)`;
    dotsContainer?.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  document.getElementById('slider-prev')?.addEventListener('click', () => slideTo(current - 1));
  document.getElementById('slider-next')?.addEventListener('click', () => slideTo(current + 1));

  let autoSlide = setInterval(() => slideTo(current < maxSlide ? current + 1 : 0), 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => slideTo(current < maxSlide ? current + 1 : 0), 5000);
  });

  window.addEventListener('resize', () => {
    visibleCards = getVisibleCards();
    maxSlide = Math.max(0, cards!.length - visibleCards);
    updateDots();
    slideTo(Math.min(current, maxSlide));
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) slideTo(current + 1);
      else slideTo(current - 1);
    }
  });
}

// ===== Back to Top =====
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn?.classList.toggle('visible', window.scrollY > 500);
  });
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== Particles (Light Theme) =====
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const colors = [
    'rgba(12,127,217,0.06)',
    'rgba(13,171,139,0.05)',
    'rgba(12,127,217,0.04)',
    'rgba(13,171,139,0.06)',
  ];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = 3 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      background: ${color}; border-radius: 50%;
      top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
      animation: particleDrift ${6 + Math.random() * 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(particle);
  }

  // Add geometric shapes
  for (let i = 0; i < 6; i++) {
    const shape = document.createElement('div');
    const size = 20 + Math.random() * 40;
    const isCircle = Math.random() > 0.5;
    shape.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      border: 1px solid rgba(12,127,217,0.06);
      ${isCircle ? 'border-radius: 50%' : 'border-radius: 4px; transform: rotate(45deg)'};
      top: ${10 + Math.random() * 80}%; left: ${5 + Math.random() * 90}%;
      animation: shapeDrift ${10 + Math.random() * 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(shape);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleDrift {
      0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.5; }
      25% { transform: translateY(-15px) translateX(8px) scale(1.1); opacity: 0.8; }
      50% { transform: translateY(-25px) translateX(-5px) scale(0.95); opacity: 0.6; }
      75% { transform: translateY(-10px) translateX(12px) scale(1.05); opacity: 0.9; }
    }
    @keyframes shapeDrift {
      0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);
}

// ===== Tilt Effect on Cards =====
function initTiltCards() {
  if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.coverage-card, .plan-card, .step-card');

  cards.forEach(card => {
    const el = card as HTMLElement;

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

      // Light glow follow effect
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      el.style.background = `radial-gradient(circle at ${bgX}% ${bgY}%, rgba(12,127,217,0.03) 0%, transparent 50%), white`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.background = '';
    });
  });
}

// ===== Hero Parallax =====
function initHeroParallax() {
  const heroImage = document.querySelector('.hero-image') as HTMLElement;
  const floatCards = document.querySelectorAll('.hero-float-card');

  if (!heroImage || window.innerWidth < 768) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight) {
      const factor = scroll * 0.12;
      heroImage.style.transform = `translateY(${factor}px)`;

      floatCards.forEach((card, i) => {
        const el = card as HTMLElement;
        const speed = 0.06 + (i * 0.03);
        el.style.marginTop = `${scroll * speed}px`;
      });
    }
  });
}

// ===== Button Ripple Effect =====
function initButtonRipple() {
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function (this: HTMLElement, e: Event) {
      const mouseEvent = e as MouseEvent;
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = mouseEvent.clientX - rect.left - size / 2;
      const y = mouseEvent.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position:absolute; width:${size}px; height:${size}px;
        border-radius:50%; background:rgba(255,255,255,0.3);
        left:${x}px; top:${y}px;
        animation: rippleEffect 0.6s ease-out forwards;
        pointer-events:none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  const style = document.createElement('style');
  style.textContent = `@keyframes rippleEffect { from { transform:scale(0); opacity:1; } to { transform:scale(2.5); opacity:0; } }`;
  document.head.appendChild(style);
}

// ===== WhatsApp Tooltip =====
function initWhatsAppTooltip() {
  const wa = document.getElementById('whatsapp-float');
  if (!wa) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'wa-tooltip';
  tooltip.textContent = 'Need help? Chat with us!';
  wa.appendChild(tooltip);

  // Show tooltip after 3 seconds
  setTimeout(() => {
    tooltip.classList.add('show');
    setTimeout(() => tooltip.classList.remove('show'), 5000);
  }, 3000);
}

// ===== Plan Card Toggle Highlight =====
function initPlanToggle() {
  document.querySelectorAll('.plan-card').forEach(card => {
    const btn = card.querySelector('.btn');
    btn?.addEventListener('mouseenter', () => {
      card.classList.add('highlight');
    });
    btn?.addEventListener('mouseleave', () => {
      card.classList.remove('highlight');
    });
  });
}
