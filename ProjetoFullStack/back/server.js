//Dependências - Frameworks
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

//Conexão com o SGBD MySQL
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'Spotify_da_Shopee'
});

//Rota de teste
const teste = (req, res) => {
    res.send("Back-end respondendo ");
}

//CRUD - create
const create = (req, res) => {
    let artista = req.body.artista;
    let musica = req.body.musica;
    let album = req.body.album;
    let duracao = req.body.duracao;    

    con.query("SELECT * FROM Musicas WHERE artista = ? AND musica = ?", [artista, musica], (err, result) => {
        if (err) {
            res.redirect('http://127.0.0.1:5500/front/erro.html?erro=ERRO INESPERADO');
        } else if (result.length > 0) {
            res.redirect('http://127.0.0.1:5500/front/erro.html?erro=MÚSICA JÁ CADASTRADA');
        } else {
            let query = `INSERT INTO Musicas(artista, musica, album, duracao) VALUE`;
            query += `('${artista}', '${musica}', '${album}', '${duracao}');`;
            con.query(query, (err, result) => {
                if (err)
                    res.redirect('http://127.0.0.1:5500/front/erro.html?erro=ERRO AO CADASTRAR MÚSICA');
                else
                    res.redirect('http://127.0.0.1:5500/front/index.html');
            });
        }
    });
}


//CRUD - Update
const update = (req, res) => {
    let id = req.params.id;
    let artista = req.body.artista;
    let musica = req.body.musica;
    let album = req.body.album;
    let duracao = req.body.duracao;
    let query = `UPDATE Musicas SET artista = '${artista}', musica = '${musica}', album = '${album}', duracao = '${duracao}' WHERE id = ${id};`;
    con.query(query, (err, result) => {
        if (err)
            res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Erro ao atualizar&err=" + err.code);
        else {
            if (result.affectedRows == 0)
                res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Nada foi alterado");
            else
                res.json("Atualizado com sucesso!");
        }
    });
}

//CRUD - Delete
const del = (req, res) => {
    let id = Number(req.params.id);
    con.query(`DELETE FROM Musicas WHERE id=${id}`, (err, result) => {
        if (err)
            res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Erro ao excluir&err=" + err.code);
        else {
            if (result.affectedRows == 0)
                res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Nada foi excluído");
            else
                res.json("Atualizado com sucesso!");
        }
    });
}

//CRUD - Read
const read = (req, res) => {
    con.query("SELECT * FROM Musicas ORDER BY id", (err, result) => {
        if (err)
            res.json(err);
        else
            res.json(result);
    });
}

//Configurações de saída - FrontEnd
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Rotas de Saída - FrontEnd
app.get("/", teste);
app.post("/Musicas", create); 
app.get("/Musicas", read);
app.delete("/Musicas/:id", del);
app.put("/Musicas/:id", update);

//Teste e porta no console
app.listen(3000, () => {
    console.log("Back-end respondendo na porta 3000");
});