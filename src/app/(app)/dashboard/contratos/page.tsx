"use client";
import Header from "@/components/Header";
import { useGetServiceContracts } from "@/hooks/api/professional/useServiceContracts";
import React, { useEffect } from "react";

// import { Container } from './styles';

const Contratos: React.FC = () => {
  const { data: contracts } = useGetServiceContracts();

  return (
    <div>
      <Header title="Contratos" />
      <div className="mt-6 card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Página em Desenvolvimento
          </h3>
          <p className="text-gray-600">
            O módulo financeiro completo estará disponível em breve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contratos;
