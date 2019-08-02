#CREATE DATABASE ASS_SEVEN;

show databases;
USE ASS_SEVEN;
-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
show tables;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `ASS_SEVEN`.`User` (
  `id` VARCHAR(20) NOT NULL,
  `join_date` DATE NULL,
  `authority` VARCHAR(15) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ASS_SEVEN`.`post` (
  `title` VARCHAR(30) NULL,
  `body` VARCHAR(500) NULL,
  `date` DECIMAL(30) NULL,
  `authority` VARCHAR(10) NULL,
  `User_id` VARCHAR(20) NOT NULL,
  CONSTRAINT `fk_post_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`portfolio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ASS_SEVEN`.`portfolio` (
  `title` VARCHAR(30) NULL,
  `body` VARCHAR(500) NULL,
  `date` DECIMAL(30) NULL,
  `authority` VARCHAR(10) NULL,
  `img_address` VARCHAR(100) NULL,
  `User_id` VARCHAR(20) NOT NULL,
  CONSTRAINT `fk_portfolio_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
    
    
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
