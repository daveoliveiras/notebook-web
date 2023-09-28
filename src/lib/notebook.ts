export type Notebook = {
  id: number,
  model: string
  brand: {name: string}
  system: {name: string, version: number}
  ram: number
  hd: number | null
  ssd: number | null
}