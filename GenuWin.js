document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Widget Jam Digital di Sidebar (Poin 7)
    const clockElement = document.getElementById('clock-widget');
    if (clockElement) {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('id-ID');
            clockElement.textContent = timeString;
        }
        setInterval(updateClock, 1000);
        updateClock(); // Panggil sekali agar tidak delay 1 detik di awal
    }

    // 2. Animasi Tombol Playstore & Redirect
    const playstoreBtn = document.getElementById('playstore-btn');
    if(playstoreBtn) {
        playstoreBtn.addEventListener('click', function() {
            this.style.transform = "scale(0.9)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
                window.open('https://play.google.com/store', '_blank');
            }, 200);
        });
    }

    // 3. Form Kontak
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            alert(`Halo ${nama}! Pesan kamu untuk GenuWin berhasil dikirim.`);
            contactForm.reset();
        });
    }
});

// --- INTERAKTIF MODAL SUBSCRIBE & SOUND EFFECT "TING" ---

function openModal() {
    document.getElementById('subModalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('subModalOverlay').style.display = 'none';
    // Reset kembali ke step 1 jika ditutup
    goToStep1();
}

function toggleDropdown() {
    const list = document.getElementById('countryDropdownList');
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
}

function selectCountry(countryName) {
    document.getElementById('selectedCountry').innerText = countryName;
    document.getElementById('badgeCountry').innerText = countryName;
    document.getElementById('countryDropdownList').style.display = 'none';
}

function goToStep2() {
    document.getElementById('subStep1').style.display = 'none';
    document.getElementById('subStep2').style.display = 'block';
    
    // Update Indikator Tab
    document.getElementById('tabIndicator1').classList.remove('active');
    document.getElementById('tabIndicator2').classList.add('active');
}

function goToStep1() {
    document.getElementById('subStep2').style.display = 'none';
    document.getElementById('subStepSuccess').style.display = 'none';
    document.getElementById('subStep1').style.display = 'block';
    
    // Update Indikator Tab
    document.getElementById('tabIndicator2').classList.remove('active');
    document.getElementById('tabIndicator1').classList.add('active');
}

// Fungsi Trigger Submit + Bunyi "Ting" + Centang Hijau
function handleFormSubmit(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Memainkan Efek Suara "Ting" Menggunakan Audio Web API Bawaan Browser
    playTingSound();

    // Sembunyikan form step 2, tampilkan sukses
    document.getElementById('subStep2').style.display = 'none';
    document.getElementById('subStepSuccess').style.display = 'block';
}

// Generator Suara "Ting" Digital Otomatis (Tanpa File MP3 Eksternal)
function playTingSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Nada tinggi standar "Ting" (A5)
        oscillator.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
        console.log("Audio didukung otomatis setelah interaksi klik.");
    }
}
// --- SIMULASI GOOGLE SIGN-IN & GMAIL NOTIFIKASI ---

function openGoogleModal() {
    document.getElementById('googleModalOverlay').style.display = 'flex';
}

function closeGoogleModal() {
    document.getElementById('googleModalOverlay').style.display = 'none';
    // Reset kembali ke form input saat ditutup
    document.getElementById('googleStep1').style.display = 'block';
    document.getElementById('googleStepSuccess').style.display = 'none';
    document.getElementById('googleEmailInput').value = '';
    document.getElementById('googlePassInput').value = '';
}

function handleGoogleAuth(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Mainkan efek suara "Ting" yang sudah kita buat sebelumnya
    playTingSound();

    // Sembunyikan form input, tampilkan pesan sukses centang hijau & instruksi Gmail
    document.getElementById('googleStep1').style.display = 'none';
    document.getElementById('googleStepSuccess').style.display = 'block';
}

function handleLoginSubmit(event) {
    event.preventDefault();
    playTingSound();
    alert("Berhasil memproses login! Selamat datang di GenuWin.");
}