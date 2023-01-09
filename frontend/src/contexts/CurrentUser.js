import { createContext, useState, useEffect } from "react"; // Import useEffect hook

export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)

    // Include useEffect in CurrentUserProvider to make fetch request:
    useEffect(() => {

        const getLoggedInUser = async () => {
            let response = await fetch('http://localhost:5000/authentication/profile', {
                credentials: 'include'
            })
            let user = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])
    
    return (
        <CurrentUser.Provider value={ { currentUser, setCurrentUser } }>
            { children }
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider