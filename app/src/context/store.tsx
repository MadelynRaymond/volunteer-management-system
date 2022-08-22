import React, { ReactNode } from "react"
import { PersonalInfo } from "../components/PersonalInfoForm"
import { VolunteerInfo } from "../components/VolunteerInfoForm"
import {EmergencyInfo} from '../components/EmergencyContactForm'
import { emptyVolunteer } from "../utils/volunteer"

type Volunteer = {
    personalInfo?: PersonalInfo
    volunteerInfo?: VolunteerInfo,
    emergencyInfo?: EmergencyInfo
}

interface VolunteerDTO {
    id: number,
    username: string,
    password: string,
    role: string,
    profile: {
        firstName: string,
        lastName: string,
        bio?: Object,
        address: string,
        homePhoneNumber?: string,
        workPhoneNumber?: string,
        cellPhoneNumber: string,
        availability: any[],
        skills: any[],
        preferredCenters: any[],
        email: string,
        education: string,
        currentLicenses?: string,
        driversLicenseOnFile: boolean,
        socialSecurityOnFile: boolean,
        approvalStatus: string,
        emergencyInfo: {
            contactName: string,
            contactHomePhoneNumber: string,
            contactWorkPhoneNumber?: string,
            contactEmail?: string,
            contactAddress?: string,
        }
    }
}

export type StoreContext = {
    volunteer: Volunteer | null,
    updatePersonalInfo: (update: PersonalInfo) => void,
    updateVolunteerInfo: (update: VolunteerInfo) => void,
    updateEmergencyInfo: (update: EmergencyInfo) => void,
    updateVolunteer: (update: unknown) => void
}

type Props = {
    value?: StoreContext,
    children?: React.ReactNode
}
export const StoreContext = React.createContext<StoreContext | null>(null)

const StoreProvider = ({children}: Props) => {
    const [volunteer, setVolunteer] = React.useState<Volunteer>({})

    const updateVolunteer = (volunteer: unknown) => {
        
        const isExistingVolunteer = (data: unknown): data is VolunteerDTO => {
            if(data !== undefined && data !== null){
                return true
            }
            return false
        }

        if(isExistingVolunteer(volunteer)){
            console.log('correct')
            const personalInfo: PersonalInfo = {
                firstName: volunteer.profile.firstName,
                lastName: volunteer.profile.lastName,
                username: volunteer.username,
                password: volunteer.password,
                email: volunteer.profile.email,
                address: volunteer.profile.address,
                cellPhoneNumber: volunteer.profile.cellPhoneNumber
            }

            const volunteerInfo: VolunteerInfo = {
                availability: volunteer.profile.availability, //missing from backend
                preferredCenters: volunteer.profile.preferredCenters,
                skills: volunteer.profile.skills,
                currentLicenses: volunteer.profile.currentLicenses,
                education: volunteer.profile.education,
                driversLicenseOnFile: volunteer.profile.driversLicenseOnFile,
                socialSecurityOnFile: volunteer.profile.socialSecurityOnFile,
                approvalStatus: volunteer.profile.approvalStatus
            }

            const emergencyInfo: EmergencyInfo = {
                contactName: volunteer.profile.emergencyInfo.contactName,
                contactEmail: volunteer.profile.emergencyInfo.contactEmail,
                contactHomePhoneNumber: volunteer.profile.emergencyInfo.contactHomePhoneNumber,
                contactAddress: volunteer.profile.emergencyInfo.contactAddress,
                contactWorkPhoneNumber: volunteer.profile.emergencyInfo.contactWorkPhoneNumber
            }

            setVolunteer({personalInfo, volunteerInfo, emergencyInfo})
        }
        else {
            setVolunteer(emptyVolunteer)
        }
    }

    const updatePersonalInfo = (update: PersonalInfo) => {
        setVolunteer({...volunteer, personalInfo: update})
    }

    const updateVolunteerInfo = (update: VolunteerInfo) => {
        setVolunteer({...volunteer, volunteerInfo: update})
    }

    const updateEmergencyInfo = (update: EmergencyInfo) => {
        setVolunteer({...volunteer, emergencyInfo: update})
    }

    return <StoreContext.Provider value={{volunteer, updateVolunteer, updatePersonalInfo, updateVolunteerInfo, updateEmergencyInfo}}>{children}</StoreContext.Provider>
}

export default StoreProvider