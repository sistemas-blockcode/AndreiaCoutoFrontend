import LoginForm from '@/app/components/auth/loginForm';
import { Logo } from '@/app/components/ui/logo';

export default function LoginPage() {

  return (
    <div className="min-h-[700px] flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4">
          <Logo size={160}/>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Entre com seu e-mail!
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Use seu e-mail comercial para fazer login e desfrutar de seus estudos!
        </p>
        <div className="flex justify-center mb-6">
          <button className="flex gap-2 items-center justify-center border border-gray-300 rounded-lg py-2 px-4 w-full bg-white hover:bg-gray-100">
            <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
            Faça login com o Google
          </button>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}
