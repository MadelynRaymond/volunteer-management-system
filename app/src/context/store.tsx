import React, { ReactNode } from "react"
import { PersonalInfo } from "../components/PersonalInfoForm"
import { VolunteerInfo } from "../components/VolunteerInfoForm"
import {EmergencyInfo} from '../components/EmergencyContactForm'

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
        cellPhoneNumber?: string,
        email: "bob@bob.com",
        education?: string,
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
    updateVolunteer: (update: Volunteer) => void
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
            if(data !== null && typeof data === 'object' && data.hasOwnProperty('profile')){
                return true
            }
            return false
        }

        if(isExistingVolunteer(volunteer)){
            
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