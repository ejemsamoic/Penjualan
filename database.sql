-- Tambahan tabel untuk log aktivitas
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    activity VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tambahan indeks untuk optimasi query
ALTER TABLE products ADD INDEX idx_product_name (name);
ALTER TABLE transactions ADD INDEX idx_transaction_date (transaction_date);
