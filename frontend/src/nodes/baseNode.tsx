import React, { type ReactNode } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type IconType } from 'react-icons';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Base configuration for handles (connection points)
export interface HandleConfig {
  id: string;
  type: 'source' | 'target';
  position: Position;
  className?: string;
  style?: React.CSSProperties;
}

// Base configuration for node content
export interface NodeContentConfig {
  title: string;
  description?: string;
  icon?: IconType;
  iconColor?: string;
  children?: ReactNode;
  className?: string;
}

// Base node data interface
export interface BaseNodeData {
  id: string;
  nodeType: string;
  [key: string]: unknown; // Allow additional properties for specific node types
}

// Props for the BaseNode component
export interface BaseNodeProps extends Partial<NodeProps> {
  id: string;
  data: BaseNodeData;
  handles?: HandleConfig[];
  content?: NodeContentConfig;
  className?: string;
  style?: React.CSSProperties;
  onDataChange?: (newData: Partial<BaseNodeData>) => void;
}

export const BaseNode: React.FC<BaseNodeProps> = ({
  handles = [],
  content,
  className = "",
  style = {},
}) => {
  return (
    <Card className={`w-64 min-h-24 hover:shadow-lg transition-all duration-200 hover:border-primary/50 ${className}`} style={style}>
      {/* Render handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={`w-3 h-3 border-2 border-background shadow-md ${handle.className || ''}`}
          style={{
            backgroundColor: handle.type === 'source' ? '#3b82f6' : '#10b981',
            ...handle.style
          }}
        />
      ))}

      {/* Render content */}
      {content && (
        <>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              {content.icon && (
                <div className={`p-1.5 rounded-lg ${content.iconColor || 'bg-primary/10'}`}>
                  <content.icon className={`w-4 h-4 ${content.iconColor ? 'text-white' : 'text-primary'}`} />
                </div>
              )}
              <CardTitle className="text-sm">{content.title}</CardTitle>
            </div>
            {content.description && (
              <CardDescription className="text-xs">
                {content.description}
              </CardDescription>
            )}
          </CardHeader>
          
          {/* Custom content */}
          {content.children && (
            <CardContent className="pt-0">
              {content.children}
            </CardContent>
          )}
        </>
      )}
    </Card>
  );
};

export default BaseNode;
