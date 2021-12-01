import { useMemo, useState } from 'react';
import './App.css';
import { AddPersonForm } from './components/AddPersonForm';
import { AddRelationBetweenPeople } from './components/AddRelationBetweenPeople';
import { AddRelationShipForm } from './components/AddRelationShipForm';
import { FindSeperation } from './components/FindSeperation';
import { findAllPaths, Graph } from './utils/Graph';

function App() {
  const [graph, setGraph] = useState(() => new Graph())
  const [relationships,setRelationsships] = useState<Array<string>>([])
  const [paths,setPaths] = useState<Array<Array<string|number>>>([])

  const handleAddPerson = (node:string) => {
    graph.addVertex(node)
    setGraph((oldgraph) => oldgraph.clone())
  }
  const handleAddRelationship = (relationship: string) =>{
    setRelationsships([...relationships,relationship])
  }
  const handleAddRelationshipPeople = (source: string | number, dest: string | number) =>{
    graph.addEdge(source,dest)
    setGraph((oldgraph) => oldgraph.clone())
  }
  const handleFindRelationShip =  (source: string | number, dest: string | number) =>{
    setPaths(findAllPaths(source,dest,graph.adjacencyList))
  }
  const peopleList = useMemo(()=>{
    return Object.keys(graph.adjacencyList)
  },[graph])
  return (
    <div className="App">
    <AddRelationShipForm onAddRelationship={handleAddRelationship}/>
    <br />
    <AddPersonForm onAddPerson={handleAddPerson} />
    <br />
    <AddRelationBetweenPeople relationships={relationships} peopleList={peopleList} onAddRelationshipPeople={handleAddRelationshipPeople}/>
     <br />
     <FindSeperation peopleList={peopleList} onFindRelationShip={handleFindRelationShip}/>

     <br />
     <h3>Degrees</h3>
     {paths.map(path =>  <div>{path.join('->')}</div>)}
    </div>
  );
}

export default App;
