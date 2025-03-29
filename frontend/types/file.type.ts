export interface File {
    id: string
    name: string
    description: string
    language: string | null
    snippet: {id: string} | null
    createdAt: number
    root: boolean
    folder: boolean
  }
