'use client';

import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReceiveSquare2 } from 'iconsax-react';

interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  status: string;
  cursosMatriculados: { curso: { nome: string } }[]; // Inclui os cursos matriculados
}

export default function TabelaAluno() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null); // Estado para controlar o menu suspenso

  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/alunos`);
      if (response.ok) {
        const data = await response.json();
        setAlunos(data);
      } else {
        console.error("Erro ao buscar os alunos.");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  // Funções para cada ação do menu suspenso
  const handleExcluir = (id: number) => {
    console.log(`Excluir aluno ${id}`);
    // Lógica de exclusão aqui
  };

  const handleInativar = (id: number) => {
    console.log(`Inativar aluno ${id}`);
    // Lógica de inativação aqui
  };

  const handleAbrir = (id: number) => {
    console.log(`Abrir aluno ${id}`);
    // Lógica de abrir detalhes aqui
  };

  return (
    <div className={`rounded-xl h-[415px] bg-white ml-5 overflow-y-auto shadow`}>
      <ToastContainer />
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold mb-4 ml-3">
            Alunos - Total de {alunos.length} alunos cadastrados.
          </h2>
          <div className="flex space-x-4 mb-3 mr-3">
            <button
              onClick={fetchAlunos}
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
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Aluno</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">E-mail</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Telefone</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Status</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Curso</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Ações</th>
              </tr>
            </thead>
            <tbody className="font-regular text-sm">
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="border-b border-gray-200 relative">
                  <td className="p-3">{aluno.nome}</td>
                  <td className="p-3">{aluno.email}</td>
                  <td className="p-3">{aluno.telefone || "Não informado"}</td>
                  <td className="p-3">
                    <span className="px-3 py-[6px] rounded-md text-xs font-medium bg-[#4AAE8C] text-white">
                      {aluno.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-3">
                    {aluno.cursosMatriculados
                      ? aluno.cursosMatriculados.map((curso) => curso.curso.nome).join(', ') // Separa cursos com vírgulas
                      : "Indefinido"}
                  </td>
                  <td className="p-3 relative z-10">
                    <button
                      className="bg-[#188D82] text-white text-xs px-3 py-1 rounded hover:bg-gray-300 transition"
                      onClick={() => setOpenMenu(openMenu === aluno.id ? null : aluno.id)} // Alterna o menu suspenso
                    >
                      Ver Mais
                    </button>
                    {openMenu === aluno.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <ul>
                          <li
                            onClick={() => handleExcluir(aluno.id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Excluir
                          </li>
                          <li
                            onClick={() => handleInativar(aluno.id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Inativar
                          </li>
                          <li
                            onClick={() => handleAbrir(aluno.id)}
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
