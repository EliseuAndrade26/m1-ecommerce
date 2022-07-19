let vitrine     = document.querySelector(".vitrine")
let menuLista   = document.querySelector(".menu-lista")


function criarCardProduto(produtos){
    for(let posicao = 0; posicao < produtos.length; posicao++){
        let imgProduto          = document.createElement("img")
        let categoriaProduto    = document.createElement("span")
        let tituloProduto       = document.createElement("h3")
        let descricaoProduto    = document.createElement("span")
        let precoProduto        = document.createElement("span")
        let botaoProduto        = document.createElement("button")

        imgProduto.classList = "card-img"
        imgProduto.src = produtos[posicao].img
        imgProduto.alt = produtos[posicao].nameItem
        categoriaProduto.classList = encontrarCategoria(produtos[posicao].tag)

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