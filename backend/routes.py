from fastapi import APIRouter, HTTPException
from schema import PipelineData, PipelineResponse
from service import parse_pipeline

router = APIRouter()


@router.get("/health")
def health_check():
    """Health check endpoint"""
    return {"Ping": "Pong"}


@router.post("/pipelines/parse", response_model=PipelineResponse)
async def parse_pipeline_endpoint(pipeline: PipelineData):
    """
    Parse and validate a pipeline.

    Args:
        pipeline: Pipeline data containing nodes and edges

    Returns:
        PipelineResponse: Analysis results with node count, edge count, and DAG validity
    """
    try:
        pipeline_dict = pipeline.dict()
        result = parse_pipeline(pipeline_dict)

        if result.get("error"):
            raise HTTPException(status_code=400, detail=result["error"])

        return PipelineResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
