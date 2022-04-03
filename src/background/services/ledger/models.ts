export interface DeviceResponseData {
  requestId: string;
  method: string;
  error?: any;
  result: any;
}

export interface DeviceRequestData {
  requestId: string;
  method: string;
  params: any;
}
