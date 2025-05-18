<?php
session_start();
require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // PERBAIKAN: Tambahkan validasi input
    $username = htmlspecialchars(trim($username));
    if (empty($username) || empty($password)) {
        header('Location: index.html?error=empty_fields');
        exit();
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // PERBAIKAN: Tambahkan token CSRF
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        
        // PERBAIKAN: Tambahkan log aktivitas
        $log_stmt = $pdo->prepare("INSERT INTO activity_logs (user_id, activity) VALUES (?, ?)");
        $log_stmt->execute([$user['id'], 'Login sukses']);

        if ($user['role'] == 'admin') {
            header('Location: pages/admin/sales-analysis.html');
        } else {
            header('Location: pages/cashier/pos.html');
        }
    } else {
        header('Location: index.html?error=1');
    }
}
?>
