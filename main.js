/* ============================================
   SEGEN Tours Transfers & Car Rentals
   Premium Tourism Website - main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Header Scroll Effect ----------
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.hero, .page-header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('header--scrolled');
      header.classList.remove('header--transparent');
    } else {
      header.classList.remove('header--scrolled');
      if (heroSection) {
        header.classList.add('header--transparent');
      }
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ---------- Mobile Menu ----------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu__overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ---------- Parallax Effect ----------
  const parallaxBgs = document.querySelectorAll('.hero__bg, .page-header__bg');

  function handleParallax() {
    const scrollY = window.scrollY;
    parallaxBgs.forEach(bg => {
      const speed = 0.4;
      bg.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  if (parallaxBgs.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', handleParallax, { passive: true });
  }

  // ---------- Scroll Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Active Navigation Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------- Smooth Scroll for Anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('.stat__number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ---------- Package Modal ----------
  const packageData = {
    1: {
      title: 'Swakopmund & Walvis Bay',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80',
      duration: 'Full Day',
      time: '08:00 - 17:00',
      price: 'NAD 1,450',
      priceNote: 'per person',
      description: 'Explore the enchanting coastal gems of Namibia on this full-day guided tour through Swakopmund and Walvis Bay. Discover the rich cultural heritage, stunning lagoon views alive with flamingos, fascinating museums, and the unique character of these seaside towns. From colonial architecture to ocean vistas, this tour captures the essence of the Namibian coast.',
      highlights: ['Coastal sightseeing along the Atlantic shore', 'Flamingo lagoon viewing at Walvis Bay', 'Visit local museums and cultural sites', 'Explore Swakopmund town attractions', 'Photo opportunities at iconic landmarks', 'Local restaurant lunch stop'],
      includes: ['Return transport from your accommodation', 'Professional English-speaking guide', 'Activity coordination', 'Bottled water throughout the trip', 'Light refreshments']
    },
    2: {
      title: 'Walvis Bay Lagoon',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80',
      duration: 'Half Day',
      time: '08:30 - 13:00',
      price: 'NAD 1,650',
      priceNote: 'per person',
      description: 'Embark on an unforgettable morning excursion across the Walvis Bay Lagoon. Glide through crystal waters as dolphins play alongside your vessel and seals bask on the shore. Savor freshly shucked Namibian oysters paired with chilled champagne while taking in the breathtaking beauty of the Atlantic coast. A true luxury experience.',
      highlights: ['Dolphin and seal viewing cruise', 'Fresh Namibian oysters and snacks', 'Champagne served on board', 'Beautiful ocean and coastal views', 'Pelican feeding experience', 'Photography opportunities'],
      includes: ['Return transport from your accommodation', 'Catamaran cruise with captain and crew', 'Champagne, oysters, and snacks on board', 'Professional guide', 'Bottled water']
    },
    3: {
      title: 'Walvis Bay & Namib Desert',
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=900&q=80',
      duration: 'Full Day',
      time: '08:00 - 18:00',
      price: 'NAD 2,250',
      priceNote: 'per person',
      description: 'Journey from the coast into the heart of the ancient Namib Desert on this thrilling full-day adventure. Experience the adrenaline of 4x4 dune driving across towering sand dunes, witness breathtaking desert panoramas stretching to the horizon, and capture stunning sunset photographs as the desert glows in golden hues. This tour perfectly blends adventure with natural beauty.',
      highlights: ['Thrilling 4x4 dune driving experience', 'Panoramic desert landscape views', 'Sunset photography session', 'Adventure experience in the Namib', 'Visit to Dune 7 - tallest dune in Namibia', 'Desert wildlife spotting'],
      includes: ['Return transport from your accommodation', '4x4 desert vehicle with experienced driver', 'Professional English-speaking guide', 'Picnic lunch in the desert', 'Bottled water and refreshments']
    },
    4: {
      title: 'Walvis Bay Township',
      image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=80',
      duration: 'Half Day',
      time: '10:00 - 15:00',
      price: 'NAD 950',
      priceNote: 'per person',
      description: 'Immerse yourself in the vibrant heart of Walvis Bay\'s local community on this culturally rich township tour. Experience authentic Namibian life as you visit local markets, taste traditional dishes prepared by community members, enjoy live music and dance performances, and engage with friendly locals who share their stories and traditions. A truly heartwarming experience.',
      highlights: ['Authentic local culture and lifestyle experience', 'Traditional Namibian food tasting', 'Live music and dance performances', 'Community interaction and storytelling', 'Visit local artisan markets', 'Support local community projects'],
      includes: ['Return transport from your accommodation', 'Local community guide', 'Traditional food tasting', 'Cultural activity access', 'Bottled water']
    },
    5: {
      title: 'Multi-Attraction Tour',
      image: 'https://images.unsplash.com/photo-1535392432937-a27c36ec07b5?w=900&q=80',
      duration: '2 Days / 1 Night',
      time: 'Multi-day',
      price: 'NAD 3,950',
      priceNote: 'per person',
      description: 'Discover the best of Namibia\'s central region on this comprehensive two-day tour. From scenic coastal stops to inland wildlife encounters, this journey covers diverse landscapes and unforgettable experiences. Enjoy a comfortable overnight stay, wake to stunning sunrise activities, and explore multiple attractions at a relaxed pace. Perfect for those wanting more than a day trip.',
      highlights: ['Scenic coastal and inland stops', 'Wildlife viewing opportunities', 'Stunning sunrise activities', 'Comfortable overnight accommodation', 'Multiple attractions and viewpoints', 'Desert and coastal ecosystems'],
      includes: ['All transport throughout the tour', 'Professional English-speaking guide', '1 night accommodation with breakfast', 'Selected meals and refreshments', 'Activity coordination and entrance fees', 'Bottled water']
    },
    6: {
      title: 'Etosha National Park',
      image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=900&q=80',
      duration: '3 Days / 2 Nights',
      time: 'Multi-day',
      price: 'NAD 7,500',
      priceNote: 'per person',
      description: 'Experience the crown jewel of Namibian wildlife at Etosha National Park on this immersive three-day safari. Home to lions, elephants, rhinos, giraffes, zebras, and over 300 bird species, Etosha offers world-class game viewing around its iconic white salt pan. Enjoy sunrise and sunset game drives, comfortable lodge accommodation, and expert guidance through one of Africa\'s greatest national parks.',
      highlights: ['Multiple expert-led game drives', 'Big Five wildlife viewing opportunities', 'Sunrise and sunset safari experiences', 'Comfortable lodge accommodation', 'Etosha Pan panoramic viewpoints', 'Waterhole viewing at night'],
      includes: ['Return transport from Walvis Bay/Windhoek', 'Professional safari guide', '2 nights lodge accommodation', 'All meals during the tour', 'Park entrance and conservation fees', 'Game drive vehicle', 'Bottled water and refreshments']
    }
  };

  // Open Modal
  document.addEventListener('click', function(e) {
    const trigger = e.target.closest('[data-package]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-package');
      openPackageModal(id);
    }
  });

  function openPackageModal(id) {
    const data = packageData[id];
    if (!data) return;

    const modal = document.getElementById('packageModal');
    if (!modal) return;

    modal.querySelector('.modal__header img').src = data.image;
    modal.querySelector('.modal__header img').alt = data.title;
    modal.querySelector('.modal__header-overlay h2').textContent = data.title;
    modal.querySelector('.modal__duration').textContent = data.duration;
    modal.querySelector('.modal__time').textContent = data.time;
    modal.querySelector('.modal__price-value').innerHTML = data.price + '<span>' + data.priceNote + '</span>';
    modal.querySelector('.modal__description').textContent = data.description;

    const highlightsList = modal.querySelector('.modal__highlights');
    highlightsList.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');

    const includesList = modal.querySelector('.modal__includes-list');
    includesList.innerHTML = data.includes.map(i => `<li>${i}</li>`).join('');

    modal.querySelector('.modal__book-btn').setAttribute('href', 'booking.html?package=' + id);

    document.getElementById('packageModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Modal
  document.addEventListener('click', function(e) {
    if (e.target.closest('.modal__close') || e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    const overlay = document.getElementById('packageModalOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ---------- Booking Form ----------
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    initBookingForm();
  }

  function initBookingForm() {
    let currentStep = 1;
    const totalSteps = 4;
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.booking-step');
    const bookingSuccess = document.querySelector('.booking-success');

    // Pre-select from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedPackage = urlParams.get('package');
    const preselectedService = urlParams.get('service');

    if (preselectedService) {
      const serviceCard = document.querySelector(`.service-type-card[data-type="${preselectedService}"]`);
      if (serviceCard) {
        selectServiceType(serviceCard);
      }
    }

    // Service type selection
    const serviceCards = document.querySelectorAll('.service-type-card');
    serviceCards.forEach(card => {
      card.addEventListener('click', () => selectServiceType(card));
    });

    function selectServiceType(card) {
      serviceCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const type = card.getAttribute('data-type');
      const specificSelect = document.getElementById('specificService');
      updateSpecificServices(type, specificSelect, preselectedPackage);
    }

    function updateSpecificServices(type, select, preselect) {
      const options = {
        'tour': [
          { value: 'pkg1', text: 'Swakopmund & Walvis Bay - Full Day (NAD 1,450/person)' },
          { value: 'pkg2', text: 'Walvis Bay Lagoon - Half Day (NAD 1,650/person)' },
          { value: 'pkg3', text: 'Walvis Bay & Namib Desert - Full Day (NAD 2,250/person)' },
          { value: 'pkg4', text: 'Walvis Bay Township - Half Day (NAD 950/person)' },
          { value: 'pkg5', text: 'Multi-Attraction Tour - 2 Days (NAD 3,950/person)' },
          { value: 'pkg6', text: 'Etosha National Park - 3 Days (NAD 7,500/person)' }
        ],
        'transfer': [
          { value: 'airport', text: 'Airport Transfer' },
          { value: 'hotel', text: 'Hotel Transfer' },
          { value: 'corporate', text: 'Corporate Transfer' },
          { value: 'event', text: 'Private Event Transfer' },
          { value: 'custom', text: 'Custom Route Transfer' }
        ],
        'rental': [
          { value: 'sedan', text: 'Sedan / Compact Car' },
          { value: 'suv', text: 'SUV / Crossover' },
          { value: '4x4', text: '4x4 Off-Road Vehicle' },
          { value: 'luxury', text: 'Luxury Vehicle' },
          { value: 'minibus', text: 'Minibus / Van' }
        ]
      };

      if (select && options[type]) {
        select.innerHTML = '<option value="">Select an option...</option>';
        options[type].forEach(opt => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.text;
          select.appendChild(option);
        });

        if (preselect && type === 'tour') {
          select.value = 'pkg' + preselect;
        }
      }
    }

    // Navigation
    document.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          goToStep(currentStep + 1);
        }
      });
    });

    document.querySelectorAll('[data-prev]').forEach(btn => {
      btn.addEventListener('click', () => {
        goToStep(currentStep - 1);
      });
    });

    function goToStep(step) {
      if (step < 1 || step > totalSteps) return;

      // Update indicators
      stepIndicators.forEach((ind, i) => {
        ind.classList.remove('active', 'completed');
        if (i + 1 === step) ind.classList.add('active');
        else if (i + 1 < step) ind.classList.add('completed');
      });

      // Update form steps
      steps.forEach(s => s.classList.remove('active'));
      const targetStep = document.querySelector(`.form-step[data-step="${step}"]`);
      if (targetStep) targetStep.classList.add('active');

      // If going to review step, populate review
      if (step === 4) populateReview();

      currentStep = step;
      window.scrollTo({ top: bookingForm.offsetTop - 100, behavior: 'smooth' });
    }

    function validateStep(step) {
      let valid = true;

      if (step === 1) {
        const selected = document.querySelector('.service-type-card.selected');
        if (!selected) {
          alert('Please select a service type.');
          valid = false;
        }
      }

      if (step === 2) {
        const service = document.getElementById('specificService');
        const date = document.getElementById('selectedDate');
        const guests = document.getElementById('guestCount');

        if (service && !service.value) {
          service.classList.add('error');
          valid = false;
        } else if (service) {
          service.classList.remove('error');
        }

        if (date && !date.value) {
          date.classList.add('error');
          valid = false;
        } else if (date) {
          date.classList.remove('error');
        }

        if (guests && (!guests.value || guests.value < 1)) {
          guests.classList.add('error');
          valid = false;
        } else if (guests) {
          guests.classList.remove('error');
        }
      }

      if (step === 3) {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('bookingEmail');
        const phone = document.getElementById('bookingPhone');

        [firstName, lastName, email, phone].forEach(field => {
          if (field && !field.value.trim()) {
            field.classList.add('error');
            valid = false;
          } else if (field) {
            field.classList.remove('error');
          }
        });

        if (email && email.value && !isValidEmail(email.value)) {
          email.classList.add('error');
          valid = false;
        }
      }

      return valid;
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function populateReview() {
      const selectedType = document.querySelector('.service-type-card.selected');
      const typeText = selectedType ? selectedType.querySelector('.service-type-card__title').textContent : '';

      const serviceSelect = document.getElementById('specificService');
      const serviceText = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex]?.text : '';

      document.getElementById('reviewServiceType').textContent = typeText;
      document.getElementById('reviewService').textContent = serviceText;
      document.getElementById('reviewDate').textContent = document.getElementById('selectedDate')?.value || '';
      document.getElementById('reviewGuests').textContent = document.getElementById('guestCount')?.value || '';
      document.getElementById('reviewName').textContent =
        (document.getElementById('firstName')?.value || '') + ' ' +
        (document.getElementById('lastName')?.value || '');
      document.getElementById('reviewEmail').textContent = document.getElementById('bookingEmail')?.value || '';
      document.getElementById('reviewPhone').textContent = document.getElementById('bookingPhone')?.value || '';
      document.getElementById('reviewRequests').textContent = document.getElementById('specialRequests')?.value || 'None';
    }

    // Form Submission
    const submitBtn = document.getElementById('submitBooking');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Hide form, show success
        document.querySelector('.booking-steps').style.display = 'none';
        document.querySelector('.booking-form__body').style.display = 'none';
        if (bookingSuccess) bookingSuccess.classList.add('active');

        window.scrollTo({ top: bookingForm.offsetTop - 100, behavior: 'smooth' });
      });
    }

    // Pre-select tour package if URL param exists
    if (preselectedPackage) {
      const tourCard = document.querySelector('.service-type-card[data-type="tour"]');
      if (tourCard) {
        selectServiceType(tourCard);
      }
    }
  }

  // ---------- Calendar ----------
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    initCalendar();
  }

  function initCalendar() {
    let currentDate = new Date();
    let selectedDate = null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    renderCalendar();

    document.getElementById('calPrev')?.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    document.getElementById('calNext')?.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      document.getElementById('calMonthYear').textContent = `${monthNames[month]} ${year}`;

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const daysContainer = document.getElementById('calDays');
      daysContainer.innerHTML = '';

      // Empty cells for days before first day
      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar__day calendar__day--empty';
        daysContainer.appendChild(empty);
      }

      // Day cells
      for (let d = 1; d <= daysInMonth; d++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar__day';
        dayEl.textContent = d;

        const cellDate = new Date(year, month, d);

        if (cellDate < today) {
          dayEl.classList.add('calendar__day--disabled');
        } else {
          if (cellDate.getTime() === today.getTime()) {
            dayEl.classList.add('calendar__day--today');
          }

          if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
            dayEl.classList.add('calendar__day--selected');
          }

          dayEl.addEventListener('click', () => {
            selectedDate = cellDate;
            const dateInput = document.getElementById('selectedDate');
            if (dateInput) {
              const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              dateInput.value = formatted;
              dateInput.classList.remove('error');
            }
            renderCalendar();
          });
        }

        daysContainer.appendChild(dayEl);
      }
    }
  }

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      let valid = true;
      const fields = contactForm.querySelectorAll('[required]');
      fields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        } else {
          field.classList.remove('error');
        }
      });

      const email = contactForm.querySelector('[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        valid = false;
      }

      if (valid) {
        contactForm.style.display = 'none';
        const success = document.querySelector('.contact-success');
        if (success) success.classList.add('active');
      }
    });
  }

  // ---------- Newsletter Forms ----------
  document.querySelectorAll('.newsletter-form, .footer__newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        const original = form.innerHTML;
        form.innerHTML = '<p style="color: inherit; padding: 12px 0; font-weight: 600;">Thank you for subscribing!</p>';
        setTimeout(() => {
          form.innerHTML = original;
        }, 3000);
      }
    });
  });

  // ---------- Gallery Filters & Lightbox ----------
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter functionality
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });

    // Lightbox
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.gallery-lightbox__image') : null;
    const lightboxCaption = lightbox ? lightbox.querySelector('.gallery-lightbox__caption') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.gallery-lightbox__close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.gallery-lightbox__prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.gallery-lightbox__next') : null;
    let currentLightboxIndex = 0;

    function getVisibleItems() {
      return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    }

    function openLightbox(index) {
      const visible = getVisibleItems();
      if (index < 0 || index >= visible.length) return;
      currentLightboxIndex = index;

      const item = visible[index];
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-item__caption');

      // Use a higher resolution version for the lightbox
      const src = img.src.replace('w=800', 'w=1400').replace('w=1200', 'w=1400');
      lightboxImg.src = src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : '';

      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
      const visible = getVisibleItems();
      currentLightboxIndex += direction;
      if (currentLightboxIndex < 0) currentLightboxIndex = visible.length - 1;
      if (currentLightboxIndex >= visible.length) currentLightboxIndex = 0;
      openLightbox(currentLightboxIndex);
    }

    // Click on gallery items to open lightbox
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const visible = getVisibleItems();
        const index = visible.indexOf(item);
        if (index !== -1) openLightbox(index);
      });
    });

    // Lightbox controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close on background click
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('gallery-lightbox__content')) {
          closeLightbox();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  // ---------- Back to Top ----------
  // Dynamically create back-to-top button if not present
  if (!document.querySelector('.back-to-top')) {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);

    const style = document.createElement('style');
    style.textContent = `
      .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--burnt-orange);
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        z-index: 900;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        cursor: pointer;
        border: none;
      }
      .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .back-to-top:hover {
        background: var(--burnt-orange-dark);
        transform: translateY(-3px);
      }
      .back-to-top svg {
        width: 22px;
        height: 22px;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
