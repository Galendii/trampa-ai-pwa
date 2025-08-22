"use client";
import { Building2, Shield, Sparkles } from "lucide-react";
import React from "react";
import Card from "@/components/ui/Card";

// import { Container } from './styles';

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Seus dados protegidos com criptografia de ponta",
    },
    {
      icon: Sparkles,
      title: "Inteligência Artificial",
      description: "IA para otimizar sua gestão automaticamente",
    },
    {
      icon: Building2,
      title: "Gestão Completa",
      description: "Tudo que você precisa em uma só plataforma",
    },
  ];
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 sm:p-8">
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 text-center">
        {features.map((feature) => (
          <Card.Root key={feature.title}>
            <Card.Icon Icon={feature.icon} />
            <Card.Header
              title={feature.title}
              description={feature.description}
            />
          </Card.Root>
        ))}
      </div>
    </div>
  );
};

export default Features;
