-- DDL - Estrutura
drop database if exists Spotify_da_Shopee;
create database Spotify_da_Shopee;
use Spotify_da_Shopee;
create table Musicas(
    id integer primary key auto_increment,
    artista varchar(50) not null,
    musica varchar(100) not null,
    album varchar(100) not null,
    duracao varchar (5) not null
);
describe musicas;

-- DML - Popular com dados de teste
insert into Musicas(artista, musica, album, duracao)
values
("Drake","Virginia Beach","For All the Dogs", "4:12"),
("Drake","Slime You Out","For All the Dogs", "5:11"),
("Drake","Hotline Bling","Views", "4:55"),
("Future","Life Is Good","High Off Life", "5:35"),
("Drake","Another Late Night","For All the Dogs", "3:08"),
("Kansas","Carry on Wayward Son","Leftoverture", "5:23"),
("Shaman","Fairy Tale","Ritual", "6:57"),
("Metallica","Master of Puppets","Master of Puppets", "8:35"),
("Avenged Sevenfold","Cosmic","Life Is but a Dream…", "7:32"),
("Audioslave","Like a Stone","Audioslave", "4:54");

select * from Musicas;