import { NotificationBing, ProfileCircle } from 'iconsax-react'; // Importa os ícones

interface NavbarAdmProps {
  title: string; // Define a prop para o título
}

export default function NavbarAdm({ title }: NavbarAdmProps) {
  return (
    <nav className="w-full h-20 bg-[#EFF4FF] flex items-center justify-between px-4 sm:px-6">
      {/* Logo à esquerda */}
      <div className="items-center py-2">
        <div className="ml-10">
          <h1 className="text-md sm:text-xl font-semibold">{title}</h1> {/* Usa a prop title */}
        </div>
      </div>

      {/* Ícones à direita */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* Ícone de Notificação */}
        <div className="relative cursor-pointer">
          <NotificationBing size="24" color="#1abc9c" />
          {/* Badge de notificação */}
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Avatar de usuário */}
        <div className="flex items-center space-x-2">
          <ProfileCircle size="32" color="#1abc9c" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Nome do Usuário</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
