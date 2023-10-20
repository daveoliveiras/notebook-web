export type Notebook = {
  id: number,
  model: string 
  brand: {name: string},
  system: {name: string, version: string}
  processor_brand: string,
  processor_model: string,
  clock: number,
  hd: number | null,
  ssd: number | null,
  ram: number,
  ddr: number,
  resolution: string,
  note: string,
  photos: [{path: string}]
}