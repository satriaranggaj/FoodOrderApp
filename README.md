# README

## Deskripsi Aplikasi

Aplikasi ini adalah platform pemesanan makanan berbasis Vue.js dan Naive UI yang memungkinkan pengguna untuk melihat berbagai menu makanan, memilih kategori, melakukan pencarian, serta mengurutkan menu berdasarkan berbagai kriteria seperti harga, jarak, waktu pengiriman, dan rating. Aplikasi ini juga dilengkapi fitur untuk menambahkan makanan ke dalam pesanan.

## Fitur Aplikasi

1. **Pencarian Menu**  
   Pengguna dapat mencari menu makanan berdasarkan nama makanan, kategori, atau restoran.

2. **Filter Kategori**  
   Pengguna dapat memilih kategori makanan tertentu untuk memfilter hasil menu yang ditampilkan.

3. **Sortir Menu**  
   Pengguna dapat mengurutkan menu berdasarkan:

   - Nama restoran
   - Kategori
   - Rating (rendah ke tinggi atau tinggi ke rendah)
   - Jarak (terdekat atau terjauh)
   - Waktu pengiriman (tercepat atau terlama)
   - Harga (rendah ke tinggi atau tinggi ke rendah)

4. **Tambah ke Pesanan**  
   Setiap menu memiliki tombol untuk menambahkannya ke pesanan.

5. **Penampilan Slider Gambar**  
   Header aplikasi menampilkan carousel gambar yang berjalan otomatis.

## Instalasi

1. **Clone Repository**  
   Clone project ini dari repository:

   ```bash
   git clone <URL-repository>
   ```

2. **Instalasi Dependensi**  
   Masuk ke direktori project dan install semua dependensi yang dibutuhkan:

   ```bash
   npm install
   ```

3. **Jalankan Aplikasi**  
   Untuk menjalankan aplikasi di mode development:
   ```bash
   npm run dev
   ```

## Struktur Data JSON

File `data.json` yang berisi data untuk aplikasi ini disimpan di folder `assets`. File ini mencakup:

- **Slider Gambar**: Menyimpan gambar untuk carousel.
- **Kategori**: Menyimpan daftar kategori makanan.
- **Restoran**: Menyimpan informasi tentang restoran.
- **Menu**: Menyimpan daftar menu makanan.
- **Review**: Menyimpan ulasan pengguna untuk setiap menu.

Pastikan folder `assets` tersedia dan `data.json` diakses dengan benar dari aplikasi untuk pengambilan data.

## Penggunaan Aplikasi

1. **Pencarian**:  
   Masukkan kata kunci di kolom pencarian untuk menemukan menu berdasarkan nama makanan, kategori, atau restoran.

2. **Filter Kategori**:  
   Klik pada salah satu kategori untuk menampilkan menu yang sesuai dengan kategori tersebut.

3. **Pengurutan**:  
   Pilih kriteria pengurutan di dropdown "Sort By" untuk mengatur urutan menu.

4. **Tambah Pesanan**:  
   Tekan tombol tambah pada menu untuk menambahkannya ke dalam pesanan.

## Struktur Kode

- **Data dan State Management**: Menggunakan Vue Composition API dengan `ref` dan `computed`.
- **Penggunaan Komponen Naive UI**: Menggunakan komponen seperti `NInput`, `NCarousel`, `NButton`, `NSelect`, dan `NCard` untuk UI yang responsif.
- **Pengelolaan State Global**: Menggunakan `useStore` untuk menyimpan daftar pesanan.
