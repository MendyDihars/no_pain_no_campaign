'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getFullname, getInitials } from '@root/lib/decorators/character.helper';
import { ReactFlow, BaseEdge, getStraightPath, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';  

function CustomEdge({ id, sourceX, sourceY, targetX, targetY, data: { character } }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{ stroke: character.relation_color, strokeWidth: 2 }}
      label={character.relation_type_name}
    />
  );
}

function BackgroundCircleNode({ data: { radius } }) {
  return (
    <svg
      width={radius * 2}
      height={radius * 2}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

function CharacterNode({ data: { character, type } }) {
  return (
    <Link href={`/characters/${character.id}`} className="relative">
      <div className="absolute top-[-20px] left-[-20px] text-white text-xs w-[100px]">
        <div className="text-center">
          {getFullname(character)}
        </div>
      </div>
      <div className="w-15 h-15 hover:scale-110 transition-all duration-300 bg-white rounded-full nodrag text-black flex items-center justify-center text-2xl font-bold relative">
        {getInitials(character)}
        <Handle type={type} position="top" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'transparent', border: 'none' }} />
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
  const [edges, setEdges] = useState([]);
  const [angles, setAngles] = useState([]);
  const radius = 200;

  function generateRandomAngles(total, minAngleGap) {
    const angles = [];
  
    let tries = 0;
    const maxTries = 10000;
  
    while (angles.length < total && tries < maxTries) {
      const randomAngle = Math.random() * 2 * Math.PI;
      const isFarEnough = angles.every(a => Math.abs(a - randomAngle) > minAngleGap);
  
      if (isFarEnough) {
        angles.push(randomAngle);
      }
  
      tries++;
    }
  
    return angles;
  }

  function calculeCirclePosition(center, index) {
    const angle = angles[index];
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  }

  useEffect(() => {
    if (character.relations.length) {
      setAngles(generateRandomAngles(character.relations.length, 0.5));
    }
  }, [character.relations.length]);

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
      {
        id: 'background-circle-1',
        type: 'circle',
        position: center,
        data: { radius },
        style: { zIndex: -1 },
        origin: [0.5, 0.5],
      },
      {
        id: character.id,
        data: { character, type: 'source' },
        position: center,
        type: 'character',
        origin: [0.5, 0.5],
      },
      ...character.relations.map((relation, index) => ({
        id: relation.id,
        data: { character: relation, type: 'target' },
        position: calculeCirclePosition(center, index),
        type: 'character',
        origin: [0.5, 0.5],
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
          data: { character: relation },
          type: 'custom',
        })),
      );
    }
  }, [nodes]);

  return (
    <div className="w-full h-[80vh] relative">
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
      >
      </ReactFlow>
    </div>
  );
}
