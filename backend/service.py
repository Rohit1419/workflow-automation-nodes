from collections import defaultdict, deque
from typing import List
from schemas import NodeData, EdgeData


def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm for topological sort.

    Args:
        nodes: List of nodes in the pipeline
        edges: List of edges in the pipeline

    Returns:
        bool: True if DAG, False if contains cycles
    """
    if not nodes or not edges:
        return True

    # Create adjacency list
    graph = defaultdict(list)
    in_degree = defaultdict(int)

    # Initialize in_degree for all nodes
    node_ids = {node.id for node in nodes}
    for node_id in node_ids:
        in_degree[node_id] = 0

    # Build graph from edges
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    # Kahn's algorithm for topological sort
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    sorted_count = 0

    while queue:
        node = queue.popleft()
        sorted_count += 1

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If all nodes were sorted, it's a DAG
    return sorted_count == len(node_ids)


def parse_pipeline(pipeline_data: dict) -> dict:
    """
    Parse and validate pipeline data.

    Args:
        pipeline_data: Dictionary containing nodes and edges

    Returns:
        dict: Pipeline analysis results
    """
    try:
        num_nodes = len(pipeline_data.get("nodes", []))
        num_edges = len(pipeline_data.get("edges", []))

        nodes = [NodeData(**node) for node in pipeline_data.get("nodes", [])]
        edges = [EdgeData(**edge) for edge in pipeline_data.get("edges", [])]

        dag_valid = is_dag(nodes, edges)

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": dag_valid,
            "error": None,
        }
    except Exception as e:
        return {"num_nodes": 0, "num_edges": 0, "is_dag": False, "error": str(e)}
