import Sidebar from "@/app/components/ui/sidebarUser";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
    <div className="flex flex-col flex-grow px-5 py-8">
        <h1>Meus Cursos</h1>
    </div>
    </div>
  );
}
