from pydantic import BaseModel
from typing import List, Dict, Any, Optional


class NodeData(BaseModel):
    id: str
    type: str
    position: Optional[Dict[str, Any]] = None
    data: Optional[Dict[str, Any]] = None


class EdgeData(BaseModel):
    source: str
    target: str
    id: Optional[str] = None


class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    error: Optional[str] = None
