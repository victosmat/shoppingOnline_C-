create database shoppingOnline;

create table users (
    id int auto_increment primary key,
    name varchar(50) not null,
	username varchar(50) not null,
    password varchar(50) not null,
    address varchar(50) not null,
    dateOfBirth date not null,
    phoneNumber varchar(50) not null,
	email varchar(50) not null,
    gender varchar(50) not null,
    position varchar(50) not null
);

create table carts(
	id int auto_increment primary key,
    user_id int,
    foreign key (user_id) references users(id)
);

create table books(
	id int auto_increment primary key,
    name varchar(50) not null,
    author varchar(50) not null,
    price float(10) not null,
    category varchar(50) not null,
    image_url varchar(100) not null
);

create table cart_book(
	cart_id int,
    book_id int,
    number_of_books int not null,
    foreign key (cart_id) references carts(id),
    foreign key (book_id) references books(id)
);

create table orders(
	id int auto_increment primary key,
    date datetime not null,
    total_price float(10) not null,
    cart_id int,
    foreign key (cart_id) references carts(id)
);

insert into books (name, author, price, category, image_url) values ("bách khoa toàn thư", "bách khoa", 100000, "khoa học", "D:\study\LapTrinhWeb\Du_an_btl\WebApi_ShoppingOnline\WebApi_ShoppingOnline\Image\1.jpg");

