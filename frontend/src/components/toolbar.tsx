import { DraggableNode } from '../draggableNode';
import { Button } from './ui/button';
import { useStore } from '../store';
import { FiRefreshCw } from 'react-icons/fi';

export const PipelineToolbar = () => {
    const resetPipeline = useStore((state) => state.resetPipeline);

    return (
        <div className="p-2.5">
            <div className="mt-5 flex flex-wrap gap-2.5 justify-between items-center">
                <div className="flex flex-wrap gap-2.5">
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
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetPipeline}
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-800 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:border-orange-500 dark:hover:text-orange-300"
                >
                    <FiRefreshCw className="w-4 h-4" />
                    Reset
                </Button>
            </div>
        </div>
    );
};
