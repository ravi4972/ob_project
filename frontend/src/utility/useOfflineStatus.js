import { useState, useEffect } from "react";

const useOfflineStatus =()=>{
    const [isOffline, setIsOffline] = useState(!navigator.onLine)
    useEffect(()=>{
        function handleOnline(){
            setIsOffline(false)
        }

        function handleOffline(){
            setIsOffline(true)
        }

        window.addEventListener("online", () => {
            handleOnline()
        });

        window.addEventListener("offline", () => {
            handleOffline()
        });

        return() => {
            window.removeEventListener('online',  handleOnline());
            window.removeEventListener('offline', handleOffline());
        };
    },[])

    return isOffline
}

export default useOfflineStatus