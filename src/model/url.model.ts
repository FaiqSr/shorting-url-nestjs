export class UrlResponse {
  id: number;
  username: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UrlCreateRequest {
  name: string;
  url: string;
}

export class UrlGetRequest {
  page?: number;
  size?: number;
}

export class UrlRemoveRequest {
  urlId: number;
}

export class UrlUpdateRequest {
  id: number;
  name?: string;
  url?: string;
}
