'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Curso {
  nome: string;
  instrutor: string;
  dataCriacao: string;
  thumbnail: File | null;
}

interface ModalCursosProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCursos({ isOpen, onClose }: ModalCursosProps) {
  const [nome, setNome] = useState('');
  const [instrutor, setInstrutor] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    nome: false,
    instrutor: false,
    dataCriacao: false,
    thumbnail: false,
  });

  const validarCampos = () => {
    const erros = {
      nome: nome.trim() === '',
      instrutor: instrutor.trim() === '',
      dataCriacao: dataCriacao.trim() === '',
      thumbnail: thumbnail === null,
    };

    setErrors(erros);
    return !Object.values(erros).includes(true);
  };

  const handleSubmit = async () => {
    if (!validarCampos()) return;

    const curso: Curso = { nome, instrutor, dataCriacao, thumbnail };

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nome', curso.nome);
      formData.append('instrutor', curso.instrutor);
      formData.append('dataCriacao', curso.dataCriacao);
      if (thumbnail) formData.append('thumbnail', thumbnail);

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/curso`, {
        method: 'POST',
        body: formData, // Enviando o formulário com os dados e a imagem
      });

      if (response.ok) {
        toast.success('Curso cadastrado com sucesso!');
        onClose(); // Fecha o modal após o sucesso
      } else {
        toast.error('Erro ao cadastrar o curso.');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Cadastrar Curso</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome do Curso</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do curso"
              className={`w-full px-3 py-2 border ${errors.nome ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Instrutor</label>
            <input
              type="text"
              value={instrutor}
              onChange={(e) => setInstrutor(e.target.value)}
              placeholder="Digite o nome do instrutor"
              className={`w-full px-3 py-2 border ${errors.instrutor ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Data de Criação</label>
            <input
              type="date"
              value={dataCriacao}
              onChange={(e) => setDataCriacao(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.dataCriacao ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setThumbnail(file);
              }}
              className={`w-full px-3 py-2 border ${errors.thumbnail ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button onClick={onClose} className="text-red-500">Cancelar</button>
            <button
              onClick={handleSubmit}
              className="bg-ciano text-white font-medium px-4 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Concluir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
