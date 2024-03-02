function fetchCotacoes() {
  return fetch(
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
  ).then((response) => response.json())
}

function atualizarSaida(valor, resultado, moedaDestino) {
  var outputMessage = ""

  if (moedaDestino === "USD-BRL") {
    outputMessage = `${valor} USD = <mark>R$ ${resultado.toFixed(2)} </mark>`
  } else if (moedaDestino === "BRL-USD") {
    outputMessage = `R$ ${valor} = <mark>${resultado.toFixed(2)} USD </mark>`
  }

  document.getElementById("output").innerHTML = `<p>${outputMessage}</p>`
}

function converter() {
  var moeda = document.getElementById("moeda").value
  var valor = document.getElementById("valor").value

  if (valor === "") {
    document.getElementById("output").innerHTML =
      "<p><mark>Digite um valor!</mark></p>"
    return
  }

  fetchCotacoes()
    .then((data) => {
      var cotacao_dolar = parseFloat(data["USDBRL"]["bid"])
      var resultado = 0

      if (moeda === "USD-BRL") {
        resultado = parseFloat(valor) * cotacao_dolar
      } else if (moeda === "BRL-USD") {
        resultado = parseFloat(valor) / cotacao_dolar
      }
      atualizarSaida(valor, resultado, moeda)
    })
    .catch((error) => console.log(error))
}

function cotacaoUsd() {
  fetchCotacoes().then((data) => {
    var cotacao_dolar2 = parseFloat(data["USDBRL"]["bid"])
    document.getElementById(
      "cotacao"
    ).innerHTML = `<mark>Dólar hoje: <b>R$ ${cotacao_dolar2.toFixed(
      2
    )}</b></mark>`
  })
}

window.onload = cotacaoUsd
