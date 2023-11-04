import { type Project } from '../project'

export interface EachProjectProps {
  project: Project
  showCompanyName: boolean // Used to track if the each project component should show the company name in one of its columns or not
  // ! If using showCompanyname, you should also set the "dashboard" property in the HeaderDescriptor to true
}
