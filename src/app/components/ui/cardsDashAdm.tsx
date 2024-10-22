'use client';
import { Graph, People, EmojiHappy, TickCircle, ArrowUp, ArrowDown } from "iconsax-react"; // Importando ícones da iconsax-react

interface CardProps {
  title: string;
  number: string;
  percentage: number; // Definido como number para comparação
  description: string;
}

const Card = ({ title, number, percentage, description }: CardProps) => {
  const isPositive = percentage >= 0; // Condicional para setas

  return (
    <div className={`h-36 flex flex-col px-2 py-1 justify-center bg-white rounded-2xl shadow`}>
      <div className="flex justify-between items-center w-full px-4 mb-1">
        <h3 className="text-sm font-medium text-[#000]">{title}</h3>
      </div>
      <div className="flex items-center pr-6">
        <h2 className="text-3xl font-semibold text-left w-full px-4 mt-1">{number}</h2>
        <div className="flex items-center ml-2">
          <span className="text-gray-500 text-sm">{percentage.toFixed(2)}%</span>
          {isPositive ? (
            <ArrowUp className="text-green-500 ml-1" size="16" variant="Bold" />
          ) : (
            <ArrowDown className="text-red-500 ml-1" size="16" variant="Bold" />
          )}
        </div>
      </div>
      <div className="flex gap-3 justify-start items-center px-4 mt-2">
        <p className="text-xs text-[#7a7a9d]">{description}</p>
      </div>
    </div>
  );
};

export default function AdminCards() {
  return (
    <div className={`gap-6 grid grid-cols-4 mt-6 mx-5`}>
      <Card
        title="Novas matrículas"
        number="175"
        percentage={20.1} // Número positivo
        description="em relação ao mês passado"
      />
      <Card
        title="Vídeoaulas"
        number="215"
        percentage={-5.3} // Número negativo
        description="em relação ao mês passado"
      />
      <Card
        title="Total de Alunos"
        number="85%"
        percentage={10.0} // Número positivo
        description="em relação ao mês passado"
      />
      <Card
        title="Comparecimento"
        number="78%"
        percentage={-4.5} // Número negativo
        description="em relação ao mês passado"
      />
    </div>
  );
}
