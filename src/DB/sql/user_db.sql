CREATE TABLE IF NOT EXISTS users
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(255) UNIQUE NOT NULL,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    x FLOAT DEFAULT 0,
    y FLOAT DEFAULT 0
);