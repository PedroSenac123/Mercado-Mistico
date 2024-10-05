CREATE DATABASE Mercado;

USE Mercado;

-- Criação da tabela de usuários
CREATE TABLE users (
    id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status_user ENUM('Admin', 'User') NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL UNIQUE
);

-- Criação da tabela de produtos
CREATE TABLE products (
    id_products INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    amount INT NOT NULL
);

-- Criação da tabela de carrinho de compras
CREATE TABLE cart (
    id_cart INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_products INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_products) REFERENCES products(id_products),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Criação da tabela de compras
CREATE TABLE purchase (
    id_purchase INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_products INT NOT NULL,
    id_user INT NOT NULL,
    id_cart INT NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    installments INT NOT NULL,
    purchase_value INT NOT NULL,
    FOREIGN KEY (id_products) REFERENCES products(id_products),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_cart) REFERENCES cart(id_cart)
);

-- Criação da tabela de favoritos
CREATE TABLE favorites (
    id_favs INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_products INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_products) REFERENCES products(id_products),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

INSERT INTO users (user_name, password, email, cpf, phone)
VALUES ("Pedro", "1234", "pedrogabriel308090@gmail.com", "04043662017", "(+55) 51 98588-8768");
ALTER TABLE users MODIFY password VARCHAR(60);
ALTER TABLE cart
ADD COLUMN qtde INT NOT NULL DEFAULT 1;

SELECT * FROM products;

INSERT INTO products (product_name, price, amount, image_link, description) VALUES
('MistyBox Magic Dragon Eggs premium', '6830.00', 10, 'https://www.shutterstock.com/image-vector/example-stamp-red-rubber-on-260nw-2420575109.jpg', 'They are eggs of a bird-like species from an alien land, where they have different colors and elements, the main ones being ice cream and magma. When the eggs are exposed to a certain amount of light for 2 weeks, they give rise to offspring very similar to the mythological beings known as dragons on our planet. They are very large, weighing between 4 kg and 6 kg and it is not known how long they live, but as adults they usually weigh over 70 kg. The product comes packaged in a box containing natural foods from these beings and a manual detailing their characteristics.'),
('MistyBox Alien’s Guns', '3500.00', 15, 'https://www.shutterstock.com/image-vector/example-stamp-red-rubber-on-260nw-2420575109.jpg', 'Legalized alien disintegrator gun with a set of 10 goo bullets, medium size and 9mm power. Product not recommended for children under 18 and people with a criminal record. Any violent act committed by the customer is not the responsibility of the company.'),
('MistyBox Legendary Swords', '20400.00', 5, 'https://www.shutterstock.com/image-vector/example-stamp-red-rubber-on-260nw-2420575109.jpg', 'The enchanted swords were built with extraterrestrial raw materials and molded with a design made by our workers inspired by the legends of the Middle Ages. There are 3 items in one: the golden sword that can cut through any material with ease, the magma sword that has chemical components similar to fire and the demon eye sword that has magical properties.'),
('MistyBox Classic', '3000.00', 20, 'https://www.shutterstock.com/image-vector/example-stamp-red-rubber-on-260nw-2420575109.jpg', " Our best-selling product is the world's most famous mystery box, containing various magical and unknown items. Every unit has at least 13 different items with the most diverse functionalities, all made from testal capiros, a chemical element, but with unknown substances from one of the alien lands, which produces self-sufficient energy. In general, the most common items are: cards that change color or number, invisible cloaks, eye paint, chemical components that reduce or increase the size of objects, etc. As its name implies, MistyBox Classic is simply classic and will give you fun experiences you've never had before."),
('MistyBox Portraits Power Brains', '9600.00', 8, 'https://www.shutterstock.com/image-vector/example-stamp-red-rubber-on-260nw-2420575109.jpg', 'An artificial human brain stored in a capsule, the product gives customers the chance to observe how the organ that controls the nervous system works. It contains an instruction manual showing how to work with neurons and other brain structures.'),
('MistyBox Teleport & Move Machines', '14900.00', 6, 'https://www.shutterstock.com/image-vector/example-stamp-red-rubber-on-260nw-2420575109.jpg', 'This product is a technology powered by powerful energies capable of teleporting individuals and objects over a controlled distance of up to 20km. It contains an instruction manual on how to handle the product, where you can control the distance you want to be teleported or teleport something.');

