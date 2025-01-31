export class UrlResponse {
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
