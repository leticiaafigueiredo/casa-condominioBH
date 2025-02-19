import { useEffect, useState } from "react";
import axios from "axios";

const CadastroEndereco = ({ enderecoData, handleInputChange }) => {
  const { cep, estado, cidade, endereco, numero, complemento } = enderecoData;

  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedUf, setSelectedUf] = useState(estado || "0");
  const [selectedCity, setSelectedCity] = useState(cidade || "0");

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((response) => {
        setUfs(response.data);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      });
  }, [selectedUf]);

  function handleSelectUf(event) {
    const uf = event.target.value;
    setSelectedUf(uf);
    handleInputChange({ target: { name: "estado", value: uf } }); 
  }

  function handleSelectCity(event) {
    const city = event.target.value;
    setSelectedCity(city);
    handleInputChange({ target: { name: "cidade", value: city } }); 
  }

  const handleCepChange = (e) => {
    let formattedCep = e.target.value.replace(/\D/g, ''); 
  
    if (formattedCep.length > 5) {
      formattedCep = formattedCep.slice(0, 5) + '-' + formattedCep.slice(5);
    }
  
    handleInputChange({ target: { name: 'cep', value: formattedCep } });
  };
  



  return (
    <div>
      <h2 className="mt-4">Dados de Entrega</h2>
      <p className="mb-3">voce pode preencher depois, se desejar </p>

      <div className="mb-4">
        <label className="form-label" htmlFor="cep">CEP</label>
        <input
          placeholder="00000-000"
          className="form-control col-sm-6"
          type="text"
          name="cep"
          id="cep"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
        />
      </div>

      <div className=" mb-4">
        <label className="form-label" htmlFor="estado">Estado</label>
        <select
          className="form-select  form-select-lg"
          aria-label="Seleção de Estado"
          id="estado"
          value={selectedUf}
          onChange={handleSelectUf}
        >
          <option value="0">Selecione um Estado</option>
          {ufs.map((uf) => (
            <option key={uf.sigla} value={uf.sigla}>
              {uf.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label  className="form-label" htmlFor="cidade">Cidade</label>
        <select
          className="form-select  form-select-lg"
          aria-label="Seleção de Cidade"
          id="cidade"
          value={selectedCity}
          onChange={handleSelectCity}
          disabled={selectedUf === "0"}
        >
          <option value="0">Selecione uma Cidade</option>
          {cities.map((city) => (
            <option key={city.id} value={city.nome}>
              {city.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4" style={{marginTop: "28px"}}>
        <label  className="form-label" htmlFor="endereco">Endereço</label>
        <input
          className="form-control col-sm-6"
          type="text"
          name="endereco"
          id="endereco"
          value={endereco}
          onChange={handleInputChange}
        />
      </div>

      <div className=" mb-4">
        <label  className="form-label" htmlFor="numero">Número</label>
        <input
          className="form-control col-sm-6"
          type="text"
          name="numero"
          id="numero"
          value={numero}
          onChange={handleInputChange}
        />
      </div>

      <div className=" mb-4">
        <label  className="form-label" htmlFor="complemento">Complemento</label>
        <input
          className="form-control col-sm-6"
          type="text"
          name="complemento"
          id="complemento"
          value={complemento}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CadastroEndereco;
