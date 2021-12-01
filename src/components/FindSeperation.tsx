import { FormEvent, useState } from "react"

interface FindSeperationProps {
    onFindRelationShip: (source: string | number, dest: string | number) => void
    peopleList: Array<string | number>
}

export const FindSeperation: React.FC<FindSeperationProps> = ({ peopleList,onFindRelationShip }) => {
    const [source, setSource] = useState<string | number>()
    const [dest, setDest] = useState<string | number>()
    const [error,setError] = useState("")

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault()
        if(source === dest){
            setError("Cant choose same")
            return
        }else if (!source || ! dest){
            setError("Please choose both choices")
            return
        }
        setError("")
        onFindRelationShip(source,dest)
    }

    return (
        <form onSubmit={handleSubmit}>
            <select onChange={(e) => setSource(e.target.value)} value={source}>
            <option value="" disabled selected key={101000}>Select your option</option>
                {peopleList.filter(person => person !== dest).map((person, idx) => <option value={person} key={idx}>{person}</option>)}
            </select>
            <select onChange={(e) => setDest(e.target.value)} value={dest}>
            <option value="" disabled selected key={101010}>Select your option</option>
                {peopleList.filter(person => person !== source).map((person, idx) => <option value={person} key={idx}>{person}</option>)}
            </select>
            <button type="submit">Find Relationship</button>
            {error}
        </form >
    )
}