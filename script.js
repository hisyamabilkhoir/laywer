/* =============================================
   LAWYER PORTFOLIO — SCRIPT.JS
   Premium interactive features
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
    navbar.classList.toggle('scrolled', scrollY > 50);

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
  onScroll();

  // ── Mobile menu toggle ──
  menuToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });

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


  // =============================================
  // CONTACT FORM → WHATSAPP
  // =============================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();

      let waMessage = `Halo, saya ingin berkonsultasi.\n\n`;
      waMessage += `*Nama:* ${name}\n`;
      waMessage += `*Email:* ${email}\n`;
      if (phone) waMessage += `*Telepon:* ${phone}\n`;
      if (service) waMessage += `*Layanan:* ${service}\n`;
      waMessage += `\n*Pesan:*\n${message}`;

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


  // =============================================
  // CHATBOT
  // =============================================
  const chatToggle = document.getElementById('chatbotToggle');
  const chatWindow = document.getElementById('chatbotWindow');
  const chatClose = document.getElementById('chatbotClose');
  const chatMessages = document.getElementById('chatbotMessages');
  const chatInput = document.getElementById('chatbotInput');
  const chatSend = document.getElementById('chatbotSend');
  const chatSuggestions = document.querySelectorAll('.chat-suggestion');

  // Chatbot knowledge base
  const botResponses = {
    'services': 'Kami menyediakan layanan:\n\n📋 Konsultasi Hukum\n🏛️ Pendampingan Kasus\n📝 Penyusunan Kontrak\n🤝 Mediasi Hukum\n\nSemua layanan ditangani langsung oleh pengacara berpengalaman.',
    'consultation': 'Untuk booking konsultasi:\n\n1️⃣ Isi form di halaman Contact\n2️⃣ Hubungi WhatsApp: +62 859-7372-9267\n3️⃣ Email: contact@abilkhoirlaw.com\n\nKonsultasi awal GRATIS! 📞',
    'hours': 'Jam operasional kantor kami:\n\n🕐 Senin - Jumat: 09:00 - 18:00 WIB\n📅 Weekend: By Appointment\n\nUntuk konsultasi darurat, silakan hubungi WhatsApp kami kapan saja.',
    'practice': 'Area praktik kami meliputi:\n\n🏢 Hukum Perusahaan\n⚖️ Hukum Pidana\n📋 Hukum Perdata\n👨‍👩‍👧 Hukum Keluarga\n💡 Hak Kekayaan Intelektual\n🏛️ Hukum Ketenagakerjaan',
    'price': 'Biaya layanan bervariasi tergantung jenis kasus. Konsultasi awal GRATIS.\n\nUntuk penawaran detail, silakan hubungi kami melalui WhatsApp atau isi form konsultasi di website.',
    'location': 'Kantor kami berlokasi di:\n\n📍 350 Fifth Avenue, Suite 4800\nNew York, NY 10118\n\nKunjungi kami pada jam kerja atau buat janji terlebih dahulu.',
    'default': 'Terima kasih atas pertanyaannya! 😊\n\nUntuk informasi lebih detail, silakan:\n📞 WhatsApp: +62 859-7372-9267\n📧 Email: contact@abilkhoirlaw.com\n\nAtau isi form konsultasi di halaman Contact.'
  };

  function getKeywords(text) {
    const lower = text.toLowerCase();
    if (lower.match(/service|layanan|offer|what do you/)) return 'services';
    if (lower.match(/book|consultation|konsultasi|jadwal|appointment|booking/)) return 'consultation';
    if (lower.match(/hour|jam|waktu|working|operasional|buka/)) return 'hours';
    if (lower.match(/practice|area|bidang|spesialis|expertise/)) return 'practice';
    if (lower.match(/price|harga|biaya|tarif|cost|fee/)) return 'price';
    if (lower.match(/location|alamat|address|kantor|office|dimana|where/)) return 'location';
    return 'default';
  }

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('chat-msg', sender);
    msg.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function botReply(userText) {
    setTimeout(() => {
      const key = getKeywords(userText);
      addMessage(botResponses[key], 'bot');
    }, 600 + Math.random() * 400);
  }

  function sendUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    botReply(text);
  }

  // Toggle chatbot
  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  // Send message
  chatSend.addEventListener('click', sendUserMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendUserMessage();
  });

  // Suggestion buttons
  chatSuggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-msg');
      addMessage(msg, 'user');
      botReply(msg);

      // Hide suggestions after clicking
      const suggestionsContainer = document.getElementById('chatbotSuggestions');
      if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
      }
    });
  });


  // =============================================
  // PARALLAX SCROLLING — HERO
  // =============================================
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    if (!hero) return;
    const scroll = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scroll < heroHeight) {
      // Parallax background
      hero.style.backgroundPositionY = `${scroll * 0.4}px`;

      // Subtle content parallax
      const heroContent = hero.querySelector('.hero-content');
      const heroProfile = hero.querySelector('.hero-profile');
      if (heroContent) heroContent.style.transform = `translateY(${scroll * 0.08}px)`;
      if (heroProfile) heroProfile.style.transform = `translateY(${scroll * 0.12}px)`;
    }
  }, { passive: true });


  // =============================================
  // HERO CURSOR GLOW EFFECT
  // =============================================
  const heroGlow = document.getElementById('heroGlow');

  if (hero && heroGlow) {
    hero.addEventListener('mousemove', (e) => {
      heroGlow.style.left = e.clientX + 'px';
      heroGlow.style.top = e.clientY + 'px';
      heroGlow.style.opacity = '1';
    });

    hero.addEventListener('mouseleave', () => {
      heroGlow.style.opacity = '0';
    });
  }


  // =============================================
  // 3D TILT EFFECT ON CARDS (Mouse-based)
  // =============================================
  const tiltCards = document.querySelectorAll('.practice-card, .service-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });


  // =============================================
  // SMOOTH COUNTER ANIMATION (Hero Stats)
  // =============================================
  const statNumbers = document.querySelectorAll('.hero-stats .stat h3');
  let statsAnimated = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const text = stat.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;

      const target = parseInt(match[0]);
      const suffix = text.replace(match[0], '');
      let current = 0;
      const increment = Math.ceil(target / 60);
      const duration = 1500;
      const stepTime = duration / (target / increment);

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        stat.textContent = current + suffix;
      }, stepTime);
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

});
