export type ServiceType =
  | "flight"
  | "hotel"
  | "tour"
  | "stay"
  | "train"
  | "bus";

export type TripType = "oneway" | "roundtrip" | "multicity";
export type CabinClass = "economy" | "business" | "first";

export interface LocationValue {
  code: string;
  name: string;
  subtitle?: string;
}

export interface PassengerState {
  adults: number;
  children: number;
  infants: number;
  cabinClass: CabinClass;
}

export interface TravelSearchState {
  serviceType: ServiceType;
  tripType: TripType;
  origin: LocationValue | null;
  destination: LocationValue | null;
  departureDate: string;
  returnDate: string;
  passengers: PassengerState;
  rooms: number;
  guests: number;
  directOnly: boolean;
  oneWayTicketOnly: boolean;
}

export interface SearchErrors {
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
}

export const cabinClassLabels: Record<CabinClass, string> = {
  economy: "اکونومی",
  business: "بیزینس",
  first: "فرست",
};

export const defaultSearchState: TravelSearchState = {
  serviceType: "flight",
  tripType: "roundtrip",
  origin: {
    code: "THR",
    name: "تهران",
    subtitle: "تهران (همه فرودگاه‌ها)",
  },
  destination: {
    code: "MHD",
    name: "مشهد",
    subtitle: "مشهد",
  },
  departureDate: "۱۴۰۵/۰۳/۱۰",
  returnDate: "۱۴۰۵/۰۳/۱۵",
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: "economy",
  },
  rooms: 1,
  guests: 2,
  directOnly: true,
  oneWayTicketOnly: false,
};

export function totalPassengers(passengers: PassengerState): number {
  return passengers.adults + passengers.children + passengers.infants;
}

export function passengerSummary(passengers: PassengerState): string {
  const total = totalPassengers(passengers);
  const persianTotal = String(total).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
  return `${persianTotal} مسافر، ${cabinClassLabels[passengers.cabinClass]}`;
}

export function validateSearch(state: TravelSearchState): SearchErrors {
  const errors: SearchErrors = {};

  if (!state.origin) {
    errors.origin = "مبدا را انتخاب کنید";
  }
  if (!state.destination) {
    errors.destination = "مقصد را انتخاب کنید";
  }
  if (
    state.origin &&
    state.destination &&
    state.origin.code === state.destination.code
  ) {
    errors.destination = "مبدا و مقصد نباید یکسان باشند";
  }
  if (!state.departureDate.trim()) {
    errors.departureDate = "تاریخ رفت را مشخص کنید";
  }
  if (
    state.serviceType === "flight" &&
    state.tripType === "roundtrip" &&
    !state.returnDate.trim()
  ) {
    errors.returnDate = "تاریخ برگشت را مشخص کنید";
  }
  if (
    (state.serviceType === "hotel" || state.serviceType === "stay") &&
    !state.returnDate.trim()
  ) {
    errors.returnDate = "تاریخ خروج را مشخص کنید";
  }

  return errors;
}

export function buildSearchUrl(state: TravelSearchState): string {
  const params = new URLSearchParams();

  switch (state.serviceType) {
    case "flight": {
      if (state.origin) params.set("origin", state.origin.code);
      if (state.destination) params.set("destination", state.destination.code);
      params.set("departure", state.departureDate);
      if (state.tripType === "roundtrip") {
        params.set("return", state.returnDate);
      }
      params.set("tripType", state.tripType);
      params.set("adults", String(state.passengers.adults));
      params.set("children", String(state.passengers.children));
      params.set("infants", String(state.passengers.infants));
      params.set("cabin", state.passengers.cabinClass);
      if (state.directOnly) params.set("direct", "1");
      return `/search/flights?${params.toString()}`;
    }
    case "hotel": {
      if (state.destination) params.set("destination", state.destination.name);
      params.set("checkIn", state.departureDate);
      params.set("checkOut", state.returnDate);
      params.set("rooms", String(state.rooms));
      params.set("guests", String(state.guests));
      return `/search/hotels?${params.toString()}`;
    }
    case "tour": {
      if (state.origin) params.set("origin", state.origin.code);
      if (state.destination) params.set("destination", state.destination.code);
      params.set("date", state.departureDate);
      params.set("passengers", String(totalPassengers(state.passengers)));
      return `/search/tours?${params.toString()}`;
    }
    case "stay": {
      if (state.destination) params.set("city", state.destination.name);
      params.set("checkIn", state.departureDate);
      params.set("checkOut", state.returnDate);
      params.set("guests", String(state.guests));
      return `/search/stays?${params.toString()}`;
    }
    case "train": {
      if (state.origin) params.set("origin", state.origin.code);
      if (state.destination) params.set("destination", state.destination.code);
      params.set("date", state.departureDate);
      params.set("passengers", String(totalPassengers(state.passengers)));
      return `/search/trains?${params.toString()}`;
    }
    case "bus": {
      if (state.origin) params.set("origin", state.origin.code);
      if (state.destination) params.set("destination", state.destination.code);
      params.set("date", state.departureDate);
      params.set("passengers", String(totalPassengers(state.passengers)));
      return `/search/buses?${params.toString()}`;
    }
    default:
      return "/search/flights";
  }
}
