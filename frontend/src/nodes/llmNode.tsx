// llmNode.tsx

import { Handle, Position } from '@xyflow/react';

interface LLMNodeData {
  id: string;
  nodeType: string;
}

export const LLMNode = ({ id }: { id: string; data: LLMNodeData }) => {

  return (
    <div className="w-50 h-20 border border-black">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        className="top-1/3"
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        className="top-2/3"
      />
      <div>
        <span>LLM</span>
      </div>
      <div>
        <span>This is a LLM.</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </div>
  );
}
