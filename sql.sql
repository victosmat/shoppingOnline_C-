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

insert into users(name, username, password, address, dateOfBirth, phoneNumber, email, gender, position)  
values ("Lê Tuấn Minh", "miglee", "189", "Thái Bình", "2001-09-18", "01234566789", "minhlt@gmail.com", "nam", "admin");

insert into users(name, username, password, address, dateOfBirth, phoneNumber, email, gender, position)  
values ("Lê Minh Long", "long", "261", "Thái Bình", "2001-01-26", "01234566789", "longlm@gmail.com", "nam", "customer");

create table carts(
	id int auto_increment primary key,
    amount int not null,
    user_id int,
    foreign key (user_id) references users(id)
);

create table books(
	id int auto_increment primary key,
    name varchar(50) not null,
    author varchar(50) not null,
    price float(10) not null,
    category varchar(50) not null,
    image_url varchar(50) not null
);

create table cart_book(
	cart_id int,
    book_id int,
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