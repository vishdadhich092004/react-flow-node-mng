import type { Edge, Node } from "@xyflow/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
if(!BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not set');
}

export const parsePipeline = async (pipeline: { nodes: Node[], edges: Edge[] }) => {
    const response = await fetch(`${BASE_URL}/pipelines/parse`, {
        method: 'POST',
        body: JSON.stringify(pipeline),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to parse pipeline');
    }
    const data = await response.json();
    return data;
}
