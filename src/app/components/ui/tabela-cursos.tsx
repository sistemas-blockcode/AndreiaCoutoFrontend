'use client';

import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReceiveSquare2 } from 'iconsax-react';

interface Curso {
  id: number;
  nome: string;
  instrutor: string;
  dataCriacao: string;
  alunos: number;
  status: string;
}

export default function TabelaCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null); // Estado para controlar o menu suspenso

  const fetchCursos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/curso`); // Ajuste o endpoint se necessário
      if (response.ok) {
        const data = await response.json();
        setCursos(data);
      } else {
        console.error("Erro ao buscar os cursos.");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  // Funções para cada ação do menu suspenso
  const handleExcluir = (id: number) => {
    console.log(`Excluir curso ${id}`);
    // Lógica de exclusão aqui
  };

  const handleInativar = (id: number) => {
    console.log(`Inativar curso ${id}`);
    // Lógica de inativação aqui
  };

  const handleAbrir = (id: number) => {
    console.log(`Abrir curso ${id}`);
    // Lógica de abrir detalhes aqui
  };

  return (
    <div className={`rounded-xl h-[415px] bg-white ml-5 overflow-y-auto shadow`}>
      <ToastContainer />
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold mb-4 ml-3">
            Cursos - Total de {cursos.length} cursos cadastrados.
          </h2>
          <div className="flex space-x-4 mb-3 mr-3">
            <button
              onClick={fetchCursos}
              className="flex items-center justify-center font-medium bg-[#188D82] text-white text-xs px-3 py-1 rounded hover:bg-gray-300 transition"
              disabled={loading}
            >
              {loading ? (
                <ReceiveSquare2 className="animate-spin mr-2 font-medium" size="16" color="#fff" />
              ) : (
                "Recarregar"
              )}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Nome</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Instrutor</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Data de Criação</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Alunos</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Status</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Ações</th>
              </tr>
            </thead>
            <tbody className="font-regular text-sm">
              {cursos.map((curso) => (
                <tr key={curso.id} className="border-b border-gray-200 relative">
                  <td className="p-3">{curso.nome}</td>
                  <td className="p-3">{curso.instrutor}</td>
                  <td className="p-3">{new Date(curso.dataCriacao).toLocaleDateString('pt-BR')}</td> {/* Aqui a data é formatada */}
                  <td className="p-3">{curso.alunos}</td>
                  <td className="p-3">
                    <span className={`px-3 py-[6px] rounded-md text-xs font-medium ${curso.status === "Ativo" ? 'bg-[#4AAE8C] text-white' : 'bg-red-500 text-white'}`}>
                      {curso.status}
                    </span>
                  </td>
                  <td className="p-3 relative">
                    <button
                      className="bg-[#188D82] text-white text-xs px-3 py-1 rounded hover:bg-gray-300 transition"
                      onClick={() => setOpenMenu(openMenu === curso.id ? null : curso.id)} // Alterna o menu suspenso
                    >
                      Ver Mais
                    </button>
                    {openMenu === curso.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <ul>
                          <li
                            onClick={() => handleExcluir(curso.id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Excluir
                          </li>
                          <li
                            onClick={() => handleInativar(curso.id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Inativar
                          </li>
                          <li
                            onClick={() => handleAbrir(curso.id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Abrir
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
