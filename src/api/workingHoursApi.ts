import { $serviceVariantHost } from ".";
import { IServiceVariant, IWorkingHours } from "../types/database";

class WorkingHoursApi {
  create = async (
    variantId: string,
    workingHours: IWorkingHours["days"],
    signal: AbortSignal
  ): Promise<IServiceVariant> => {
    const { data } = await $serviceVariantHost.post(
      `/${variantId}/working-hours`,
      workingHours,
      { signal }
    );
    return data;
  };

  createWithWorkingHours = async (
    variantId: string,
    variant: Omit<IServiceVariant, "_id" | "service">,
    workingHours: IWorkingHours["days"],
    signal: AbortSignal
  ): Promise<IServiceVariant> => {
    const { data } = await $serviceVariantHost.post(
      `/${variantId}/variants`,
      { variant, workingHours },
      { signal }
    );
    return data;
  };

  getWorkingHoursByVariantId = async (
    variantId: string,
    signal: AbortSignal
  ): Promise<IServiceVariant[]> => {
    const { data } = await $serviceVariantHost.get(`/${variantId}`, { signal });
    return data;
  };

  update = async (
    variantId: string,
    workingHours: IWorkingHours["days"],
    signal: AbortSignal
  ): Promise<IServiceVariant[]> => {
    const { data } = await $serviceVariantHost.put(
      `/${variantId}`,
      workingHours,
      { signal }
    );
    return data;
  };

  delete = async (
    variantId: string,
    signal: AbortSignal
  ): Promise<IServiceVariant[]> => {
    const { data } = await $serviceVariantHost.delete(`/${variantId}`, {
      signal,
    });
    return data;
  };
}

export default new WorkingHoursApi();
