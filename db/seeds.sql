INSERT INTO department (name)
VALUES ("Research and Dev"),
       ("Accounting"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("researcher", 100000.50, 1),
       ("admin", 120000, 3),
       ("accountant", 70000, 2);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Anager", 1, null), 
       ("Julie", "Daboss", 2, null),
       ("Todd", "Di'rector", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Devin", "Elepor", 1, 1),
       ("Ne", "Ti'Work", 2, 2),
       ("Jerry", "From-Acccounting", 3, 3);
