# Calculator Simple

Kalkulator web sederhana yang dibuat sebagai **percobaan menggunakan [Claude Code](https://claude.com/claude-code)**, asisten coding berbasis AI dari Anthropic yang berjalan di terminal.

## Tentang Percobaan Ini

Project ini dibuat untuk mencoba seberapa mudah membuat aplikasi hanya dengan memberi perintah dalam bahasa sehari-hari ke Claude Code. Prosesnya:

1. **Minta dibuatkan project** — "buatin project web calculator simple, web langsung jadi"
   → Claude Code membuat file HTML, CSS, dan JavaScript lalu langsung membukanya di browser.
2. **Minta di-push ke GitHub** — cukup memberikan link repo
   → Claude Code menjalankan `git init`, commit, dan push secara otomatis.
3. **Minta dibuatkan README** — file yang sedang kamu baca ini.

Semua dilakukan tanpa menulis kode secara manual.

## Fitur Kalkulator

- Operasi dasar: tambah, kurang, kali, bagi
- Persen (%), desimal, hapus digit (⌫), dan reset (AC)
- Bisa dipakai dengan keyboard (angka, `+ - * /`, `Enter`, `Backspace`, `Esc`)
- Format angka Indonesia (contoh: `1.234,5`)
- Tampilan gelap dan responsif di HP

## Cara Menjalankan

Tidak perlu instalasi apa pun. Cukup buka file `index.html` di browser.

## Struktur File

```
index.html   → tampilan kalkulator
style.css    → desain / tampilan
script.js    → logika perhitungan
```

## Kesimpulan

Claude Code sangat membantu untuk membuat project kecil dengan cepat: dari ide, kode, sampai upload ke GitHub hanya lewat percakapan singkat.
