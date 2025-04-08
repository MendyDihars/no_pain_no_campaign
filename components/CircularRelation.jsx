'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getFullname, getInitials } from '@root/lib/decorators/character.helper';
import { ReactFlow, Controls, Background, BaseEdge, getStraightPath, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';  

function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <BaseEdge id={id} path={edgePath} />
  );
}

function BackgroundCircleNode() {
  return (
    <div className="border-1 border-white rounded-full w-[200px] h-[200px]" />
  );
}

function CharacterNode({ data: { character, type } }) {
  return (
    <Link href={`/characters/${character.id}`} className="relative">
      <div className="absolute top-[-20px] left-[-20px] text-white text-xs w-[100px]">
        <div className="text-center">
          {getFullname(character)}
        </div>
        <Handle type={type} />
      </div>
      <div className="w-15 h-15 hover:scale-110 transition-all duration-300 bg-white rounded-full nodrag text-black flex items-center justify-center text-2xl font-bold">
        {getInitials(character)}
      </div>
    </Link>
  );
}

const edgeTypes = {
  custom: CustomEdge,
}

const nodeTypes = {
  character: CharacterNode,
  circle: BackgroundCircleNode,
}

export default function CircularRelation({ character }) {
  const ref = useRef(null);
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });
  const [nodes, setNodes] = useState([]);
  console.log('nodes', nodes)
  const [edges, setEdges] = useState([]);
  console.log('edges', edges)

  function calculeCirclePosition(center, index, total) {
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: center.x + Math.cos(angle) * 200,
      y: center.y + Math.sin(angle) * 200,
    };
  }

  useEffect(() => {
    const handleResize = () => {
      setSizes({
        width: Math.round(document.body.clientWidth),
        height: Math.round(document.body.clientHeight * 0.9),
      }); 
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    // Remove background from free react flow panel
    ref.current.querySelector('.react-flow__panel').style.background = 'none';
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const center = { x: sizes.width / 2, y: sizes.height / 2 };
    setNodes([
      // {
      //   id: 'circle',
      //   position: center,
      //   type: 'circle',
      // },
      {
        id: character.id,
        data: { character, type: 'source' },
        position: center,
        type: 'character',
      },
      ...character.relations.map((relation, index) => ({
        id: relation.id,
        data: { character: relation, type: 'target' },
        position: calculeCirclePosition(center, index, character.relations.length),
        type: 'character',
      })),
    ]);
  }, [character, sizes]);

  useEffect(() => {
    if (nodes.length) {
      setEdges(
        character.relations.map((relation) => ({
          id: `${character.id}_${relation.id}`,
          source: character.id,
          target: relation.id,
          // type: 'custom',
        })),
      );
    }
  }, [nodes]);
  return (
    <div className="w-full h-[80vh]">
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
        // onNodesChange={console.log}
        // onConnect={onConnect}
        // onEdgesChange={onEdgesChange}
        // onEdgesDelete={onEdgesDelete}
      >
        {/* <Background /> */}
      </ReactFlow>
    </div>
  );
}
