-- =====================================================================
-- Migrasi: Kolom tambahan untuk Halaman Detail (Store, Waifu, Anime, Projects, Achievements)
-- ---------------------------------------------------------------------
-- Jalankan SELURUH script ini di Supabase Dashboard → SQL Editor → Run.
-- Idempoten (aman dijalankan berulang): pakai "add column if not exists".
--
-- Detail page membaca kolom baru ini secara OPSIONAL (conditional render),
-- jadi halaman tetap berfungsi meski kolom belum diisi datanya.
-- =====================================================================

-- -------------------------------------------------------------------
-- KOLOOM BERSAMA (semua 5 tabel)
--   gallery         text[]   -> array URL gambar/media untuk galeri
--   long_description text    -> konten panjang (body utama halaman detail)
--   tags            text[]   -> chip generik (genres / skills / traits / features)
-- -------------------------------------------------------------------
alter table products
  add column if not exists gallery text[],
  add column if not exists long_description text,
  add column if not exists tags text[];

alter table waifu_list
  add column if not exists gallery text[],
  add column if not exists long_description text,
  add column if not exists tags text[];

alter table anime_list
  add column if not exists gallery text[],
  add column if not exists long_description text,
  add column if not exists tags text[];

alter table projects
  add column if not exists gallery text[],
  add column if not exists long_description text,
  add column if not exists tags text[];

alter table achievements
  add column if not exists gallery text[],
  add column if not exists long_description text,
  add column if not exists tags text[];

-- -------------------------------------------------------------------
-- KOLOM PER-SEKSI (metadata tambahan spesifik tiap jenis)
-- -------------------------------------------------------------------
-- Store: link demo produk
alter table products
  add column if not exists demo_url text;

-- Anime: tahun rilis & studio
alter table anime_list
  add column if not exists year integer,
  add column if not exists studio text;

-- Projects: link repo & tahun
alter table projects
  add column if not exists repo_url text,
  add column if not exists year integer;

-- Achievements: ID kredensial
alter table achievements
  add column if not exists credential_id text;

-- =====================================================================
-- CONTOH isi data (opsional, jalankan sekali untuk uji coba):
--   update products
--     set gallery = array['https://...img1.jpg','https://...img2.jpg'],
--         long_description = 'Deskripsi panjang...',
--         tags = array['Feature 1','Feature 2'],
--         demo_url = 'https://demo.example.com'
--   where id = 1;
-- =====================================================================
