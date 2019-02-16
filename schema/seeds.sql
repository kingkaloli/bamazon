USE bamazonDB;

CREATE TABLE products (
itemid INTEGER AUTO_INCREMENT not null,
productname VARCHAR(45) not null,
departmentname VARCHAR(45) not null,
price decimal(10.4) not null,
stockquanity integer (10) not null,
PRIMARY KEY(itemid)
);
