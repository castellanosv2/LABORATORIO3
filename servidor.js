const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta API para realizar operaciones
app.post('/api/calcular', (req, res) => {
  const { a, b, operacion } = req.body;
  let resultado;

  switch (operacion) {
    case '+':
      resultado = a + b;
      break;
    case '-':
      resultado = a - b;
      break;
    case '*':
      resultado = a * b;
      break;
    case '/':
      resultado = b !== 0 ? a / b : 'Error: división entre 0';
      break;
    default:
      resultado = 'Operación no válida';
  }

  res.json({ resultado });
});

// Interfaz web simple
app.get('/', (req, res) => {
  res.send(`
    <h2>Calculadora en OpenShift 🔢</h2>
    <form id="calc-form">
      <input type="number" id="a" placeholder="Número A">
      <select id="op">
        <option value="+">+</option>
        <option value="-">−</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" id="b" placeholder="Número B">
      <button type="submit">Calcular</button>
    </form>
    <p id="resultado"></p>

    <script>
      document.getElementById('calc-form').addEventListener('submit', async e => {
        e.preventDefault();
        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);
        const operacion = document.getElementById('op').value;
        const res = await fetch('/api/calcular', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({a, b, operacion})
        });
        const data = await res.json();
        document.getElementById('resultado').innerText = 'Resultado: ' + data.resultado;
      });
    </script>
  `);
});

app.listen(port, () => {
  console.log(`Servidor calculadora escuchando en puerto ${port}`);
});
