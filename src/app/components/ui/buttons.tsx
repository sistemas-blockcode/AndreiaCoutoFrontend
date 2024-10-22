'use client'; // Adicionamos essa linha pois esse componente vai usar estados
import { useState } from 'react';
import ModalAluno from '@/app/components/ui/modalAluno'; // Importa o modal de aluno
import ModalCursos from '@/app/components/ui/modalCursos'; // Importa o modal de cursos

interface ButtonProps {
  title: string;
  model: 1 | 2 | 3; // Define os modelos de botões
}

export default function Buttons({ title, model }: ButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal de aluno ou cursos

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Estilos baseados no modelo escolhido
  const getButtonStyle = () => {
    switch (model) {
      case 1:
        return 'bg-[#188D82] text-white text-sm px-4 py-2 rounded font-medium';
      case 2:
        return 'bg-[#188D82] text-white text-sm px-4 py-2 rounded font-medium';
      case 3:
        return 'bg-[#188D82] text-white text-sm px-4 py-2 rounded font-medium';
      default:
        return 'bg-gray-500 text-white px-4 py-2 rounded';
    }
  };

  return (
    <>
      <button className={getButtonStyle()} onClick={openModal}>
        {title}
      </button>

      {isModalOpen && (
        <>
          {model === 1 && (
            <ModalAluno
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          )}
          {model === 2 && (
            <ModalCursos
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </>
  );
}
