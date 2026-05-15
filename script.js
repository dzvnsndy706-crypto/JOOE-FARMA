// mobile
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  /* Tutup menu jika link diklik */
  navMenu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// active link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__link').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPage);
});

// galeri filter
const filterBtns  = document.querySelectorAll('.galeri-filter__btn');
const galeriItems = document.querySelectorAll('.galeri-item');
const galeriEmpty = document.getElementById('galeriEmpty');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      /* Update tombol aktif */
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      galeriItems.forEach(item => {
        const category  = item.getAttribute('data-category');
        const isVisible = filter === 'semua' || category === filter;

        item.classList.toggle('hidden', !isVisible);
        if (isVisible) visibleCount++;
      });

      /* Tampilkan empty state jika tidak ada item */
      if (galeriEmpty) {
        galeriEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}

// form kontak validasi
const kontakForm = document.getElementById('kontakForm');

if (kontakForm) {
  kontakForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama     = document.getElementById('nama').value.trim();
    const email    = document.getElementById('email').value.trim();
    const telp     = document.getElementById('telp').value.trim();
    const pesan    = document.getElementById('pesan').value.trim();
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /* Validasi field wajib */
    if (!nama || !email || !pesan) {
      showAlert('error', 'Harap isi semua field yang wajib diisi!');
      return;
    }

    /* Validasi format email */
    if (!emailRgx.test(email)) {
      showAlert('error', 'Format email tidak valid!');
      return;
    }

    /* Validasi nomor telepon (opsional tapi harus angka jika diisi) */
    if (telp && !/^[0-9+\-\s]{8,15}$/.test(telp)) {
      showAlert('error', 'Format nomor telepon tidak valid!');
      return;
    }

    /* Sukses */
    showAlert('success', `Terima kasih, ${nama}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.`);
    kontakForm.reset();
  });
}

/* Helper: tampilkan alert box */
function showAlert(type, message) {
  const existing = document.getElementById('formAlert');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.id        = 'formAlert';
  alert.className = `form-alert form-alert--${type}`;
  alert.textContent = message;

  kontakForm.insertAdjacentElement('beforebegin', alert);

  /* Auto hilang setelah 5 detik */
  setTimeout(() => alert.remove(), 5000);
}

// jam operasional
const jamToggleBtn = document.getElementById('jamToggleBtn');
const jamStatus    = document.getElementById('jamStatus');

if (jamToggleBtn) {
      jamToggleBtn.addEventListener('click', () => {
        const now  = new Date();
        const hari = now.getDay(); // 0=Minggu, 1=Senin, ..., 6=Sabtu
        const jam  = now.getHours();
        const menit = now.getMinutes();
        const waktu = jam + menit / 60;

        let status = '';

        if (hari === 0) {
          status = '🔴 Apotek sedang TUTUP (Hari Minggu)';
        } else if (hari >= 1 && hari <= 5) {
          status = (waktu >= 8 && waktu < 21)
            ? '🟢 Apotek sedang BUKA (Senin–Jumat: 08.00–21.00)'
            : '🔴 Apotek sedang TUTUP';
        } else if (hari === 6) {
          status = (waktu >= 8 && waktu < 20)
            ? '🟢 Apotek sedang BUKA (Sabtu: 08.00–20.00)'
            : '🔴 Apotek sedang TUTUP';
        }

        jamStatus.textContent = status;
        jamStatus.style.display = 'block';
      });
    }
// count up animation stats
function countUp(el, target, suffix, duration) {
  const start    = 0;
  const step     = duration / target;
  let   current  = start;

  const timer = setInterval(() => {
    current++;
    el.textContent = current + suffix;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, step);
}

function initCountUp() {
  const stats = document.querySelectorAll('.stats__number');
  if (stats.length === 0) return;

  // data tiap angka: [target, suffix]
  const data = [
    [500, '+'],
    [10,  'K+'],
    [6,   '+'],
    [24,  '/7'],
  ];

  stats.forEach((el, i) => {
    const [target, suffix] = data[i];
    countUp(el, target, suffix, 1500);
  });
}

// jalankan saat stats section terlihat di layar
const statsSection = document.querySelector('.stats');

if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initCountUp();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}