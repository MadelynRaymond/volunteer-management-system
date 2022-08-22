import { EmergencyInfo } from "../components/EmergencyContactForm"
import { PersonalInfo } from "../components/PersonalInfoForm"
import { VolunteerInfo } from "../components/VolunteerInfoForm"

const personalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  email: '',
  address: '',
  cellPhoneNumber: ''
}

const volunteerInfo: VolunteerInfo = {
  availability: [],
  preferredCenters: [],
  skills: [],
  currentLicenses: '',
  education: '',
  driversLicenseOnFile: undefined,
  socialSecurityOnFile: undefined,
  approvalStatus: ''
}

const emergencyInfo: EmergencyInfo = {
  contactName: '',
  contactEmail: '',
  contactHomePhoneNumber: '',
  contactAddress: '',
  contactWorkPhoneNumber: '',
}

export const emptyVolunteer = {personalInfo, volunteerInfo, emergencyInfo}