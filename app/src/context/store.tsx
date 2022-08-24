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
    updateVolunteer: (update: unknown) => void,
    setLoggedIn: (token: string) => void,
    getAuthHeader: () => {Authorization: string},
    token: string
}

type Props = {
    value?: StoreContext,
    children?: React.ReactNode
}
export const StoreContext = React.createContext<StoreContext | null>(null)

const StoreProvider = ({children}: Props) => {
    const [volunteer, setVolunteer] = React.useState<Volunteer>({})
    const [token, setToken] = React.useState('')

    const setLoggedIn = (token: string) => setToken(token)

    const getAuthHeader = () => token ? ({Authorization: `Bearer ${token}`}) : ({Authorization: ''})

    const updateVolunteer = (volunteer: unknown) => {
        
        const isExistingVolunteer = (data: unknown): data is VolunteerDTO => {
            if(data !== undefined && data !== null){
                if(typeof data === 'object'){
                    if(Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) return false
                    return true
                }
            }
            return false
        }

        if(isExistingVolunteer(volunteer)){
            const preferredCenters = volunteer.profile.preferredCenters.map((entry) => ({id: entry.center.id, value: entry.center.name}))
            const skills = volunteer.profile.skills.map((entry) => ({id: entry.skill.id, value: entry.skill.name}))
            const availability = volunteer.profile.availability.map((entry) => ({id: entry.availability.id, value: entry.availability.time}))
            console.log(preferredCenters)
            console.log(skills)
            console.log(availability)
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
                availability, //missing from backend
                preferredCenters,
                skills,
                currentLicenses: volunteer.profile.currentLicenses,
                education: volunteer.profile.education,
                driversLicenseOnFile: volunteer.profile.driversLicenseOnFile,
                socialSecurityOnFile: volunteer.profile.socialSecurityOnFile,
                approvalStatus: volunteer.profile.approvalStatus,
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
            setVolunteer({})
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

    return <StoreContext.Provider value={{volunteer, updateVolunteer, updatePersonalInfo, updateVolunteerInfo, updateEmergencyInfo, getAuthHeader, setLoggedIn, token}}>{children}</StoreContext.Provider>
}

export default StoreProvider