import { FormEvent, useState } from "react"

interface AddPersonFormProps {
onAddPerson: (node: string ) => void
}

export const AddPersonForm: React.FC<AddPersonFormProps> = ({onAddPerson}) => {
        const [name,setName] = useState("")
        const [error,setError] = useState("")
        const handleSubmit = (e:FormEvent) =>{
                e.preventDefault()
                if(!name){
                        setError("Name required")
                        return
                }
                setError("")
                setName("")
                onAddPerson(name)  
        } 
        return(
        <form onSubmit={handleSubmit} className="pure-form">
                <label htmlFor="person_name_input">Enter person name to be added</label>
                <br />
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} id="person_name_input"/>
                <button type="submit" className="pure-button pure-button-primary">Add</button>
                <br />
                <div className="error-text">{error}</div>
        </form>
        )
}