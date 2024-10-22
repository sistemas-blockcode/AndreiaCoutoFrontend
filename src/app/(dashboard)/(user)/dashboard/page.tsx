import CardsDashHeader from "@/app/components/ui/cardsDashHeader";
import CardsDashMain from "@/app/components/ui/cardsDashMain";
import Sidebar from "@/app/components/ui/sidebarUser";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-grow px-5 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-teal-600">Olá Pietro, seja bem-vindo!</h1>
            <p className="text-[#656565] mt-2">Vamos aprender algo novo hoje?</p>
          </div>
        </div>

        {/* Cards */}
        <div className="">
          <CardsDashHeader />
        </div>
        <div>
            <CardsDashMain/>
        </div>
      </div>
    </div>
  );
}
