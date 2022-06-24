const express = require('express');
const app = express();

const Categories = require('./models/Categories.js');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (request, response) {
    response.send('Serviço API Rest iniciada...');
});


app.get("/categories", async (req, res) => {
    await Categories.findAll({
        attributes: ['id','name', 'description',],
        order:[['name','ASC']]
    })
    .then( (users) => {
        return res.json({
            erro:false,
            users
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nehum categoria encontrado!!!`
        });
    });
});

app.get('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // await Categories.findAll({ where: { id: id }})
        const users = await Categories.findByPk(id);
        if(!users) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro Nehum categoria encontrado!"
            })
        }
        res.status(200).json({
            erro: false,
            users
        })
    }catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
});

app.post("/Categorie", async (req, res) => {
    const{ name, description } = req.body;
    await Categories.create(req.body,{name, description})
    .then(()=>{
        return res.json({
            erro: false,
            mensagem:'categoria cadastrado com sucesso!'
        });
    }).catch((err) => {
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: categoria  não cadastrado...${err}`
        })
    })
});
app.put("/Categorie",async (req, res) => {
    const{ id} = req.body;

    await Categories.update(req.body,{ where: { id}})
    .then(()=>{
        return res.json({
            erro:false,
            mensagem: " categoria alterado com sucesso"
        })
    }).catch((err) => {
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: categoria não alterado ...${err}`
        })
    })
});


 app.delete("/Categorie/:id",async (req, res)=>{
     const {id} = req.params;
     await Categories.destroy({where: { id}})
     .then(()=>{
         return res.json({
             erro:false,
             mensagem: " categoria apagado com sucesso"
         });

     }).catch(() => {
         return res.status(400).json({
             erro:true,
             mensagem: `Erro: ${err} categoria  não apagado...`
         });
     });
 });




app.listen(process.env.PORT,() => {
    console.log(`Servico eniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`);
});

app.listen(6333);
