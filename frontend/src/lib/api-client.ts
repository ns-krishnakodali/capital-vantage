type ApiQueryValue = boolean | null | number | string | undefined;

type ApiQueryParams = Record<string, ApiQueryValue>;

export type ApiRequestOptions = Omit<RequestInit, "body" | "method"> & {
  query?: ApiQueryParams;
};

type RequestBody = BodyInit | object | unknown[] | null | undefined;

type RequestMethod = "DELETE" | "GET" | "POST" | "PUT";

const JSON_CONTENT_TYPE = "application/json";

export class ApiError extends Error {
  data: unknown;
  status: number;
  statusText: string;
  url: string;

  constructor({
    data,
    message,
    status,
    statusText,
    url,
  }: {
    data?: unknown;
    message: string;
    status: number;
    statusText: string;
    url: string;
  }) {
    super(message);
    this.name = "ApiError";
    this.data = data;
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}

const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_CV_API_URL;

  if (!baseUrl) {
    throw new ApiError({
      message: "Missing NEXT_PUBLIC_CV_API_URL environment variable.",
      status: 0,
      statusText: "Configuration Error",
      url: "",
    });
  }

  return baseUrl;
};

const buildUrl = (path: string, query?: ApiQueryParams) => {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(normalizedPath, `${getBaseUrl().replace(/\/+$/, "")}/`);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
};

const isJsonBody = (body: RequestBody): body is object | unknown[] => {
  if (body === null || body === undefined) {
    return false;
  }

  if (typeof body !== "object") {
    return false;
  }

  return !(body instanceof Blob || body instanceof FormData || body instanceof URLSearchParams);
};

const parseResponse = async (response: Response) => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes(JSON_CONTENT_TYPE)) {
    return response.json();
  }

  return response.text();
};

const buildErrorMessage = (response: Response, data: unknown) => {
  if (typeof data === "string" && data.trim() !== "") {
    return data;
  }

  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim() !== ""
  ) {
    return data.message;
  }

  return `Request failed with status ${response.status}${response.statusText ? ` ${response.statusText}` : ""}.`;
};

const request = async <ResponseData>(
  method: RequestMethod,
  path: string,
  options: ApiRequestOptions = {},
  body?: RequestBody,
) => {
  const { headers, query, ...requestInit } = options;
  const url = buildUrl(path, query);
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", JSON_CONTENT_TYPE);
  }

  const requestBody = isJsonBody(body) ? JSON.stringify(body) : body;

  if (isJsonBody(body) && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", JSON_CONTENT_TYPE);
  }

  try {
    const response = await fetch(url, {
      ...requestInit,
      body: requestBody,
      headers: requestHeaders,
      method,
    });

    const data = await parseResponse(response);

    if (!response.ok) {
      throw new ApiError({
        data,
        message: buildErrorMessage(response, data),
        status: response.status,
        statusText: response.statusText,
        url,
      });
    }

    return data as ResponseData;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError({
      data: err,
      message: err instanceof Error ? err.message : "Network request failed.",
      status: 0,
      statusText: "Network Error",
      url,
    });
  }
};

const get = <ResponseData>(path: string, options?: ApiRequestOptions) => {
  return request<ResponseData>("GET", path, options);
};

const post = <ResponseData>(path: string, body?: RequestBody, options?: ApiRequestOptions) => {
  return request<ResponseData>("POST", path, options, body);
};

const put = <ResponseData>(path: string, body?: RequestBody, options?: ApiRequestOptions) => {
  return request<ResponseData>("PUT", path, options, body);
};

const deleteRequest = <ResponseData>(path: string, options?: ApiRequestOptions) => {
  return request<ResponseData>("DELETE", path, options);
};

export const apiClient = {
  delete: deleteRequest,
  get,
  post,
  put,
};
