CREATE DATABASE school_website;

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    class_id int;
    name VARCHAR(50),
    surname VARCHAR(50),
    birthdate date,
    address VARCHAR(100),
    phoneNumber VARCHAR(50),
    inscriptionDate timestamp
);

CREATE TABLE class(
    class_id SERIAL PRIMARY KEY,
    tutor_id int,
    year VARCHAR(50)
);

CREATE TABLE interTable(
    inter_id SERIAL PRIMARY KEY,
    class_id int,
    employee_id int
);

CREATE TABLE employee(
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    birthdate date,
    address VARCHAR(50),
    phoneNumber VARCHAR(50),
    inscriptionDate timestamp,
    function VARCHAR(50),
    admin boolean,
    emailAddress VARCHAR(60)
);

CREATE TABLE question(
    question_id SERIAL PRIMARY KEY,
    image VARCHAR(100),
    time int
);

CREATE TABLE answer(
    answer_id int,
    question_id int,
    answer VARCHAR(100),
    trueAnswerOrNot boolean,
);