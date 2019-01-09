declare module "rn-fetch-blob" {
  interface response {
    json(): IData
    path(): string
  }

  export function fetch(method: string, url: string, config?: IData, body?: any): Promise<response>
  export function wrap(path: string): string
  export function config(config: IData): { 
    fetch: typeof fetch
   }
  export const fs: {
    unlink(path: string): string
  }
}