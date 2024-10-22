import Buttons from "@/app/components/ui/buttons";
import NavbarAdm from "@/app/components/ui/navbarAdm";
import SearchBar from "@/app/components/ui/searchBar";
import SidebarAdm from "@/app/components/ui/sidebarAdmin";
import TabelaAluno from "@/app/components/ui/tabela-aluno";

export default function Page() {
  return (
    <div className="flex h-screen bg-white">
      <SidebarAdm />

      {/* Adicionando margem de 2px entre a Sidebar e o conteúdo */}
      <div className="flex-1 flex flex-col border-l-2 border-[#EFF4FF]">
        <NavbarAdm title={"Gestão de Alunos"}/>

        <div className="bg-white mt-5 px-3">
          <div className="flex gap-3 mb-6 ml-5">
            <SearchBar/>
            <Buttons title={"Adicionar Aluno"} model={1} />
          </div>
          <div className="rounded-lg">
              <TabelaAluno />
            </div>
        </div>
      </div>
    </div>
  );
}
