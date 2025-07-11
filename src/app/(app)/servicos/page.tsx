"use client";

import Header from "@/components/Header";
import { useGetServices } from "@/hooks/api/professional/useService";
import React from "react";

const ServicesPage = () => {
  const { data: services } = useGetServices();
  console.log(services);
  return (
    <div>
      <Header title="Serviços" />
    </div>
  );
};

export default React.memo(ServicesPage);
