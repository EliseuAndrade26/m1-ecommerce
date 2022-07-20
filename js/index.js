let ulVitrine  = document.querySelector(".lista-cards")
let ulCarrinho  = document.querySelector(".carrinho-lista")

function criarCardProduto(produtos){
    ulVitrine.innerHTML = ""
    for(let posicao = 0; posicao < produtos.length; posicao++){
        let liProduto           = document.createElement("li")
        let imgProduto          = document.createElement("img")
        let categoriaProduto    = document.createElement("span")
        let tituloProduto       = document.createElement("h3")
        let descricaoProduto    = document.createElement("span")
        let precoProduto        = document.createElement("span")
        let botaoProduto        = document.createElement("button")

        liProduto.value             = produtos[posicao].id
        liProduto.classList         = "card-produto"
        imgProduto.classList        = "card-img"
        imgProduto.src              = produtos[posicao].img
        imgProduto.alt              = produtos[posicao].nameItem
        categoriaProduto.classList  = encontrarCategoria(produtos[posicao].tag[0])
        categoriaProduto.innerText  = produtos[posicao].tag
        tituloProduto.classList     = "card-titulo"
        tituloProduto.innerText     = produtos[posicao].nameItem
        descricaoProduto.classList  = "card-descricao"
        descricaoProduto.innerText  = produtos[posicao].description
        precoProduto.classList      = "card-preco"
        precoProduto.innerText      = `R$ ${produtos[posicao].value},00`
        botaoProduto.classList      = "card-add-carrinho"
        botaoProduto.id             = produtos[posicao].id
        botaoProduto.innerText      = produtos[posicao].addCart

        liProduto.append(imgProduto, categoriaProduto,tituloProduto, descricaoProduto, precoProduto, botaoProduto)
        ulVitrine.appendChild(liProduto)
    }
}
criarCardProduto(data)

function encontrarCategoria(categoria){
    if(categoria === "Acessórios"){
            return "categoria-acessorio"
    }
    else if(categoria === "Calçados"){
        return "categoria-calcado"
    }
    else{
        return "categoria-camiseta"
    }
}

let ulMenuNav           = document.querySelector(".menu-lista")
let inputPesquisa       = document.querySelector(".sidebar-pesquisa-input")
let botaoPesquisa       = document.querySelector(".sidebar-pesquisa-botao")
let botaoProduto        = document.querySelectorAll(".card-add-carrinho")
let h2CarrinhoVazio     = document.querySelector(".carrinho-vazio")
let pCarrinhoVazio      = document.querySelector(".adicione-item")
let divQuantidadeValor  = document.querySelector(".background")
let contador            = 0
let total               = 0


function mudarMnuNav(event){
    let target = event.target
    if(target.tagName == "A"){
        let removerStrong = document.querySelector("#strong")
        removerStrong.id = ""
        target.id = "strong"

        mudarVitrine(target.classList[0])
    }
}

function mudarVitrine(categoria){
    let dataCategoria = []
    for(let posicao = 0; posicao < data.length; posicao++){
        if(categoria == "todos"){
            return criarCardProduto(data)
        }
        else if(categoria == data[posicao].tag[0].toLowerCase().replace("ó", "o").replace("ç", "c")){
            console.log(dataCategoria)
            dataCategoria.push(data[posicao])
            criarCardProduto(dataCategoria)
        }
    }
    if((dataCategoria.length - 1) == -1){
        ulVitrine.innerHTML = ""
        let semProdutos = document.createElement("h2")
        semProdutos.innerText = "Não há produtos nesta categoria"
        ulVitrine.appendChild(semProdutos)
    }
}

ulMenuNav.addEventListener("click", mudarMnuNav)

function pesquisarProdutoClick(event){
    let target = event.target
    if(target.tagName == "BUTTON"){
        inputValue = inputPesquisa.value.trim().toLowerCase()
        encontrarProduto(inputValue)
        inputPesquisa.value = ""
    }
}

function encontrarProduto(inputValue){
    let produtosAchados = []
    for(let posicao = 0; posicao < data.length; posicao++){
        if(data[posicao].nameItem.toLowerCase().includes(inputValue) == true){
            produtosAchados.push(data[posicao])
        }
    }
    if((produtosAchados.length - 1) == -1){
        return alert("Produto não encontrado")
    }
    else if(inputValue == ""){
        return alert("Escreva um nome para pesquisar")
    }
    else{
        criarCardProduto(produtosAchados)
    }
}

botaoPesquisa.addEventListener("click", pesquisarProdutoClick)

function pesquisarProdutoKeydow(event){
    let tecla  = event.keyCode
    if(tecla == 13){
        inputValue = inputPesquisa.value.trim().toLowerCase()
        encontrarProduto(inputValue)
        inputPesquisa.value = ""
    }
}

inputPesquisa.addEventListener("keydown", pesquisarProdutoKeydow)

function colocarCarrinho(event){
    let botaoComprar = event.target
    if(botaoComprar.tagName == "BUTTON"){
        CriarCardCarrinho(parseInt(botaoComprar.id))
        divQuantidadeValor.classList = "background-cinza"
        h2CarrinhoVazio.remove()
        pCarrinhoVazio.remove()
        quantidadeValor()
    }
}

function CriarCardCarrinho(id){
    for(let posicao = 0; posicao < data.length; posicao++){
        if((id - 1) === posicao){
            total += data[posicao].value

            let liProduto           = document.createElement("li")
            let imgProduto          = document.createElement("img")
            let div                 = document.createElement("div")
            let tituloProduto       = document.createElement("h4")
            let precoProduto        = document.createElement("span")
            let botaoRemoverProduto = document.createElement("button")

            liProduto.value                   = data[posicao].id
            liProduto.classList               = "card-carrinho"
            imgProduto.classList              = "carrinho-img"
            imgProduto.src                    = data[posicao].img
            imgProduto.alt                    = data[posicao].nameItem
            div.classList                     = "carrinho-flex"
            tituloProduto.classList                  = "card-titulo"
            tituloProduto.innerText           = data[posicao].nameItem
            precoProduto.classList            = "card-preco"
            precoProduto.innerText            = `R$ ${data[posicao].value},00`
            botaoRemoverProduto.classList     = "card-remover-item"
            botaoProduto                      = data[posicao].id
            botaoRemoverProduto.innerText     = "Remover produto"

            div.append(tituloProduto, precoProduto, botaoRemoverProduto)
            liProduto.append(imgProduto, div)
            ulCarrinho.appendChild(liProduto)
        }
    }
}

function quantidadeValor(){
    divQuantidadeValor.innerHTML = ""
    contador++

    let divQuantidade   = document.createElement("div")
    let divTotal        = document.createElement("div")
    let spanQuantidade  = document.createElement("span")
    let spanTotal       = document.createElement("span")
    let quantidadeValor = document.createElement("span")
    let totalValor      = document.createElement("span")

    spanQuantidade.innerText  = "Quantidade:"
    spanTotal.innerText       = "Total:"
    quantidadeValor.classList = "quantidade-valor"
    quantidadeValor.innerText = contador
    totalValor.classList      = "total-valor"
    totalValor.innerText      = `R$ ${total},00`

    divQuantidade.append(spanQuantidade, quantidadeValor)
    divTotal.append(spanTotal, totalValor)
    divQuantidadeValor.append(divQuantidade, divTotal)
}

ulVitrine.addEventListener("click", colocarCarrinho)

function removerCarrinho(event){
    let botaoRemover = event.target
    let totalValorAtualizar = botaoRemover.previousElementSibling
    novoValor(totalValorAtualizar.innerText)
    if(botaoRemover.tagName == "BUTTON"){
        removerQuantidadeValor()

        let botaoProduto = botaoRemover.closest(".card-carrinho")
        botaoProduto.remove()
    }
}

function removerQuantidadeValor(){
    contador--

    let quantidadeValor = document.querySelector(".quantidade-valor")
    quantidadeValor.innerText = contador

    let valorValor = document.querySelector(".total-valor")
    valorValor.innerText = `R$ ${total},00`
    if(contador === 0){
        ulCarrinho.append(h2CarrinhoVazio, pCarrinhoVazio)

        divQuantidadeValor.innerHTML = ""
        divQuantidadeValor.classList = "background"
    }
}

function novoValor(valor){
    let totalValorAtualizar  = valor.replace("R$ ", "").replace(",00", "")
    let totalValorAtualizado = parseInt(total - totalValorAtualizar)
    return total = totalValorAtualizado
}

ulCarrinho.addEventListener("click", removerCarrinho)