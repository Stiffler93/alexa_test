declare module 'awis' {
    interface AwisOptions {
      key: string;
      secret: string;
    }
  
    interface AwisRequest {
      Action: string;
      [keyof: string]: string;
    }
  
    type AwisCallback = (error: Error | null, data: any) => void
  
    type AwisFunction = (req: AwisRequest, callback: AwisCallback) => void
  
    type Awis = (options: AwisOptions) => AwisFunction
    const awis: Awis
    export = awis
  }