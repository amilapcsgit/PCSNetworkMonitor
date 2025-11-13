
export interface ConnectionDetail {
  localAddress: string;
  localPort: number;
  remoteAddress: string;
  remotePort: number;
  state: 'Established';
  processId: number;
  processName: string;
  country: string;
  region: string;
}
