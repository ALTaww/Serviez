import { $bookingHost } from ".";
import { IBooking } from "../types/database";

class BookingApi {
  create = async (
    serviceVariantId: string,
    startTime: Date,
    signal: AbortSignal
  ): Promise<IBooking> => {
    const { data } = await $bookingHost.post(
      `/`,
      { serviceVariantId, startTime },
      { signal }
    );
    return data;
  };

  changeStatus = async (
    bookingId: string,
    status: string,
    signal: AbortSignal
  ): Promise<IBooking> => {
    const { data } = await $bookingHost.post(
      `/${bookingId}/variants`,
      { status },
      { signal }
    );
    return data;
  };

  getBookingById = async (
    bookingId: string,
    signal: AbortSignal
  ): Promise<IBooking> => {
    const { data } = await $bookingHost.get(`/${bookingId}`, { signal });
    return data;
  };

  getUserBookings = async (signal: AbortSignal): Promise<IBooking> => {
    const { data } = await $bookingHost.get(`/my`, { signal });
    return data;
  };

  getEmployeeBookings = async (signal: AbortSignal): Promise<IBooking> => {
    const { data } = await $bookingHost.get(`/my/employee`, { signal });
    return data;
  };

  delete = async (
    variantId: string,
    signal: AbortSignal
  ): Promise<IBooking> => {
    const { data } = await $bookingHost.delete(`/${variantId}`, {
      signal,
    });
    return data;
  };
}

export default new BookingApi();
