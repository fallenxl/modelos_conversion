const url = 'http://127.0.0.1:5500/models/'
const btnConvertir = document.getElementById('btnConvertir')

// convertir libra a kilogramos
const convertir = async (path, entrada) => {
  const modelo = await tf.loadLayersModel(url + path)
  const tensor = tf.tensor([entrada])
  const resultado = modelo.predict(tensor)
  const resultadoFinal = resultado.dataSync()[0]
  tensor.dispose()
  resultado.dispose()

  document.getElementById('resultado').innerHTML =
    Math.round(resultadoFinal * 100) / 100
}

btnConvertir.addEventListener('click', (event) => {
  event.preventDefault()
  const entrada = Number(document.getElementById('entrada').value)
  const option = document.getElementById('option').value

  switch (option) {
    case '0':
      convertir('conversion_m_km/model.json', entrada)
      break
    case '1':
      convertir('conversion_lb_kg/model.json', entrada)

      break
    case '2':
      convertir('conversion_mb_gb/model.json', entrada)
  }
})
