"use client";
import Header from "../../../components/Header";
import KPICard from "../../../components/KPICard";
import FaturamentoChart from "../../../components/FaturamentoChart";
import TransacoesTable from "../../../components/TransacoesTable";
import { kpis } from "../../../lib/mock-data";
import PWAInstallBanner from "../../../components/PWAInstallBanner";
import { useUser } from "@/hooks/api/useUsers";

export default function DashboardPage() {
  const { data: user } = useUser();
  console.log(user);
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Header title="Dashboard" />

      {/* PWA Install Banner */}
      <PWAInstallBanner variant="card" />

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* Chart and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FaturamentoChart />
        <TransacoesTable />
      </div>
    </div>
  );
}
