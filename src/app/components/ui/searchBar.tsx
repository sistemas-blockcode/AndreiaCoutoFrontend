export default function SearchBar() {
  return (
    <div className="w-full max-w-3xl"> {/* Limita a largura máxima da barra de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar"
        className="w-full px-4 py-2 bg-[#EFEFEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-ciano focus:bg-gray-100"
      />
    </div>
  );
}
