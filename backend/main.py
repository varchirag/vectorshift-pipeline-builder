from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response Models ────────────────────────
class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# ── DAG Check (Kahn's topological sort) ─────────────
def check_is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    node_ids = {node.id for node in nodes}

    # Build adjacency list and in-degree map (only for known node ids)
    adj = {nid: [] for nid in node_ids}
    in_degree = {nid: 0 for nid in node_ids}

    for edge in edges:
        if edge.source in adj and edge.target in node_ids:
            adj[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    # Start with all nodes that have no incoming edges
    queue = [nid for nid, deg in in_degree.items() if deg == 0]
    visited = 0

    while queue:
        nid = queue.pop(0)
        visited += 1
        for neighbour in adj[nid]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                queue.append(neighbour)

    return visited == len(nodes)


# ── Endpoints ────────────────────────────────────────
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag    = check_is_dag(pipeline.nodes, pipeline.edges)
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
