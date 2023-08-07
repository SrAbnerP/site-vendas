import { DashboardData } from "@/models/dashboard";
import { AxiosResponse } from "axios";
import { httpClient } from "./http/httpClient";

const resourceURL: string = "/api/dashboard";

export const useDashboardService = () => {
  const carregarDashboard = async (): Promise<DashboardData> => {
    const response: AxiosResponse<DashboardData> = await httpClient.get(
      resourceURL
    );

    return response.data;
  };

  return {
    carregarDashboard,
  };
};
