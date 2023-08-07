import { Dashboard } from "@/components/dashboard/Dashboard";
import Layout from "@/components/layout/Layout";
import { DashboardData } from "@/models/dashboard";
import { useDashboardService } from "@/services/dashboardService";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

interface HomeProps {
  dashboard: DashboardData;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const service = useDashboardService();
  const dashboard: DashboardData = await service.carregarDashboard();

  return {
    props: {
      dashboard,
    },
  };
};

export default function Home({
  dashboard,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { clientes, produtos, vendas } = dashboard;

  return (
    <div>
      <Layout titulo="Dashboard">
        <Dashboard clientes={clientes} produtos={produtos} vendas={vendas} />
      </Layout>
    </div>
  );
}
