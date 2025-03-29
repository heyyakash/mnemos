/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Snippet {
    id: string
    title: string
    description: string
    code: string
    version: number
    history: any[]
    vector: any
    uid: string
    language: string
    createdAt: number
    updatedAt: number
    labels: any[]
    boolean: boolean
    archived: boolean
  }
  