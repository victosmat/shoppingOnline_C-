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
    userID int,
    foreign key (userID) references users(id)
);

create table books(
	id int auto_increment primary key,
    name varchar(50) not null,
    author varchar(50) not null,
    price float(10) not null,
    category varchar(50) not null,
    imageUrl varchar(100) not null
);

create table cart_book(
	id int auto_increment primary key,
	cartID int,
    bookID int,
    numberOfBooks int not null,
    foreign key (cartID) references carts(id),
    foreign key (bookID) references books(id)
);

create table orders(
	id int auto_increment primary key,
    date datetime not null,
    totalPrice float(10) not null,
    cartID int,
    foreign key (cartID) references carts(id)
);
