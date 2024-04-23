import { type Employee } from '@/interfaces/employee'
import { type Option } from '@/interfaces/props/CustomSelectProps'

export const employeesAsOptions = (employees: Employee[]): Option[] =>
  employees.map((x) => ({
    value: x.employeeId,
    label: x.username,
    info: '',
    picture: x.profilePicture
  }))

export const optionAsEmployee = (options: Option): Employee =>
  ({
    employeeId: options.value,
    username: options.label,
    profilePicture: options.picture ?? '',
    role: '',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    gender: '',
    created: '',
    supervisor: null,
    lastLogin: '',
    companyId: 0,
    tierId: 0,
    lockedEnabled: false,
    loginAttempts: 0,
    lockedUntil: '',
    supervisorId: 0,
    company: null,
    projectTotalCount: 0,
    projectsParticipant: 0,
    projectsCreated: 0,
    taskTotalCount: 0,
    tasksParticipant: 0,
    tasksCreated: 0,
    issueTotalCount: 0,
    issuesParticipant: 0,
    issuesCreated: 0,
    tier: {
      tierId: 0,
      name: '',
      duty: '',
      created: ''
    }
  })
