import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    // <div className="bg-white border-b-2 border-gray-300 shadow-lg">
      <div className="max-w-7xl bg-black  mx-auto px-6 py-6">
        
        <div className="flex flex-wrap gap-3 justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200 shadow-md">

          <DraggableNode type='customInput' label='Input' />
          <DraggableNode type='llm' label='LLM' />
          <DraggableNode type='customOutput' label='Output' />
          <DraggableNode type='text' label='Text' />
          
          <div className="w-px bg-gray-300"></div>
          <DraggableNode type='filter' label='Filter' />
          <DraggableNode type='join' label='Join' />
          <DraggableNode type='api' label='API' />
          <DraggableNode type='database' label='Database' />
          <DraggableNode type='loop' label='Loop' />
        </div>
      </div>
    // </div>
  );
};