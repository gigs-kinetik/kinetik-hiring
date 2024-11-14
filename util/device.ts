import { v4 as uuid } from 'uuid'

const DEVICE_ID_KEY = 'kinetik-device-id'
const ACCESS_CODE_KEY = 'kinetik-access-code'

export const getDeviceId = () => {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY) || ""
    if(!deviceId){
        deviceId = uuid()
        localStorage.setItem(DEVICE_ID_KEY, deviceId)
    }
    return deviceId
}

export const getAccessCode = (): string | undefined => {
    const code = localStorage.getItem(ACCESS_CODE_KEY) || ""
    if (!code)
        return undefined;
    return code;
}