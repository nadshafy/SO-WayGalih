export type HomeStep = {
  src: string;
  alt: string;
  title: string;
  desc: string;
};

export const HOME_STEPS: HomeStep[] = [
  {
    src: "/images/landing/tentukansurat.webp",
    alt: "Ikon Menentukan Surat",
    title: "Menentukan Surat",
    desc: "Memilih surat online yang ingin diajukan.",
  },
  {
    src: "/images/landing/isi.webp",
    alt: "Ikon Mengisi Formulir",
    title: "Mengisi Formulir",
    desc: "Mengisi data diri dan lampiran persyaratan sesuai surat yang diajukan.",
  },
  {
    src: "/images/landing/verifikasi.webp",
    alt: "Ikon Menunggu Verifikasi",
    title: "Menunggu Verifikasi",
    desc: "Menunggu operator memverifikasi pengajuan surat.",
  },
  {
    src: "/images/landing/selesai.webp",
    alt: "Ikon Proses Selesai",
    title: "Proses Selesai",
    desc: "Setelah valid, surat diterbitkan dan dapat diambil.",
  },
];
