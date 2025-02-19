
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Certifique-se de importar o CSS aqui
import '../styles/cadastroProduto.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNotification } from '../contexts/NotificacaoProvider';
import { useAuth } from '../contexts/AuthProvider';


const CadastroProdutos = () => {
  const {token} = useAuth()
  const [produto, setProduto] = useState({ nome: '', descricao: '' });
  const [imagens, setImagens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriasIds, setCategoriasIds] = useState([]);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('/categoria/getAll'); // Ajuste a rota conforme sua API
        setCategorias(response.data); // Supondo que a resposta contenha a lista de categorias
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleFileChange = (e) => {
    setImagens(e.target.files);
  };

  const handleSelectChange = (e) => {
    const options = e.target.options;
    const selectedIds = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedIds.push(options[i].value);
      }
    }
    setCategoriasIds(selectedIds); // Atualizando o estado com os IDs selecionados
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const responseProduto = await axios.post('http://localhost:8080/produto/cadastrar', produto, {
        headers: {
          'Authorization': token, // Incluindo o token no cabeçalho
        },
      });
      const produtoId = responseProduto.data.id; // Assumindo que o ID é retornado no response

      // Preparar o FormData para enviar as imagens
      const formData = new FormData();
      for (let i = 0; i < imagens.length; i++) {
        formData.append('images', imagens[i]);
      }

      // Enviar as imagens para o produto cadastrado
      await axios.post(`/imagem/${produtoId}/cadastrar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
      });

      showNotification('Produto cadastrado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      showNotification('Erro ao cadastrar produto.', 'danger');
    }
  };
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                  <UserCircleIcon className="h-full w-full text-gray-300" />
                </span>
                <button
                  type="button"
                  className="ml-5 rounded-md bg-white py-2 px-3 text-sm/6 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm/6 leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 py-2 px-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default CadastroProdutos
