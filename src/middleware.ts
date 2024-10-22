import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Obter o token JWT dos cookies
  const token = req.cookies.get('token')?.value;

  const { pathname } = req.nextUrl;

  // Permitir acesso à rota de login mesmo sem o token
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Se o token não existir, redirecionar para a página de login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Se o token existir, permitir acesso às rotas
  return NextResponse.next();
}

// Configurar as rotas protegidas
export const config = {
  matcher: ['/', '/dashboard', '/meus-cursos', '/slides', '/duvidas-ia', '/lembretes', '/configuracao', '/admin/dashboard', '/admin/gestao_de_alunos', '/admin/gestao_de_cursos'], // Defina aqui as rotas que deseja proteger
};
