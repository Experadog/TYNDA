import { CommonResponse, Paginated } from "@common";

export type EstablishmentTranslate = {
  name: string;
  description: string;
};

export type EstablishmentTranslates = {
  en: EstablishmentTranslate;
  ru: EstablishmentTranslate;
};

export type Establishment = {
  translates: EstablishmentTranslates;
  id: string;
  category: string;
  status: 'enable' | 'disable';
  discount: number;
  cover: string;
  average_bill: number;
};

export type EstablishmentDetail = {
  translates: {
    en: {
      description: string;
      name: string;
    };
    ru: {
      description: string;
      name: string;
    };
  };
  name: string;
  address: string;
  coordinates: string;
  contacts: {
    phone: string;
    telegram: string;
  };
  website: string;
  email: string;
  status: 'enable' | 'disable'; // предположил, может быть несколько статусов
  average_bill: number;
  work_time: string;
  id: string;
  category: string;
  images: string[];
  cover: string;
}

export type GetEstablishmentAllClientResponseModel = CommonResponse<Paginated<Establishment>>;
export type GetEstablishmentDetailResponseModel = CommonResponse<EstablishmentDetail>;
