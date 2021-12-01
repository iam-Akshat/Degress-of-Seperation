import { FormEvent, useState } from "react"

interface AddRelationBetweenPeopleProps {
    relationships: Array<string>,
    peopleList: Array<string | number>,
    onAddRelationshipPeople: (source: string | number, dest: string | number) => void
}

export const AddRelationBetweenPeople: React.FC<AddRelationBetweenPeopleProps> = ({ relationships, peopleList, onAddRelationshipPeople }) => {

    const [source, setSource] = useState<string | number>()
    const [dest, setDest] = useState<string | number>()
    const [error, setError] = useState("")

    // useEffect(()=>{
    //     setSource(peopleList[0])
    //     setDest(peopleList[1])
    // },[peopleList,setSource,setDest])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (source === dest) {
            setError("Cant choose same")
            return
        } else if (!source || !dest) {
            setError("Please choose both choices")
            return
        }
        setError("")
        setSource("")
        setDest("")
        onAddRelationshipPeople(source, dest)
    }

    return (
        <form onSubmit={handleSubmit} className="pure-form">
            <select onChange={(e) => setSource(e.target.value)} value={source}>
                <option value="" disabled selected key={101000}>Select your option</option>
                {peopleList.filter(person => person !== dest).map((person, idx) => <option value={person} key={idx}>{person}</option>)}
            </select>

            <select>{relationships.map(rel => <option value={rel}>{rel}</option>)}</select>

            <select onChange={(e) => setDest(e.target.value)} value={dest}>
                <option value="" disabled selected key={101010}>Select your option</option>

                {peopleList.filter(person => person !== source).map((person, idx) => <option value={person} key={idx}>{person}</option>)}
            </select>
            <button type="submit" className="pure-button pure-button-primary">Add Relationship</button>
            <br />
            <div className="error-text">{error}</div>
        </form >
    )
}