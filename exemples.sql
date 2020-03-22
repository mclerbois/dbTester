
CREATE DATABASE IF NOT EXISTS composants;

DROP DATABASE IF EXISTS composants;

DROP TABLE IF EXISTS transistor;

CREATE TABLE IF NOT EXISTS transistor (
  id INT NOT NULL AUTO_INCREMENT,
  name  varchar(80) NOT NULL,
  quantity INT,
  PRIMARY KEY (`id`)
  );

INSERT INTO transistor (name, quantity) VALUES
("bc107",25),
("bc177",15),
("2N3055",2),
("2N1711",0),
("bfw10",1);

-- oh zut j'ai tout effacé
DROP DATABASE IF EXISTS composants;

-- oh zut j'ai encore tout effacé
DETACH DATABASE composants;
DROP DATABASE IF EXISTS composants;

Apprendre les autres commandes via 
https://www.w3schools.com/sql/default.asp
