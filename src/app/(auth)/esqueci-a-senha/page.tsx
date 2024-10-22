import EsqueciSenha from '@/app/components/auth/esqueciSenhaForm';
import { Logo } from '@/app/components/ui/logo';

export default function EsqueciSenhaPage() {

  return (
    <div className="min-h-[700px] flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4">
          <Logo size={160}/>
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">
          Insira o código que foi enviado para seu e-mail!
        </h2>
        <EsqueciSenha/>
      </div>
    </div>
  );
}
