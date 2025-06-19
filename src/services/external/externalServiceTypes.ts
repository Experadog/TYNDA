import type { ExternalEntities } from '@business-entities';

export type GETOpenStreetSearchResponseModel = Promise<ExternalEntities['OpenStreetMapDataItem'][]>;
export type TranslateRequestModel = { text: string; to: Locale };
export type TranslateResponseModel = { text: string };
