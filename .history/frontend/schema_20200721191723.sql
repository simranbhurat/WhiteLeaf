 create table retailers(
	registered boolean,
	registration_no varchar(15) unique not null,
	company_name varchar(20),
	ph_no integer unique, email id is primary key so yes
	email_id varchar(70) unique primary key,
	ste text,
	city text,
	pwd varchar(15),
	address1 varchar(255),
	address2 varchar(255),
	lct varchar(200),
	registration_time timestamptz default Now();
);
 create table product(
	retailer_email varchar(50) references retailers(email_id);
	product_id varchar(20) unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	product_category varchar(20),
	product_sub_category varchar(20),
	product_quantity float,
	product_color varchar(10),
	product_all_color boolean,
	product_size varchar(10),
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_description varchar(100),
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);
 create table users(
    user_name varchar not null ,
    email_id varchar not null unique primary key,
    ph_no varchar not null unique,
    user_password varchar not null,
    user_location varchar
);
 create table carts(
    user_id varchar not null references users(email_id) on delete cascade,
    cart_id varchar not null unique ,
    date_time timestamp,
    address varchar,
    primary key(user_id,cart_id)
);
create table orders(
    item_code varchar unique,
    order_id varchar unique references carts(cart_id) on delete cascade,
    date_time timestamp,
    initial_cost varchar,
    checkout_cost varchar,
primary key(item_code,order_id));



 