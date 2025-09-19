import { Button } from "@/components/ui/button"
import { parsePipeline } from "@/apiClients"
import { useStore } from "@/store"
import { useState } from "react";
import { toast } from "sonner";
import type { Edge, Node } from "@xyflow/react";

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const getPipeline = (): { nodes: Node[], edges: Edge[] } => {
        const nodes = useStore.getState().nodes;
        const edges = useStore.getState().edges;
        return { nodes, edges };
    }
    const handleSubmit = async () => {
        setIsLoading(true);
        
        try {
            const pipeline = getPipeline();
            const data = await parsePipeline(pipeline);
            
            if (data.is_dag) {
                toast.success("Pipeline Analysis Complete!", {
                    description: `Valid DAG detected with ${data.num_nodes} nodes and ${data.num_edges} edges`,
                    duration: 5000,
                });
            } else {
                toast.error("Pipeline Analysis Failed", {
                    description: `Cycle detected! The pipeline has ${data.num_nodes} nodes and ${data.num_edges} edges but is not a valid DAG`,
                    duration: 6000,
                });
            }
            
        } catch (error) {
            console.error("Pipeline analysis error:", error);
            toast.error("Analysis Failed", {
                description: "Failed to analyze the pipeline. Please check your connection and try again.",
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    }

        return (
        <div className="flex items-center justify-center">
            <Button type="submit"  className="bg-blue-500 text-white" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
            </Button>
        </div>
    );
}
