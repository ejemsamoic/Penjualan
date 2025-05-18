<?php
// Konfigurasi keamanan
ini_set('display_errors', 0);
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 1);

// Konfigurasi zona waktu
date_default_timezone_set('Asia/Jakarta');

// Konfigurasi database
define('DB_HOST', 'localhost');
define('DB_NAME', 'pos_system');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

// Konfigurasi aplikasi
define('APP_NAME', 'Sistem Penjualan');
define('CURRENCY', 'Rp');
define('DECIMAL_POINT', ',');
define('THOUSAND_SEPARATOR', '.');

// Fungsi format mata uang
function formatRupiah($angka) {
    return CURRENCY . ' ' . number_format($angka, 0, DECIMAL_POINT, THOUSAND_SEPARATOR);
}

// Fungsi validasi input
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}
?>
