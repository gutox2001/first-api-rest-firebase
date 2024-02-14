const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors"); // Importa o pacote 'cors' para permitir requisições de origens diferentes

admin.initializeApp();
const db = admin.firestore();
const app = express();

app.use(cors({ origin: true })); // Habilita o CORS para permitir solicitações de qualquer origem

// Endpoint para obter todos os clientes
app.get("/cliente", async (req, res) => {
  try {
    const clientesSnapshot = await db.collection("cliente").get();
    const clientes = [];
    clientesSnapshot.forEach((doc) => {
      clientes.push({
        id: doc.id,
        dadosCliente: doc.data()
      });
    });
    console.log("Successfully retrieved clients");
    return res.json(clientes); // Retorna a lista de clientes em formato JSON
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return res.status(500).json({ error: "Erro ao buscar clientes" }); // Retorna um erro 500 em caso de falha
  }
});

// Endpoint para criar um novo cliente
app.post("/cliente", async (req, res) => {
  try {
    const cliente = req.body;
    const newCliente = await db.collection("cliente").add(cliente); // Adiciona um novo cliente ao Firestore
    console.log("Successfully created client");
    return res.status(201).json({ id: newCliente.id }); // Retorna o ID do novo cliente criado
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return res.status(500).json({ error: "Erro ao criar cliente" }); // Retorna um erro 500 em caso de falha
  }
});

// Endpoint para atualizar um cliente existente
app.patch("/cliente/:clienteId", async (req, res) => {
  try {
    const clienteId = req.params.clienteId;
    const clienteData = req.body;
    await db.collection("cliente").doc(clienteId).update(clienteData); // Atualiza os dados do cliente no Firestore
    console.log("Successfully updated client");
    return res.status(204).send(); // Retorna uma resposta sem conteúdo (204) em caso de sucesso
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return res.status(500).json({ error: "Erro ao atualizar cliente" }); // Retorna um erro 500 em caso de falha
  }
});

// Endpoint para excluir um cliente
app.delete("/cliente/:clienteId", async (req, res) => {
  try {
    const clienteId = req.params.clienteId;
    await db.collection("cliente").doc(clienteId).delete(); // Exclui o cliente do Firestore
    console.log("Successfully deleted client");
    return res.status(204).send(); // Retorna uma resposta sem conteúdo (204) em caso de sucesso
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    return res.status(500).json({ error: "Erro ao excluir cliente" }); // Retorna um erro 500 em caso de falha
  }
});

// Endpoint para obter todos os produtos cadastrados
app.get("/produto", async (req, res) => {
  try {
    const produtosSnapshot = await db.collection("produto").get();
    const produtos = [];
    produtosSnapshot.forEach((doc) => {
      produtos.push({
        id: doc.id,
        dadosProduto: doc.data()
      });
    });
    console.log("Successfully retrieved products");
    return res.json(produtos); // Retorna a lista de clientes em formato JSON
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({ error: "Erro ao buscar produtos" }); // Retorna um erro 500 em caso de falha
  }
});

// Endpoint para criar um novo produto
app.post("/produto", async (req, res) => {
  try {
    const produto = req.body;
    const novoProduto = await db.collection("produto").add(produto); // Adiciona um novo produto ao Firestore
    console.log("Successfully added product");
    return res.status(201).json({ id: novoProduto.id }); // Retorna o ID do novo produto criado
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return res.status(500).json({ error: "Erro ao criar produto" }); // Retorna um erro 500 em caso de falha
  }
});

// Endpoint para atualizar um produto existente
app.patch("/produto/:idProduto", async (req, res) => {
  try {
    const idProduto = req.params.idProduto;
    const dadosProduto = req.body;
    await db.collection("cliente").doc(idProduto).update(dadosProduto); // Atualiza os dados do produto no Firestore
    console.log("Successfully updated product");
    return res.status(204).send(); // Retorna uma resposta sem conteúdo (204) em caso de sucesso
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return res.status(500).json({ error: "Erro ao atualizar produto" }); // Retorna um erro 500 em caso de falha
  }
});

// Endpoint para excluir um produto
app.delete("/produto/:idProduto", async (req, res) => {
  try {
    const idProduto = req.params.idProduto;
    await db.collection("produto").doc(idProduto).delete(); // Exclui o produto do Firestore
    console.log("Successfully deleted product");
    return res.status(204).send(); // Retorna uma resposta sem conteúdo (204) em caso de sucesso
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return res.status(500).json({ error: "Erro ao excluir produto" }); // Retorna um erro 500 em caso de falha
  }
});

exports.api = functions.https.onRequest(app); // Exporta a função 'api' como uma função Firebase HTTPS
