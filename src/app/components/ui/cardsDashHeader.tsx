type Props = {
  title: string; // 'string' com a letra minúscula, é o tipo correto
  value: number | string; // O 'value' pode ser número ou string (para o "24h")
};

const Card = ({ title, value }: Props) => {
  return (
    <div className="bg-blue-50 px-4 py-4 w-44 h-32 rounded-lg">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-ciano text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default function CardsDashHeader() {
  return (
    <div className="mt-10">
      <h2 className="text-md font-regular text-ciano mb-4">Visão Geral</h2>
      <div className="flex md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card title="Cursos em progresso" value={56} />

        {/* Card 2 */}
        <Card title="Cursos Completos" value={36} />

        {/* Card 3 */}
        <Card title="Certificados Emitidos" value={9} />

        {/* Card 4 */}
        <Card title="Horas Assistidas" value="24h" />
      </div>
    </div>
  );
}
