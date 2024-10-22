'use client';
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Definir a interface para os dados do aluno
interface Aluno {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  curso: string;
  dataInscricao: string;
  tipoUsuario: string; // Adicionando o tipo de usuário
}

interface Curso {
  id: number;
  nome: string;
}

// Tipar as props do componente
interface ModalAlunoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAluno({ isOpen, onClose }: ModalAlunoProps) {
  const [etapa, setEtapa] = useState(1); // Estado para controlar a etapa atual
  const [loading, setLoading] = useState(false); // Estado de carregamento para o botão de submit

  // Dados do aluno
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
  });
  const [curso, setCurso] = useState("");
  const [dataInscricao, setDataInscricao] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(""); // Estado para o tipo de usuário
  const [cursos, setCursos] = useState<Curso[]>([]); // Estado para armazenar os cursos reais


  // Estados de erro de cada campo
  const [errors, setErrors] = useState({
    nome: false,
    cpf: false,
    email: false,
    telefone: false,
    cep: false,
    rua: false,
    numero: false,
    bairro: false,
    cidade: false,
    estado: false,
    curso: false,
    dataInscricao: false,
    tipoUsuario: false, // Adicionando erro para tipo de usuário
  });

  const fetchCursos = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/curso`); // URL da sua rota de cursos
      if (response.ok) {
        const data = await response.json();
        setCursos(data); // Armazena os cursos no estado
      } else {
        console.error('Erro ao buscar os cursos');
      }
    } catch (error) {
      console.error('Erro ao conectar à API de cursos', error);
    }
  };

  // useEffect para buscar os cursos quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      fetchCursos();
    }
  }, [isOpen]);

  // Função de validação para etapa 1
  const validarEtapa1 = () => {
    const erros = {
      nome: nome.trim() === "",
      cpf: cpf.replace(/\D/g, "").length !== 11, // CPF deve ter 11 dígitos
      telefone: telefone.replace(/\D/g, "").length !== 11, // Telefone deve ter 11 dígitos (incluindo DDD)
    };

    setErrors((prev) => ({ ...prev, ...erros }));
    return !Object.values(erros).includes(true);
  };

  // Função de validação para etapa 2
  const validarEtapa2 = () => {
    const erros = {
      cep: cep.replace(/\D/g, "").length !== 8, // CEP deve ter 8 dígitos
      rua: endereco.rua.trim() === "",
      numero: endereco.numero.trim() === "",
      bairro: endereco.bairro.trim() === "",
      cidade: endereco.cidade.trim() === "",
      estado: endereco.estado.trim() === "",
    };

    setErrors((prev) => ({ ...prev, ...erros }));
    return !Object.values(erros).includes(true);
  };

  // Função de validação para etapa 3
  const validarEtapa3 = () => {
    const erros = {
      curso: curso.trim() === "",
      dataInscricao: dataInscricao.trim() === "",
      tipoUsuario: tipoUsuario === "", // Validando tipo de usuário
    };

    setErrors((prev) => ({ ...prev, ...erros }));
    return !Object.values(erros).includes(true);
  };

  // Função para avançar para a próxima etapa com validação
  const avancarEtapa = () => {
    switch (etapa) {
      case 1:
        if (validarEtapa1()) setEtapa((prev) => prev + 1);
        break;
      case 2:
        if (validarEtapa2()) setEtapa((prev) => prev + 1);
        break;
      case 3:
        if (validarEtapa3()) setEtapa((prev) => prev + 1);
        break;
    }
  };

  // Função para voltar para a etapa anterior
  const voltarEtapa = () => {
    setEtapa((prev) => prev - 1);
  };

  // Função para buscar o endereço na API ViaCEP usando fetch
  const buscarEndereco = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setEndereco((prev) => ({
          ...prev,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
      } else {
        setErrors((prev) => ({ ...prev, cep: true }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, cep: true }));
    }
  };

  // Função para submeter os dados
  const handleSubmit = async () => {
    const aluno: Aluno = {
      nome,
      cpf,
      email,
      telefone,
      cep,
      endereco,
      curso,
      dataInscricao,
      tipoUsuario, // Adicionando tipo de usuário ao aluno
    };

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aluno),
      });

      if (response.ok) {
        toast.success('Aluno cadastrado com sucesso! Verifique o e-mail.');
        onClose();
      } else {
        toast.error('Erro ao cadastrar aluno.');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // O modal não renderiza nada se `isOpen` for falso

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Cadastrar Aluno</h2>
        <div className="space-y-4">
          {/* Etapa 1 - Dados pessoais */}
          {etapa === 1 && (
            <>
              <h3 className="text-lg font-semibold">Dados Pessoais</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium">Nome Completo</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o nome completo"
                    className={`w-full px-3 py-2 border ${errors.nome ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">CPF</label>
                  <InputMask
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className={`w-full px-3 py-2 border ${errors.cpf ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Telefone</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(XX) XXXXX-XXXX"
                    className={`w-full px-3 py-2 border ${errors.telefone ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button onClick={onClose} className="text-red-500">Cancelar</button>
                <button onClick={avancarEtapa} className="bg-ciano text-white font-medium px-4 py-2 rounded-lg">Próximo</button>
              </div>
            </>
          )}

          {/* Etapa 2 - Endereço */}
          {etapa === 2 && (
            <>
              <h3 className="text-lg font-semibold">Endereço</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium">CEP</label>
                  <InputMask
                    mask="99999-999"
                    value={cep}
                    onChange={(e) => {
                      setCep(e.target.value);
                      if (e.target.value.replace(/\D/g, "").length === 8) {
                        buscarEndereco(e.target.value);
                      }
                    }}
                    placeholder="00000-000"
                    className={`w-full px-3 py-2 border ${errors.cep ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Rua</label>
                  <input
                    type="text"
                    value={endereco.rua}
                    onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
                    placeholder="Rua"
                    className={`w-full px-3 py-2 border ${errors.rua ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Número</label>
                    <input
                      type="text"
                      value={endereco.numero}
                      onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                      placeholder="Número"
                      className={`w-full px-3 py-2 border ${errors.numero ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Complemento</label>
                    <input
                      type="text"
                      value={endereco.complemento}
                      onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
                      placeholder="Complemento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Bairro</label>
                  <input
                    type="text"
                    value={endereco.bairro}
                    onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                    placeholder="Bairro"
                    className={`w-full px-3 py-2 border ${errors.bairro ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Cidade</label>
                    <input
                      type="text"
                      value={endereco.cidade}
                      onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                      placeholder="Cidade"
                      className={`w-full px-3 py-2 border ${errors.cidade ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Estado</label>
                    <input
                      type="text"
                      value={endereco.estado}
                      onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
                      placeholder="Estado"
                      className={`w-full px-3 py-2 border ${errors.estado ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between space-x-4 mt-4">
                <button onClick={voltarEtapa} className="text-gray-500">Voltar</button>
                <button onClick={avancarEtapa} className="bg-ciano text-white font-medium px-4 py-2 rounded-lg">Próximo</button>
              </div>
            </>
          )}

          {/* Etapa 3 - Curso e Tipo de Usuário */}
          {etapa === 3 && (
            <>
              <h3 className="text-lg font-semibold">Curso e Tipo de Usuário</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium">E-mail</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o e-mail"
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Curso</label>
                  <select
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    className={`w-full px-3 py-2 border ${errors.curso ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  >
                    <option value="">Selecione o curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.nome}>
                        {curso.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Data de Inscrição</label>
                  <input
                    type="date"
                    value={dataInscricao}
                    onChange={(e) => setDataInscricao(e.target.value)}
                    className={`w-full px-3 py-2 border ${errors.dataInscricao ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Tipo de Usuário</label>
                  <select
                    value={tipoUsuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                    className={`w-full px-3 py-2 border ${errors.tipoUsuario ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="USER">Aluno</option> {/* Ajustado para usar USER */}
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between space-x-4 mt-4">
                <button onClick={voltarEtapa} className="text-gray-500">Voltar</button>
                <button onClick={avancarEtapa} className="bg-ciano text-white font-medium px-4 py-2 rounded-lg">Próximo</button>
              </div>
            </>
          )}

          {/* Etapa 4 - Conclusão */}
          {etapa === 4 && (
            <>
              <h3 className="text-lg font-semibold">Revisar e Concluir</h3>
              <p>Revise os dados antes de concluir o cadastro.</p>

              <div className="flex justify-between space-x-4 mt-4">
                <button onClick={voltarEtapa} className="text-gray-500">Voltar</button>
                <button onClick={handleSubmit} className="bg-ciano text-white px-4 py-2 rounded-lg">
                  {loading ? 'Cadastrando...' : 'Concluir'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
