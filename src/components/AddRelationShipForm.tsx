import { FormEvent, useState } from "react"

interface AddRelationShipFormProps {
        onAddRelationship: (relationship: string) => void
}

export const AddRelationShipForm: React.FC<AddRelationShipFormProps> = ({ onAddRelationship }) => {
        const [name, setName] = useState("")
        const [error, setError] = useState("")
        const handleSubmit = (e: FormEvent) => {
                e.preventDefault()
                if (!name) {
                        setError("Name required")
                        return
                }
                if (name.toLocaleLowerCase() !== 'friends') {
                        setError("Only supports 'friends'")
                        return
                }
                setError("")
                setName("")
                onAddRelationship(name)
        }
        return (
                <form onSubmit={handleSubmit}>
                        <label htmlFor="relationship_name_input">Enter a relationship to add</label>
                        <br />
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} id="relationship_name_input" />
                        <button type="submit">Add</button>
                        <br />
                        {error}
                </form>
        );
}