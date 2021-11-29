import { Set } from "typescript";

interface AdjacencyList {
    [index: string | number]: Array<string | number>
}

class Graph {
    adjacencyList!: AdjacencyList;
    constructor() {
        this.adjacencyList = {}
    }

    addVertex(vertex: string | number) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    addEdge(source: string | number, destination: string | number) {
        if (!this.adjacencyList[source]) {
            this.addVertex(source);
        }
        if (!this.adjacencyList[destination]) {
            this.addVertex(destination);
        }
        this.adjacencyList[source].push(destination);
        this.adjacencyList[destination].push(source);
    }
    removeEdge(source: string | number, destination: string | number) {
        this.adjacencyList[source] = this.adjacencyList[source].filter(vertex => vertex !== destination);
        this.adjacencyList[destination] = this.adjacencyList[destination].filter(vertex => vertex !== source);
    }
    removeVertex(vertex: string | number) {
        while (this.adjacencyList[vertex]) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex!);
        }
        delete this.adjacencyList[vertex];
    }
}



const findAllPaths = (originNode: string | number, targetNode: string | number, nodeToNodes: AdjacencyList) => {
    return findAllPathsHelper(targetNode, [originNode], new Set([originNode]), nodeToNodes, [])
}
const findAllPathsHelper = (
    targetNode: string | number,
    currentPath: Array<string | number>,
    usedNodes: Set<string | number>,
    nodeToNodes: AdjacencyList,
    answerPaths: Array<Array<string | number>>
    ) => {
    let lastNode = currentPath[currentPath.length - 1]
    if (lastNode == targetNode) {
        answerPaths.push([...currentPath])
    } else {
        nodeToNodes[lastNode].forEach(neighbor => {
            if (!usedNodes.has(neighbor)) {
                currentPath.push(neighbor)
                usedNodes.add(neighbor)
                findAllPathsHelper(targetNode, currentPath, usedNodes, nodeToNodes, answerPaths)
                usedNodes.delete(neighbor)
                currentPath.pop()
            }

        })
    }
    return answerPaths
}


export { Graph, findAllPaths }