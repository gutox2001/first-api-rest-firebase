fetch("https://us-central1-first-api-rest-7cb0a.cloudfunctions.net/api/cliente")
    .then(response => response.json())
    .then(data => {
        // Aqui você pode manipular os dados recebidos da API
        // e exibi-los no seu HTML
        console.log(data); // Exemplo: exibir os dados no console

        // Exemplo: exibir os clientes em uma tabela no HTML
        const table = document.createElement("table");
        table.style.width = '100%';
        table.setAttribute('border', '1');

        // Cabeçalho da Tabe
        const th1 = document.createElement("th");
        th1.textContent = "Nome";
        table.appendChild(th1);
        const th2 = document.createElement("th");
        th2.textContent = "Telefone";
        table.appendChild(th2);

        data.forEach(cliente => {
            const linha = document.createElement("tr");
            const coluna1 = document.createElement("td");
            coluna1.textContent = cliente.dadosCliente.nome;
            linha.appendChild(coluna1);

            const coluna2 = document.createElement("td");
            coluna2.textContent = cliente.dadosCliente.telefone;
            linha.appendChild(coluna2);

            table.appendChild(linha);
        });
        const body = document.querySelector("body");
        body.appendChild(table);
    })
    .catch(error => {
        console.error("Ocorreu um erro ao acessar a API:", error);
    });

    /*
    fetch("https://us-central1-first-api-rest-7cb0a.cloudfunctions.net/api/cliente"): Inicia uma requisição HTTP para a URL especificada, que retorna dados de clientes em formato JSON.
.then(response => response.json()): O método .then() é encadeado após a requisição fetch() e recebe a resposta da requisição como parâmetro. Neste caso, estamos convertendo a resposta em formato JSON usando o método .json().
.then(data => { ... }): O método .then() é encadeado novamente para manipular os dados recebidos da API. Aqui, estamos recebendo os dados convertidos em formato JSON como parâmetro e executando um bloco de código.
console.log(data);: Exemplo de como exibir os dados recebidos no console do navegador. Isso pode ser útil para depuração e verificação dos dados recebidos.
const ul = document.createElement("ul");: Cria um elemento <ul> (lista não ordenada) no documento HTML. Este elemento será usado para exibir os clientes em uma lista.
data.forEach(cliente => { ... }): Itera sobre cada objeto cliente nos dados recebidos. O método .forEach() é usado para percorrer cada elemento do array data.
const li = document.createElement("li");: Cria um elemento <li> (item de lista) para cada cliente.
li.textContent = cliente.nome;: Define o texto do elemento <li> como o nome do cliente. O nome do cliente é obtido através da propriedade nome do objeto cliente.
ul.appendChild(li);: Adiciona o elemento <li> à lista <ul>. Isso cria um novo item de lista para cada cliente.
document.body.appendChild(ul);: Adiciona a lista <ul> ao corpo do documento HTML. Isso exibirá a lista de clientes no HTML, abaixo de qualquer conteúdo existente no corpo do documento.
.catch(error => { ... }): O método .catch() é usado para tratar erros que possam ocorrer durante a requisição ou conversão dos dados. Aqui, estamos exibindo uma mensagem de erro no console caso ocorra algum problema.*/