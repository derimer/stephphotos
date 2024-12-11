CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE item (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE Contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL
);

CREATE TABLE galeries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Identifiant unique auto-incrémenté pour chaque galerie
    title VARCHAR(255) NOT NULL,               -- Titre de la galerie
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création de la galerie
    UNIQUE KEY unique_gallery_title (title)    -- Assurez l'unicité des titres de galerie
);

CREATE TABLE images (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Identifiant unique auto-incrémenté pour chaque image
    filename VARCHAR(255) NOT NULL ,            -- Nom du fichier associé à l'image
    name VARCHAR(255) NOT NULL ,                -- Nom affiché pour l'image
    author VARCHAR(255) NULL,              -- Auteur de l'image
    exposure VARCHAR(255)  NULL,            -- Détails d'exposition de l'image
    gallery_id INT UNSIGNED NOT NULL,          -- Référence à la galerie à laquelle appartient l'image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création de l'image
    FOREIGN KEY (gallery_id) REFERENCES galeries(id) ON DELETE CASCADE -- Supprime les images si la galerie est supprimée
);


CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
   password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accueil (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  exposure VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
insert into galeries (title) values ('paysages'), ('N_et_B'),("couleurs"),('portrait_et_charme');