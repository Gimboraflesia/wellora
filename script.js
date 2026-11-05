const article = [
  {
    id: 1,
    judul: "5 Langkah Memulai Pola Makan Sehat Tanpa Diet Menyiksa",
    deskripsi:
      "Pelajari cara menyeimbangkan porsi karbohidrat, protein, dan serat harian secara bertahap tanpa perlu rasa lapar berlebihan.",
    isi:
      "Mulailah dengan langkah sederhana: tambahkan sayur atau buah ke dalam menu, pilih sumber protein yang beragam, dan sesuaikan porsi makan dengan kebutuhan. Perubahan kecil yang dilakukan secara konsisten lebih mudah dipertahankan daripada membatasi makanan secara ekstrem. Minum air yang cukup dan nikmati makanan dengan penuh perhatian.",
    kategori: "Nutrisi",
    waktuBaca: "5 min baca",
    gambar: "asset/vegen.jpg",
  },
  {
    id: 2,
    judul: "Berapa Langkah Kaki yang Sebenarnya Dibutuhkan Tubuh?",
    deskripsi:
      "Kupas tuntas mitos 10.000 langkah dan fakta ilmiah tentang kebutuhan gerak harian untuk menjaga kesehatan jantung dan stamina.",
    isi:
      "Angka 10.000 langkah bukan target yang harus sama untuk setiap orang. Jumlah gerak yang sesuai dapat berbeda tergantung kondisi dan kebiasaan masing-masing. Jika baru mulai aktif, tambahkan waktu berjalan secara bertahap, pilih kegiatan yang disukai, dan imbangi dengan istirahat yang cukup.",
    kategori: "Kebugaran",
    waktuBaca: "4 min baca",
    gambar: "asset/running.jpg",
  },
  {
    id: 3,
    judul: "Rahasia Tidur Nyenyak Demi Produktivitas Maksimal",
    deskripsi:
      "Kualitas tidur menentukan metabolisme tubuh. Temukan 4 kebiasaan mudah ini untuk bangun dengan energi penuh keesokan hari.",
    isi:
      "Cobalah menjaga waktu tidur dan bangun tetap teratur, membuat kamar nyaman, serta mengurangi penggunaan layar menjelang waktu tidur. Rutinitas yang menenangkan, seperti membaca atau melakukan peregangan ringan, dapat membantu tubuh bersiap untuk beristirahat. Kebutuhan tidur setiap orang dapat berbeda.",
    kategori: "Pola Tidur",
    waktuBaca: "6 min baca",
    gambar: "asset/cat.jpg",
  },
];

const articleContainer = document.getElementById("articleContainer");
const articleTemplate = document.getElementById("articleTemplate");

if (articleContainer && articleTemplate) {
  article.forEach(({ id, judul, deskripsi, kategori, waktuBaca, gambar }) => {
    const articleClone = articleTemplate.content.cloneNode(true);
    const card = articleClone.querySelector(".article-card");
    const image = card.querySelector(".article-image img");

    card.href = `detailArticle.html?id=${id}`;
    image.src = gambar;
    image.alt = judul;
    card.querySelector(".article-category").textContent = kategori;
    card.querySelector(".article-time").textContent = waktuBaca;
    card.querySelector(".article-card-title").textContent = judul;
    card.querySelector(".article-card-desc").textContent = deskripsi;

    articleContainer.appendChild(articleClone);
  });
}

const detailArticle = document.getElementById("detailArticle");

if (detailArticle) {
  const articleId = Number(
    new URLSearchParams(window.location.search).get("id"),
  );
  const selectedArticle = article.find((item) => item.id === articleId);
  const notFoundMessage = document.getElementById("articleNotFound");

  if (selectedArticle) {
    detailArticle.hidden = false;
    detailArticle.querySelector("#judulArticle").textContent =
      selectedArticle.judul;
    detailArticle.querySelector("#kategoriArticle").textContent =
      selectedArticle.kategori;
    detailArticle.querySelector("#waktuBacaArticle").textContent =
      selectedArticle.waktuBaca;
    detailArticle.querySelector("#deskripsiArticle").textContent =
      selectedArticle.deskripsi;
    detailArticle.querySelector("#isiArticle").textContent =
      selectedArticle.isi;

    const detailImage = detailArticle.querySelector("#gambarArticle");
    detailImage.src = selectedArticle.gambar;
    detailImage.alt = selectedArticle.judul;
  } else if (notFoundMessage) {
    notFoundMessage.hidden = false;
  }
}

const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const bmiForm = document.getElementById("bmiForm");
const bmiResult = document.getElementById("bmiResult");

if (bmiForm && bmiResult) {
  bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const weightKg = Number(bmiForm.elements.weight.value);
    const heightMeters = Number(bmiForm.elements.height.value) / 100;

    if (
      !Number.isFinite(weightKg) ||
      weightKg <= 0 ||
      !Number.isFinite(heightMeters) ||
      heightMeters <= 0
    ) {
      bmiResult.textContent = "Masukkan berat dan tinggi badan yang valid.";
      return;
    }

    const bmi = weightKg / (heightMeters * heightMeters);
    const category =
      bmi < 18.5 ? "Kurang" : bmi < 25 ? "Normal" : "Berlebih";
    bmiResult.textContent = `BMI Anda: ${bmi.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} — ${category}`;
  });
}