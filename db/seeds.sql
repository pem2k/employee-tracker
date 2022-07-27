INSERT INTO department (name)
VALUES ("Research and Dev"),
       ("Accounting"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("researcher", 100000.50, 1),
       ("admin", 120000, 3),
       ("accountant", 70000, 2);
       

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ("John M", "Anager", null), 
       ("Julie D", "Boss", null),
       ("Todd", "Di'rector", null);

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ("Devin", "Elepor", 1),
       ("Ne", "Te-work", 2),
       ("Jerry", "From Acccounting",3)
