import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
    type Node,
    type Edge,
    type Connection,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect,
  } from '@xyflow/react';

export type PipelineStore = {
  nodes: Node[];
  edges: Edge[];
  nodeIDs: Record<string, number>;
  getNodeID: (type: string) => string;
  addNode: (node: Node) => void;
  deleteNode: (nodeId: string) => void;
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: OnConnect;
  updateNodeField: (nodeId: string, fieldName: string, fieldValue: unknown) => void;
};

export const useStore = create<PipelineStore>((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type: string) => {
        const newIDs = { ...get().nodeIDs };
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node: Node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    deleteNode: (nodeId: string) => {
        set({
            nodes: get().nodes.filter(node => node.id !== nodeId),
            edges: get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge({
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        }, get().edges),
      });
    },
    updateNodeField: (nodeId: string, fieldName: string, fieldValue: unknown) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue } as Node['data'];
          }
          return node;
        }),
      });
    },
  }));
