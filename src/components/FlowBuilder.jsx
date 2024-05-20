import React, { useEffect } from "react";
import ReactFlow from "reactflow";

const FlowBuilder = React.forwardRef((props, ref) => {
  const {
    dropRef,
    selectedNodeRef,
    nodes,
    setNodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setMsg,
    setIsSettingPanel,
    msg,
  } = props;

  // if user select a node and start edit the message then this useEffect will update the nodes state.
  useEffect(() => {
    if (selectedNodeRef.current) {
      setNodes((nds) => {
        return nds.map((nd) => {
          if (nd.id === selectedNodeRef.current.dataset.id) {
            return { ...nd, data: { label: msg } };
          }
          return nd;
        });
      });
    }
  }, [msg, selectedNodeRef, setNodes]);

  // when user select a node then just storing it's refrence in a selectedNodeRef.
  const handleNodeSelection = (event, node) => {
    if (selectedNodeRef && event.target) {
      selectedNodeRef.current = event.target;
    }

    setMsg(node?.data.label ?? "");
    setIsSettingPanel(true);
  };

  // updating the position of the node when user drags the node and updating the nodes state.
  const handleNodeDrag = (event, draggedNode) => {
    setNodes((nds) => {
      const updatedNodes = nds.map((nd) => {
        if (nd.id === draggedNode.id) {
          return {
            ...nd,
            position: draggedNode.position,
          };
        }
        return nd;
      });
      return updatedNodes;
    });
  };

  return (
    <div className="w-full h-full" ref={dropRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeSelection}
        onNodeDrag={handleNodeDrag}
      />
    </div>
  );
});

export default FlowBuilder;
