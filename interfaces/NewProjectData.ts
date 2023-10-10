export interface NewProjectData {
  data: {
    name: string
    description: string
    companyId: number | null
    companyName: string | null // Only for displaying purposes
    priority: number | null
    employees: number[] | null
    // * To add images
  }
  setData: React.Dispatch<React.SetStateAction<NewProjectData>>
}
