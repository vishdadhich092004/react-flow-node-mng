import { DraggableNode } from '../draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="p-2.5">
            <div className="mt-5 flex flex-wrap gap-2.5">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='data' label='Data' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='aggregate' label='Aggregate' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='api' label='API' />
            </div>
        </div>
    );
};
