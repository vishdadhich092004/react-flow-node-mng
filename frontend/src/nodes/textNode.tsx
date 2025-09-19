// textNode.tsx

import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

interface TextNodeData {
  id: string;
  nodeType: string;
  text?: string;
}

interface TextNodeProps {
  id: string;
  data: TextNodeData;
}

export const TextNode = ({ id, data }: TextNodeProps) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrText(e.target.value);
  };

  return (
    <div className="w-50 h-20 border border-black">
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
