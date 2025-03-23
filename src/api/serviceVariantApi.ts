import { $serviceVariantHost } from ".";
import { IServiceVariant, IWorkingHours } from "../types/database";

class ServiceVariantApi {
  create = async (
    serviceId: string,
    variant: Omit<IServiceVariant, "_id" | "service">,
    signal: AbortSignal
  ): Promise<IServiceVariant> => {
    const { data } = await $serviceVariantHost.post(
      `/${serviceId}/variants`,
      variant,
      { signal }
    );
    return data;
  };

  createWithWorkingHours = async (
    serviceId: string,
    variant: Omit<IServiceVariant, "_id" | "service">,
    workingHours: IWorkingHours["days"],
    signal: AbortSignal
  ): Promise<IServiceVariant> => {
    const { data } = await $serviceVariantHost.post(
      `/${serviceId}/variants`,
      { variant, workingHours },
      { signal }
    );
    return data;
  };

  getVariantsByServiceId = async (
    serviceId: string,
    signal: AbortSignal
  ): Promise<IServiceVariant[]> => {
    const { data } = await $serviceVariantHost.get(`/${serviceId}`, { signal });
    return data;
  };

  getAllVariants = async (signal: AbortSignal): Promise<IServiceVariant[]> => {
    const { data } = await $serviceVariantHost.get(`/`, { signal });
    return data;
  };

  update = async (
    serviceId: string,
    variantId: string,
    variant: Omit<IServiceVariant, "_id" | "service">,
    signal: AbortSignal
  ): Promise<IServiceVariant[]> => {
    const { data } = await $serviceVariantHost.put(
      `/${serviceId}/${variantId}`,
      variant,
      { signal }
    );
    return data;
  };

  delete = async (
    serviceId: string,
    variantId: string,
    signal: AbortSignal
  ): Promise<IServiceVariant[]> => {
    const { data } = await $serviceVariantHost.delete(
      `/${serviceId}/${variantId}`,
      { signal }
    );
    return data;
  };
}

export default new ServiceVariantApi();
