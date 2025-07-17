import React from "react";

// import { Container } from './styles';

const LoginHeader: React.FC = () => {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl sm:text-2xl">T</span>
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2 sm:mb-4">
        Bem-vindo ao <span className="text-primary-600">Trampa AI</span>
      </h1>
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
        Sua gestão, clara como o dia. Escolha como você quer acessar nossa
        plataforma.
      </p>
    </div>
  );
};

export default LoginHeader;
