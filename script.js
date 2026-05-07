/* ---------- NAVBAR TOGGLE (mobile) ---------- */
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

/* ---------- ACTIVE LINK sesuai halaman ---------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__link').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPage);
});

/* ---------- GALERI FILTER ---------- */
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

/* ---------- FORM KONTAK — VALIDASI ---------- */
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