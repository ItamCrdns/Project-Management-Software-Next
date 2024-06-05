import { Employee } from './employee'
import { Project } from './project'

export interface ProjectPicture {
  projectPictureId: number
  projectId: number
  imageUrl: string
  cloudinaryPublicId: string
  created: Date
  employeeId: number
  Project: Project
  Employee: Employee
}
