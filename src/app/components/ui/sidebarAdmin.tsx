'use client';
import { useState } from 'react';
import { Home, Book, Video, Message, Call, Setting2, User, Menu, CloseSquare, LogoutCurve } from 'iconsax-react';
import { Logo } from './logo';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Importa o hook usePathname e useRouter

export default function SidebarAdm() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a visibilidade da sidebar
  const pathname = usePathname(); // Obtém a rota atual
  const router = useRouter(); // Para redirecionamento

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Alterna a visibilidade da sidebar
  };

  // Função para aplicar estilo quando a rota estiver ativa
  const getLinkStyle = (route: string) => {
    return pathname === route ? 'text-ciano font-semibold' : 'text-gray-700';
  };

  // Função para o logout
  const handleLogout = () => {
    // Remove o token JWT dos cookies
    document.cookie = 'token=; Max-Age=0; path=/'; // Remove o cookie de token

    // Redireciona o usuário para a tela de login
    router.push('/login');
  };

  return (
    <>
      {/* Ícone de menu hamburguer para abrir a sidebar em telas pequenas */}
      <div className="sm:hidden flex items-center p-4">
        <button onClick={toggleSidebar}>
          <Menu size="32" color="#188D82" />
        </button>
      </div>

      <aside className={`w-60 overflow-y-auto bg-white transform sm:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center p-4 sm:hidden">
          <button onClick={toggleSidebar}>
            <CloseSquare size="32" color="#188D82" />
          </button>
        </div>
        <div className='flex flex-col items-center justify-center pt-6'>
          <Logo size={150} />
        </div>
        <ul className="space-y-7 px-4 py-8">
          <li className="flex items-center space-x-4">
            <Home size="24" color={pathname === '/admin/dashboard' ? '#188D82' : '#8492A6'} />
            <Link href="/admin/dashboard" className={`${getLinkStyle('/admin/dashboard')} hover:text-ciano`}>
              Dashboard
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Book size="24" color={pathname === '/admin/gestao_de_cursos' ? '#188D82' : '#8492A6'} />
            <Link href="/admin/gestao_de_cursos" className={`${getLinkStyle('/admin/gestao_de_cursos')} hover:text-ciano`}>
              Gestão de cursos
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Video size="24" color={pathname === '/admin/gestao_de_aulas' ? '#188D82' : '#8492A6'} />
            <Link href="/admin/gestao_de_aulas" className={`${getLinkStyle('/admin/gestao_de_aulas')} hover:text-ciano`}>
              Gestão de aulas
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Message size="24" color={pathname === '/admin/comentarios' ? '#188D82' : '#8492A6'} />
            <Link href="/admin/comentarios" className={`${getLinkStyle('/admin/comentarios')} hover:text-ciano`}>
              Comentários
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Call size="24" color={pathname === '/admin/chamadas_ao_vivo' ? '#188D82' : '#8492A6'} />
            <Link href="/admin/chamadas_ao_vivo" className={`${getLinkStyle('/admin/chamadas_ao_vivo')} hover:text-ciano`}>
              Chamadas ao vivo
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Setting2 size="24" color={pathname === '/admin/config_chat_ao_vivo' ? '#188D82' : '#8492A6'} />
            <Link href="/admin/config_chat_ao_vivo" className={`${getLinkStyle('/admin/config_chat_ao_vivo')} hover:text-ciano`}>
              Config. chat ao vivo
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <User size="24" color={pathname === '/admin/gestao_de_alunos' ? '#188D82' : '#8492A6'} />
            <Link href="/admin/gestao_de_alunos" className={`${getLinkStyle('/admin/gestao_de_alunos')} hover:text-ciano`}>
              Gestão de alunos
            </Link>
          </li>

          {/* Botão de Logout */}
          <li className="flex items-center space-x-4 mt-6 cursor-pointer">
            <LogoutCurve size="24" color="#8492A6" />
            <button onClick={handleLogout} className="text-gray-700 hover:text-ciano">
              Sair
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}
