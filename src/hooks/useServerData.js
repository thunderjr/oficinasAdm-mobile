import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const useServerData = async () => {
    try {
        const data = await AsyncStorage.getItem('serverData')
        if (data !== null) {
            const { ip, port } = JSON.parse(data)
            if (!!ip && !!port) {
                const response = await axios.get(`http://${ip}:${port}/test`)
                if (response.status === 200) {
                    return { ip, port }
                }
            } else {
                await AsyncStorage.removeItem('serverData')
            }
        } else {
            return false
        }
    } catch (e) {
        console.log('error on custom hook')
        console.log(e)
        return false
    }
}

export default useServerData