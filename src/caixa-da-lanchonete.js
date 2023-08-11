class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    this.formasDePagamento = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!this.formasDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    let itensComAdicional = {};

    for (let item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (codigo === "cafe" || codigo === "sanduiche") {
        itensComAdicional[codigo] = true;
      }

      if (codigo === "chantily" && !itensComAdicional["cafe"]) {
        return "Item extra não pode ser pedido sem o principal";
      }
      if (codigo === "queijo" && !itensComAdicional["sanduiche"]) {
        return "Item extra não pode ser pedido sem o principal";
      }

      if (!this.cardapio.hasOwnProperty(codigo)) {
        return "Item inválido!";
      }

      if (quantidade == 0) {
        return "Quantidade inválida!";
      }

      total += quantidade * this.cardapio[codigo];
    }

    if (metodoDePagamento === "credito") {
      total *= 1.03;
    } else if (metodoDePagamento === "dinheiro") {
      total *= 0.95;
    }

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
