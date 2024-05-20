import React, { useCallback, useState, useRef, useEffect } from "react";
import "./App.css";
import RightPanel from "./components/RightPanel";
import { useDrop } from "react-dnd";
import { addEdge, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import FlowBuilder from "./components/FlowBuilder";
import { toast } from "react-toastify";

const style = {
  width: 200,
  height: 40,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const initialNodes = [
  {
    id: "text message 1",
    position: { x: 100, y: 100 },
    data: { label: "text message 1" },
    style,
  },
];
const initialEdges = [];

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); // it will store all the nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // it will store all the edges
  const [isSettingPanel, setIsSettingPanel] = useState(false); // using for settings panel visibility
  const [msg, setMsg] = useState("");

  const selectedNodeRef = useRef(null);

  // AI am saving the flow in localstorage. So here just fetching the previous stored flow and setting it to the nodes and edges state.
  useEffect(() => {
    const savedNodes = JSON.parse(localStorage.getItem("nodes"));
    const savedEdges = JSON.parse(localStorage.getItem("edges"));
    if (savedNodes?.length > 0) {
      setNodes(savedNodes);
    }
    if (savedEdges?.length > 0) {
      setEdges(savedEdges);
    }
  }, [setNodes, setEdges]);

  // Using to drop the node in the flow. It will give us a ref that I am using with the container of the flow.
  // So, if the node is dropped in the container then that node will get added to the flow.
  const [{ isOver }, drop] = useDrop({
    accept: "textNode",
    drop: (item) => addMessageNode(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // using it to add the message node into the flow and updating the nodes state also.
  const addMessageNode = (item) => {
    const id = `${item.id}`;
    if (nodes.find((nd) => nd.id === id)) {
      return;
    }
    setNodes((nds) => {
      const updatedNodes = [
        ...nds,
        {
          id: id,
          position: {
            x: Math.floor(Math.random() * 200),
            y: Math.floor(Math.random() * 200),
          },
          data: { label: msg },
          style,
        },
      ];
      return updatedNodes;
    });
    setMsg(""); // after adding a node removing the previous stored message.
  };

  // it will get called when connecting an edge
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        console.log(params, eds);
        // stopping multiple edges creation from a single source node
        if (eds.find((edg) => edg.source === params.source)) {
          toast("Cannot originate multiple edges from a single node.", {
            type: "error",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        // it will connect the edges and then I am storing the returned value into the edges state.
        const connectEdge = addEdge(params, eds);
        return connectEdge;
      });
    },
    [setEdges]
  );

  // handling save flow
  const handleSaveChanges = () => {
    const sourceNodes = new Set();
    edges.forEach((nd) => {
      sourceNodes.add(nd.source);
    });

    // showing error when more than one Node has empty target handles
    if (nodes?.length > sourceNodes.size + 1) {
      toast("Cannot save flow", {
        type: "error",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // saving the valid flow
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));

    selectedNodeRef.current = null;
    setIsSettingPanel(false);

    toast("Flow saved", {
      type: "success",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="w-screen h-screen">
      <header className="relative w-full h-14 flex justify-center items-center bg-gray-100">
        <button
          className="absolute right-[15%] w-40 h-9 border border-blue-600 text-blue-600 rounded translate-x-[50%]"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </header>
      <div className="flex h-full">
        <div className="w-[70%]">
          <FlowBuilder
            dropRef={drop}
            selectedNodeRef={selectedNodeRef}
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            setMsg={setMsg}
            setIsSettingPanel={setIsSettingPanel}
            msg={msg}
          />
        </div>
        <RightPanel
          id={msg}
          msg={msg}
          setMsg={setMsg}
          isSettingPanel={isSettingPanel}
          setIsSettingPanel={setIsSettingPanel}
        />
      </div>
    </div>
  );
};

export default App;
