INSERT INTO department (name)
VALUES ("Research and Dev"),
       ("Accounting"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("researcher", 100000.50, 1),
       ("admin", 120000, 3),
       ("accountant", 70000, 2);
       

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ("John M", "Anager", null) 
