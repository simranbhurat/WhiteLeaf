create table auth_details
(
	usertype char,
	email varchar(70) primary key unique,
	phno integer unique not null,
	pswd varchar(40)
)

create table delivery_boy
(
	name char,
	email varchar(70),
	phno integer primary key unique not null,
	address varchar(200),
	photo varchar(200),
	aadhaar integer
);
create table retailers
(
	registered boolean,
	registration_no varchar(15) unique not null,
	company_name varchar(20),
	ph_no integer unique,
	email_id varchar(70) unique primary key,
	ste text,
	city text,
	pwd varchar(15),
	address1 varchar(255),
	address2 varchar(255),
	lct varchar(200),
	registration_time timestamptz
);
create table clothing
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_gender varchar,
	product_quantity integer,
	product_color varchar(10),
	product_all_color boolean,
	product_size varchar(10),
	product_all_size boolean,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table footwear
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_gender varchar,
	product_quantity integer,
	product_color varchar(10),
	product_all_color boolean,
	product_size varchar(10),
	product_all_size boolean,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table home_and_living
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_quantity integer,
	product_color varchar(10),
	product_all_color boolean,
	product_size varchar(10),
	product_all_size boolean,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);
create table watches
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_gender varchar,
	product_quantity integer,
	product_color varchar(10),
	product_all_color boolean,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table accessories
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_gender varchar,
	product_quantity integer,
	product_color varchar(10),
	product_all_color boolean,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table gadgets
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_quantity integer,
	product_color varchar(10),
	product_all_color boolean,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table bike_spares
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_quantity integer,
	product_color varchar(10),
	product_all_color boolean,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table toys_and_gifts
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_quantity integer,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table medicine
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_quantity integer,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table consumer_electronics
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_quantity integer,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table tools_and_hardware
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_quantity integer,
	product_color varchar(10),
	product_all_color boolean,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);

create table machinery
(
	retailer_email varchar(50) references retailers(email_id),
	product_id serial unique primary key not null,
	product_name varchar(20),
	product_code varchar(20),
	product_brand varchar(20),
	sub_category varchar,
	product_quantity integer,
	product_unit varchar(10),
	product_hide_price boolean,
	product_mrp float,
	product_bestprice float,
	product_discount float,
	product_desc1 varchar,
	product_desc2 varchar,
	product_desc3 varchar,
	product_desc4 varchar,
	product_desc5 varchar,
	link1 varchar(200),
	link2 varchar(200),
	link3 varchar(200),
	link4 varchar(200),
	link5 varchar(200)
);


create table users
(
	user_name varchar not null ,
	email_id varchar not null unique primary key,
	ph_no varchar not null unique,
	user_password varchar not null,
	user_location varchar
);
create table carts
(
	user_id varchar not null references users(email_id) on delete cascade,
	cart_id varchar not null unique ,
	date_time timestamp,
	address varchar,
	primary key(user_id,cart_id)
);
create table orders
(
	item_code varchar unique,
	order_id varchar unique references carts(cart_id) on delete cascade,
	date_time timestamp,
	initial_cost varchar,
	checkout_cost varchar,
	primary key(item_code,order_id)
);



 