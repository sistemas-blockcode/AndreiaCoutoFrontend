import Buttons from "@/app/components/ui/buttons";
import CardsAdmin from "@/app/components/ui/cardsDashAdm";
import NavbarAdm from "@/app/components/ui/navbarAdm";
import SearchBar from "@/app/components/ui/searchBar";
import SidebarAdm from "@/app/components/ui/sidebarAdmin";
import { MyChart } from "@/app/components/ui/chart"; // Importando o gráfico

export default function Page() {
  return (
    <div className="flex h-screen bg-white">
      <SidebarAdm />

      {/* Adicionando margem de 2px entre a Sidebar e o conteúdo */}
      <div className="flex-1 flex flex-col border-l-2 border-[#EFF4FF]">
        <NavbarAdm title={"Dashboard"} />

        <div className="bg-white mt-2 px-3">
          <div className="rounded-lg">
            <CardsAdmin />
          </div>
          <div className="mt-8 mx-5">
            <h2 className="text-lg font-semibold mb-4">Relatório Mensal</h2>
            <MyChart />
          </div>
        </div>
      </div>
    </div>
  );
}
