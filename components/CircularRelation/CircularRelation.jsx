'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { Switch } from '@root/components/ui/switch';
import { Label } from '@root/components/ui/label';
import { nodeTypes } from './Nodes';
import { edgeTypes } from './Edges';
import '@xyflow/react/dist/style.css';
import { getCharacterContext } from '@root/actions/character';
import { useCircular } from '@root/contexts/CircularContext';

const minDistance = 0.75;

export default function CircularRelation({ id }) {
  const ref = useRef(null);
  const [isRandomAngles, setIsRandomAngles] = useState(true);
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });
  const { date } = useCircular();
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [angles, setAngles] = useState([]);
  const [centerCoords, setCenterCoords] = useState({});
  const [character, setCharacter] = useState();
  const radius = 200;

  function toggleAngles() {
    setIsRandomAngles((prev) => !prev);
  }

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

  function generateEqualAngles(total) {
    const angles = [];
    const angle = 2 * Math.PI / total;
    for (let i = 0; i < total; i++) {
      angles.push(i * angle);
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

  function handleHoverEdge(_, edge) {
    setEdges((old) => old.map((e) => (
      edge.id === e.id ? { ...e, data: { ...e.data, isHovered: !e.data.isHovered } } : e
    )));
  }

  useEffect(() => {
    if (character?.relations?.length) {
      setAngles(
        isRandomAngles
          ? generateRandomAngles(character?.relations?.length, minDistance)
          : generateEqualAngles(character?.relations?.length)
      );
    }
  }, [character?.relations?.length, isRandomAngles]);

  useEffect(() => {
    if (nodes.length) {
      let index = 0;
      const ids = character?.relations?.map((relation) => relation.id) ?? [];
      setNodes(nodes.map((node) => {
        if (ids.includes(node.id)) {
          return {
            ...node,
            position: calculeCirclePosition(centerCoords, index++),
          };
        }
        return node;
      }));
    }
  }, [angles, nodes.length, centerCoords, character?.relations?.length])

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
    if (character?.id) {
      const center = { x: sizes.width / 2, y: sizes.height / 2 };
      setCenterCoords(center);
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
          id: character?.id,
          data: { character, type: 'source' },
          position: center,
          type: 'character',
          origin: [0.5, 0.5],
        },
        ...(
          character?.relations?.map((relation, index) => ({
            id: relation.id,
            data: { character: relation, type: 'target' },
            position: calculeCirclePosition(center, index),
            type: 'character',
            origin: [0.5, 0.5],
          })) ?? []
        ),
      ]);
    }
  }, [character, sizes]);

  useEffect(() => {
    if (nodes.length && character?.id) {
      setEdges(
        character?.relations?.map((relation) => ({
          id: `${character.id}_${relation.id}`,
          source: character.id,
          target: relation.id,
          data: { character: relation },
          type: 'relation',
        })),
      );
    }
  }, [nodes, character?.id]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const character = await getCharacterContext(id, date.timestamp);
      setCharacter(character);
    };
    if (date) {
      fetchCharacter();
    }
  }, [id, date]);

  return (
    <div className="w-full h-[60vh] relative">
      <div className="flex items-center mb-2">
        <Label htmlFor="equal-angles" className="me-2">Structure symétrique</Label>
        <Switch id="equal-angles" onCheckedChange={toggleAngles} className="cursor-pointer" />
      </div>
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
        onEdgeMouseEnter={handleHoverEdge}
        onEdgeMouseLeave={handleHoverEdge}
      >
      </ReactFlow>
    </div>
  );
}
