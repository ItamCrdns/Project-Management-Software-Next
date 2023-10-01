import { type Images } from './images'

export interface Project {
  projectId: number
  name: string
  description: string
  created: string // its a date!
  finalized: string // its a date too!
  projectCreatorId: number
  images: Images
}
