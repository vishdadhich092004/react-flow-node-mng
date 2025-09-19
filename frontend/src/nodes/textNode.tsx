// textNode.tsx

import { useState } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { BaseNode, type BaseNodeData, type HandleConfig, type NodeContentConfig } from './baseNode';
import { FiType } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextNodeData extends BaseNodeData {
  text?: string;
}

interface TextNodeProps extends NodeProps {
  data: TextNodeData;
}

export const TextNode = ({ id, data }: TextNodeProps) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrText(e.target.value);
  };

  // Configure handles
  const handles: HandleConfig[] = [
    {
      id: `${id}-output`,
      type: 'source',
      position: Position.Right,
    }
  ];

  // Configure content
  const content: NodeContentConfig = {
    title: 'Text',
    icon: FiType,
    iconColor: 'bg-blue-100',
    description: 'Text processing and manipulation',
    children: (
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="text-content" className="text-xs">
            Text Content
          </Label>
          <Input
            id="text-content"
            type="text"
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text or use {{input}} for variables"
            className="h-8 text-xs"
          />
        </div>
        <div className="text-xs text-muted-foreground">
          Use <code className="bg-muted px-1 rounded text-xs">{'{{input}}'}</code> for dynamic values
        </div>
      </div>
    )
  };

  return (
    <BaseNode
      id={id}
      data={data}
      handles={handles}
      content={content}
    />
  );
}
