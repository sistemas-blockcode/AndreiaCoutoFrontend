import Buttons from "@/app/components/ui/buttons";
import NavbarAdm from "@/app/components/ui/navbarAdm";
import SearchBar from "@/app/components/ui/searchBar";
import SidebarAdm from "@/app/components/ui/sidebarAdmin";
import TabelaCursos from "@/app/components/ui/tabela-cursos";

export default function Page() {
  return (
    <div className="flex h-screen bg-white">
      <SidebarAdm />

      {/* Adicionando margem de 2px entre a Sidebar e o conteúdo */}
      <div className="flex-1 flex flex-col border-l-2 border-[#EFF4FF]">
        <NavbarAdm title={"Gestão de Cursos"} />

        <div className="bg-white mt-5 px-3">
          <div className="flex gap-3 mb-6 ml-5">
            <SearchBar/>
            <Buttons title={"Adicionar Curso"} model={2} />
          </div>
          <div className="rounded-lg">
              <TabelaCursos />
            </div>
        </div>
      </div>
    </div>
  );
}
