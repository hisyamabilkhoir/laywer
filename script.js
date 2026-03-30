/* =============================================
   LAWYER PORTFOLIO — SCRIPT.JS
   Smooth scrolling, navbar effects, animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Elements ──
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section, .hero');
  const menuToggle = document.getElementById('menuToggle');
  const navLinksEl = document.getElementById('navLinks');

  // ── Navbar scroll effect & active link highlight ──
  function onScroll() {
    const scrollY = window.scrollY;

    // Toggle navbar background
    navbar.classList.toggle('scrolled', scrollY > 50);

    // Active link highlight
    let current = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // Run once on load

  // ── Mobile menu toggle ──
  menuToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
    });
  });

  // ── Scroll fade-in animation (IntersectionObserver) ──
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    fadeObserver.observe(el);
  });

  // ── Contact form handling ──
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Ambil data form
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();

      // Format pesan WhatsApp
      let waMessage = `Halo, saya ingin berkonsultasi.\n\n`;
      waMessage += `*Nama:* ${name}\n`;
      waMessage += `*Email:* ${email}\n`;
      if (phone) waMessage += `*Telepon:* ${phone}\n`;
      if (service) waMessage += `*Layanan:* ${service}\n`;
      waMessage += `\n*Pesan:*\n${message}`;

      // Buka WhatsApp
      const waURL = `https://wa.me/6285973729267?text=${encodeURIComponent(waMessage)}`;

      btn.textContent = 'Mengirim...';
      btn.disabled = true;

      setTimeout(() => {
        window.open(waURL, '_blank');
        formSuccess.classList.add('show');
        this.reset();
        btn.textContent = originalText;
        btn.disabled = false;

        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 5000);
      }, 500);
    });
  }
});
