import React, { ReactNode } from "react"
import { PersonalInfo } from "../components/PersonalInfoForm"
import { VolunteerInfo } from "../components/VolunteerInfoForm"
import {EmergencyInfo} from '../components/EmergencyContactForm'

type Volunteer = {
    personalInfo?: PersonalInfo
    volunteerInfo?: VolunteerInfo,
    emergencyInfo?: EmergencyInfo
}

type StoreContext = {
    volunteer: Volunteer | null,
    updatePersonalInfo: (update: PersonalInfo) => void,
    updateVolunteerInfo: (update: VolunteerInfo) => void,
    updateEmergencyInfo: (update: EmergencyInfo) => void
}

type Props = {
    value: StoreContext,
    children: ReactNode
}
export const StoreContext = React.createContext<StoreContext | null>(null)

const StoreProvider = ({children}: Props): JSX.Element => {
    const [volunteer, setVolunteer] = React.useState<Volunteer | null>(null)

    const updatePersonalInfo = (update: PersonalInfo) => {
        setVolunteer({...volunteer, personalInfo: update})
    }

    const updateVolunteerInfo = (update: VolunteerInfo) => {
        setVolunteer({...volunteer, volunteerInfo: update})
    }

    const updateEmergencyInfo = (update: EmergencyInfo) => {
        setVolunteer({...volunteer, emergencyInfo: update})
    }

    return <StoreContext.Provider value={{volunteer, updatePersonalInfo, updateVolunteerInfo, updateEmergencyInfo}}>{children}</StoreContext.Provider>
}

export default StoreProvider