import {
  demoBuses,
  demoFlights,
  demoHotels,
  demoStays,
  demoTours,
  demoTrains,
  priceLabel,
} from "@/data/demo";

export type BookingProductType =
  | "flight"
  | "hotel"
  | "tour"
  | "stay"
  | "train"
  | "bus";

export interface BookingItem {
  type: BookingProductType;
  id: string;
  roomId?: string;
  title: string;
  subtitle: string;
  meta: string[];
  price: number;
  image?: string;
  backHref: string;
  typeLabel: string;
}

export const bookingSteps = [
  { id: "select", label: "انتخاب" },
  { id: "passengers", label: "مسافران" },
  { id: "payment", label: "پرداخت" },
  { id: "success", label: "صدور" },
] as const;

export type BookingStepId = (typeof bookingSteps)[number]["id"];

export function resolveBookingItem(
  type: string | null | undefined,
  id: string | null | undefined,
  roomId?: string | null,
): BookingItem | null {
  if (!type || !id) return null;

  if (type === "flight") {
    const flight = demoFlights.find((item) => item.id === id);
    if (!flight) return null;
    return {
      type: "flight",
      id: flight.id,
      title: `${flight.origin} → ${flight.destination}`,
      subtitle: `${flight.airline} · ${flight.flightNo}`,
      meta: [
        `${flight.departTime} - ${flight.arriveTime}`,
        flight.duration,
        flight.cabin,
        flight.stops === 0 ? "مستقیم" : `${flight.stops} توقف`,
      ],
      price: flight.price,
      backHref: "/flights",
      typeLabel: "بلیط پرواز",
    };
  }

  if (type === "hotel") {
    const hotel = demoHotels.find((item) => item.id === id);
    if (!hotel) return null;
    const room =
      hotel.rooms.find((item) => item.id === roomId) ?? hotel.rooms[0];
    return {
      type: "hotel",
      id: hotel.id,
      roomId: room.id,
      title: hotel.name,
      subtitle: `${hotel.city} · ${room.name}`,
      meta: [room.board, `ظرفیت ${room.capacity} نفر`, hotel.address],
      price: room.price,
      image: hotel.image,
      backHref: `/hotels/${hotel.id}`,
      typeLabel: "رزرو هتل",
    };
  }

  if (type === "tour") {
    const tour = demoTours.find((item) => item.id === id);
    if (!tour) return null;
    return {
      type: "tour",
      id: tour.id,
      title: tour.title,
      subtitle: `${tour.origin} → ${tour.destination}`,
      meta: [
        `${tour.days} روز / ${tour.nights} شب`,
        `حرکت ${tour.departure}`,
        ...tour.includes.slice(0, 2),
      ],
      price: tour.priceFrom,
      image: tour.image,
      backHref: `/tours/${tour.id}`,
      typeLabel: "رزرو تور",
    };
  }

  if (type === "stay") {
    const stay = demoStays.find((item) => item.id === id);
    if (!stay) return null;
    return {
      type: "stay",
      id: stay.id,
      title: stay.title,
      subtitle: `${stay.city} · ${stay.type}`,
      meta: [
        `محله ${stay.neighborhood}`,
        `${stay.guests} مهمان`,
        `${stay.rooms} اتاق`,
      ],
      price: stay.priceFrom,
      image: stay.image,
      backHref: `/stays/${stay.id}`,
      typeLabel: "رزرو اقامتگاه",
    };
  }

  if (type === "train") {
    const train = demoTrains.find((item) => item.id === id);
    if (!train) return null;
    return {
      type: "train",
      id: train.id,
      title: `${train.origin} → ${train.destination}`,
      subtitle: train.company,
      meta: [
        `${train.departTime} - ${train.arriveTime}`,
        train.duration,
        train.seatClass,
      ],
      price: train.price,
      backHref: "/trains",
      typeLabel: "بلیط قطار",
    };
  }

  if (type === "bus") {
    const bus = demoBuses.find((item) => item.id === id);
    if (!bus) return null;
    return {
      type: "bus",
      id: bus.id,
      title: `${bus.origin} → ${bus.destination}`,
      subtitle: bus.company,
      meta: [
        `${bus.departTime} - ${bus.arriveTime}`,
        bus.duration,
        bus.seatClass,
      ],
      price: bus.price,
      backHref: "/buses",
      typeLabel: "بلیط اتوبوس",
    };
  }

  return null;
}

export function buildBookingHref(
  step: "passengers" | "payment" | "success",
  item: Pick<BookingItem, "type" | "id" | "roomId">,
  extra?: Record<string, string>,
) {
  const params = new URLSearchParams({
    type: item.type,
    id: item.id,
    ...(item.roomId ? { room: item.roomId } : {}),
    ...extra,
  });
  return `/booking/${step}?${params.toString()}`;
}

export function formatBookingPrice(amount: number) {
  return priceLabel(amount);
}

export const BOOKING_STORAGE_KEY = "moscowa-booking-draft";

export interface PassengerDraft {
  firstName: string;
  lastName: string;
  nationalId: string;
  gender: "male" | "female" | "";
  birthDate: string;
  phone: string;
  email: string;
}

export interface BookingDraft {
  type: BookingProductType;
  id: string;
  roomId?: string;
  passengers: PassengerDraft[];
  extras: {
    flexibleRefund: boolean;
    insurance: boolean;
  };
  contactPhone: string;
  contactEmail: string;
  acceptTerms: boolean;
}

export function createEmptyPassenger(): PassengerDraft {
  return {
    firstName: "",
    lastName: "",
    nationalId: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
  };
}

export function createBookingDraft(
  item: BookingItem,
  passengerCount = 1,
): BookingDraft {
  return {
    type: item.type,
    id: item.id,
    roomId: item.roomId,
    passengers: Array.from({ length: passengerCount }, () =>
      createEmptyPassenger(),
    ),
    extras: {
      flexibleRefund: false,
      insurance: false,
    },
    contactPhone: "",
    contactEmail: "",
    acceptTerms: false,
  };
}

export function calcBookingTotal(
  basePrice: number,
  extras: BookingDraft["extras"],
  passengerCount: number,
) {
  const perPerson = basePrice;
  let total = perPerson * Math.max(passengerCount, 1);
  if (extras.flexibleRefund) total += 180000 * Math.max(passengerCount, 1);
  if (extras.insurance) total += 320000 * Math.max(passengerCount, 1);
  return total;
}

export function generateOrderCode() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `NT-${n}`;
}
