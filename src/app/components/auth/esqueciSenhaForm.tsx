'use client';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EsqueciSenha() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Estado para armazenar o OTP

  // Função para lidar com a mudança de OTP
  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focar automaticamente no próximo input
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  // Função para submeter o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join(''); // Unindo os valores do OTP em um único código
    if (otpCode.length === 6) {
      toast.success('OTP validado com sucesso!');
      // Realizar ação de recuperação de senha
    } else {
      toast.error('Por favor, insira um código de 6 dígitos.');
    }
  };

  // Função para permitir apenas números e teclas de controle
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" w-full max-w-md">

        <ToastContainer />
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-6 grid grid-cols-6 gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={handleKeyDown}
                inputMode="numeric"
                className="w-full text-center px-3 py-2 text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ciano"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white rounded-lg text-md font-medium hover:bg-teal-700 transition-colors"
          >
            Validar código
          </button>
        </form>
      </div>
    </div>
  );
}
