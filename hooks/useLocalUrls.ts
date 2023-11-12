import { useLocalStorage } from "@/hooks/useLocalStorage"

type DalleUrl = {
    url: string,
    prompt: string,
    timestamp: Date,
}

export const useLocalUrls = (urls?: string[]) => {
    const {storedValue, setValue} = useLocalStorage<DalleUrl[]>("urls", urls?.map(url => ({ url, prompt: "", timestamp: new Date() })) || [])
    
    const addNewUrl = (url: string, prompt: string) => {
        const newUrl = { url, prompt: prompt, timestamp: new Date() }
        setValue([...storedValue, newUrl])
    }

    return {addNewUrl, urlsFromLocalStorage: storedValue}
}