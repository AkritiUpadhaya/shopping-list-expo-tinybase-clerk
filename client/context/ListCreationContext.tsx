import { createContext, useContext, useState } from "react"

type ListCreationContextType={
    selectedEmoji:string,
    selectedColor:string,
    setSelectedEmoji:(emoji:string)=>void,
    setSelectedColor:(color:string)=>void,
}
const ListCreationContext= createContext<ListCreationContextType | undefined>(undefined)

export function ListCreationProvider({children}:{
    children:React.ReactNode
}){
    const [selectedEmoji, setSelectedEmoji]= useState("😏")
    const [selectedColor, setSelectedColor]= useState("#9ccaff")
    
    return(
        <ListCreationContext.Provider 
        value={{
            selectedEmoji,
            selectedColor,
            setSelectedEmoji,
            setSelectedColor,

        }}>
            {children}
        </ListCreationContext.Provider>
    )
}

export function useListCreation(){
     const context= useContext(ListCreationContext)
     if(!context){
        throw new Error("useListCreation must be used within a ListCreationProvider")
     }
     return context
}