create database shoppingOnline;

CREATE TABLE user (
    id int auto_increment primary key,
    name varchar(50) not null,
	username varchar(50) not null,
    password varchar(50) not null,
    address varchar(50) not null,
    dateOfBirth datetime not null,
    phoneNumber varchar(50) not null,
	email varchar(50) not null,
    gender varchar(50) not null,
    position varchar(50) not null
);

insert into user(name, username, password, address, dateOfBirth, phoneNumber, email, gender, position)  
values ("Lê Tuấn Minh", "miglee", "189", "Thái Bình", 18/09/2001, "01234566789", "minhlt@gmail.com", "nam", "admin");