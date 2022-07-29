INSERT INTO department (dept_name)
VALUES ("Research and Dev"),
       ("Accounting"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("researcher", 100000.50, 1),
       ("accountant", 70000, 2),
       ("admin", 120000, 3);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Anager", 1, null), 
       ("Julie", "Daboss", 2, null),
       ("Todd", "Di'rector", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Devin", "Elepor", 1, 1),
       ("Ne", "Tewark", 3, 3),
       ("Jerry", "From-Acccounting", 2, 2);
