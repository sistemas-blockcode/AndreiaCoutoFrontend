'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeSlash } from 'iconsax-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar as credenciais para a API de autenticação
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Erro na autenticação');
      }

      const data = await response.json();

      // Armazene o token JWT em cookies ou localStorage (exemplo usando cookies)
      document.cookie = `token=${data.token}; path=/; max-age=3600`;

      // Verifique se a URL de redirecionamento foi retornada
      if (data.redirectUrl) {
        toast.success('Login bem-sucedido! Redirecionando...', {
          autoClose: 3000, // Fechar após 3 segundos
        });
        setTimeout(() => {
          router.push(data.redirectUrl); // Redireciona para a URL retornada pelo backend
        }, 3000); // Aguarda 3 segundos antes de redirecionar
      } else {
        throw new Error('URL de redirecionamento não encontrada');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      toast.error('Falha ao realizar login. Verifique suas credenciais.', {
        autoClose: 5000, // Fechar após 5 segundos
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ciano"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="sr-only">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ciano"
            placeholder="Entre com sua senha"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            {showPassword ? <EyeSlash size="24" color="#888" /> : <Eye size="24" color="#888" />}
          </button>
        </div>
        <div className="mb-4 text-right">
          <a href="/esqueci-a-senha" className="text-ciano hover:underline">
            Esqueceu sua senha?
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-ciano text-white rounded-lg"
        >
          Login
        </button>
      </form>
    </>
  );
}
