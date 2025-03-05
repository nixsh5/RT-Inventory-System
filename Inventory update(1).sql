CREATE DATABASE GroceryInventory;

USE GroceryInventory;

CREATE TABLE Inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    date_of_delivery DATE NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Example Insert Data for Testing

INSERT INTO Inventory (supplier_name, product_id, product_name, date_of_delivery, weight, price)
VALUES
    ('Supplier A', 101, 'Rice', '2025-03-01', 25.50, 120.00),
    ('Supplier B', 102, 'Wheat Flour', '2025-03-02', 20.00, 80.00),
    ('Supplier C', 103, 'Sugar', '2025-03-03', 15.00, 50.00),
    ('Supplier D', 104, 'Salt', '2025-03-04', 10.00, 30.00);
    ('Supplier D', 104, 'Salt', '2025-03-04', 10.00, 30.00);
