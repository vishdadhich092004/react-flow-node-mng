from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server default port
        "http://127.0.0.1:5173",  # Alternative localhost format
        "http://localhost:3000",  # Alternative dev server port
        "http://127.0.0.1:3000"   # Alternative dev server port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]
    # Allow additional properties that React Flow might include
    class Config:
        extra = "allow"

class Edge(BaseModel):
    source: str
    target: str
    id: str
    type: str
    # Allow additional properties that React Flow might include
    class Config:
        extra = "allow"

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class ParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a directed acyclic graph (DAG).
    Uses Kahn's algorithm for topological sorting.
    """
    # Create adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degree for all nodes
    for node in nodes:
        in_degree[node.id] = 0
    
    # Build graph and count in-degrees
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Find all nodes with no incoming edges
    queue = deque([node.id for node in nodes if in_degree[node.id] == 0])
    processed_count = 0
    
    # Process nodes
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    return processed_count == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=ParseResponse)
def parse_pipeline(pipeline: Pipeline):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
        
        return ParseResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag_result
        )
    except Exception as e:
        print(f"Error processing pipeline: {e}")
        raise e
