-- db scripts in here

create table town (
    id serial primary key,
    town_name text not null,
    reg_number_start text not null unique
);

create table reg_number (
    id serial primary key,
    full_reg_number text not null unique,
    town_id int,
    foreign key (town_id) references town(id)
);





