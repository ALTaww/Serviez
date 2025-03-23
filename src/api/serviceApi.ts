import { $serviceHost } from ".";
import { IService } from "../types/database";

class ServiceApi {
  createService = async (
    serviceData: { title: string; description: string; category: string },
    signal: AbortSignal
  ): Promise<IService> => {
    const { data } = await $serviceHost.post(`/`, serviceData, { signal });
    return data;
  };

  getServices = async (
    queryObject: {
      employeeId?: string;
      limit?: number;
      offset?: number;
      category?: string;
    },
    signal: AbortSignal
  ): Promise<IService[]> => {
    const { data } = await $serviceHost.get(`/`, {
      params: { queryObject },
      signal,
    });
    return data;
  };

  getServiceById = async (
    id: string,
    signal: AbortSignal
  ): Promise<IService> => {
    const { data } = await $serviceHost.get(`/${id}`, { signal });
    return data;
  };

  changeTitle = async (
    serviceId: string,
    title: string,
    signal: AbortSignal
  ): Promise<IService> => {
    const { data } = await $serviceHost.patch(
      `/${serviceId}/change/title`,
      { title },
      { signal }
    );
    return data;
  };

  changeDescription = async (
    serviceId: string,
    description: string,
    signal: AbortSignal
  ): Promise<IService> => {
    const { data } = await $serviceHost.patch(
      `/${serviceId}/change/description`,
      { description },
      { signal }
    );
    return data;
  };

  changeCategory = async (
    serviceId: string,
    category: string,
    signal: AbortSignal
  ): Promise<IService> => {
    const { data } = await $serviceHost.patch(
      `/${serviceId}/change/category`,
      { category },
      { signal }
    );
    return data;
  };

  changeIsActive = async (
    serviceId: string,
    isActive: string,
    signal: AbortSignal
  ): Promise<IService> => {
    const { data } = await $serviceHost.patch(
      `/${serviceId}/change/isActive`,
      { isActive },
      { signal }
    );
    return data;
  };

  update = async (
    serviceId: string,
    updates: Partial<IService>,
    signal: AbortSignal
  ): Promise<IService> => {
    const { data } = await $serviceHost.patch(`/${serviceId}`, updates, {
      signal,
    });
    return data;
  };

  delete = async (
    serviceId: string,
    signal: AbortSignal
  ): Promise<IService> => {
    const { data } = await $serviceHost.delete(`/${serviceId}`, { signal });
    return data;
  };
}

export default new ServiceApi();
