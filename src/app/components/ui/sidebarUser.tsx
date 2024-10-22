'use client';
import { Home, Book, Note, MessageQuestion, Notification, Setting2, LogoutCurve } from 'iconsax-react';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from './logo';
import clsx from 'clsx';

export default function Sidebar() {
  const pathname = usePathname(); // Obtém o pathname atual
  const router = useRouter(); // Para redirecionamento

  const handleLogout = () => {
    // Remove o token JWT dos cookies
    document.cookie = 'token=; Max-Age=0; path=/'; // Remove o cookie de token JWT

    // Redireciona o usuário para a tela de login
    router.push('/login');
  };

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/meus-cursos', label: 'Meus Cursos', icon: Book },
    { href: '/slides', label: 'Slides', icon: Note },
    { href: '/duvidas-ia', label: 'Dúvidas com IA', icon: MessageQuestion },
    { href: '/lembretes', label: 'Lembretes', icon: Notification },
    { href: '/configuracao', label: 'Configurações', icon: Setting2 },
  ];

  return (
    <div className="h-screen w-24 bg-blue-50 flex flex-col p-4 items-center">
      {/* Logo (pode ser um ícone pequeno ou removido) */}
      <div className="flex flex-col items-center mb-8">
        <Logo size={80} /> {/* Tamanho reduzido */}
      </div>

      {/* Navigation Links (apenas ícones) */}
      <nav className="flex flex-col space-y-6 flex-grow">
        {links.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className={clsx(
              'flex justify-center items-center hover:text-ciano font-regular',
              { 'text-ciano': pathname === href, 'text-gray-700': pathname !== href }
            )}
          >
            <Icon 
              size="25" 
              className={clsx('mr-0', { 'text-ciano': pathname === href })} 
            />
          </a>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex justify-center items-center text-gray-700 hover:text-ciano font-regular w-full"
        >
          <LogoutCurve size="24" />
        </button>
      </div>
    </div>
  );
}
