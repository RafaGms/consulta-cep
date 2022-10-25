import { FiSearch } from "react-icons/fi";
import ImgLocation from "./components/ImgLocation";
import { useState } from "react";
import Api from "./services/Api";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function buscarCep() {
    if (input === "") {
      document.getElementById("inputBusca").style.border = " 2px solid red";
      alert("PREENCHA ALGUM CEP!!");
    }

    try {
      const response = await Api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("ERRO AO BUSCAR CEP!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <div className="containerIntro">
        <div className="containerImg">
          <ImgLocation />
        </div>

        <div className="containerBuscador">
          <h1 className="titleBuscador">Consultar CEP</h1>

          <div className="containerInput" id="inputBusca">
            <input
              type="text"
              placeholder="Digite seu CEP..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="btnBuscador" onClick={buscarCep}>
              <FiSearch size={25} color="#fff " />
            </button>
          </div>
        </div>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <p>
            <span>Rua: </span>
            {cep.logradouro}
          </p>
          <p>
            <span>Bairro: </span>
            {cep.bairro}
          </p>
          <p>
            <span>Complemento: </span>
            {cep.complemento}
          </p>
          <p>
            <span>Cidade: </span>
            {cep.localidade}
          </p>
          <p>
            <span>UF: </span>
            {cep.uf}
          </p>
        </main>
      )}
    </div>
  );
}

export default App;
