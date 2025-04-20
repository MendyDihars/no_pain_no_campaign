'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { Switch } from '@root/components/ui/switch';
import { Label } from '@root/components/ui/label';
import colors from '@root/lib/colors';
import { nodeTypes } from './Nodes';
import { edgeTypes } from './Edges';
import '@xyflow/react/dist/style.css';
import { getCharacterContext } from '@root/actions/character';
import { useStoredDate } from '@root/contexts/StoredDateContext';
import { useTranslations } from 'next-intl';

const minDistance = 0.35;
const charactersRadius = 175;
const groupsRadius = 300;

export default function CharacterLink({ id }) {
  const ref = useRef(null);
  const [isRandomAngles, setIsRandomAngles] = useState(true);
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });
  const { date } = useStoredDate();
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [angles, setAngles] = useState([]);
  const [groupsAngles, setGroupsAngles] = useState([]);
  const [centerCoords, setCenterCoords] = useState({});
  const [character, setCharacter] = useState();
  const [groups, setGroups] = useState([]);
  const t = useTranslations();

  function toggleAngles() {
    setIsRandomAngles((prev) => !prev);
  }

  function generateRandomAngles(total, minAngleGap) {
    const _angles = [];
  
    let tries = 0;
    const maxTries = 10000;
  
    while (_angles.length < total && tries < maxTries) {
      const randomAngle = Math.random() * 2 * Math.PI;
      const isFarEnough = _angles.every(a => Math.abs(a - randomAngle) > minAngleGap);
  
      if (isFarEnough) {
        _angles.push(randomAngle);
      }
  
      tries++;
    }
  
    return _angles;
  }

  function generateEqualAngles(total) {
    const _angles = [];
    const angle = 2 * Math.PI / total;
    for (let i = 0; i < total; i++) {
      _angles.push(i * angle);
    }
    return _angles;
  }

  function calculeCirclePosition(center, index, radius, _angles) {
    const angle = _angles[index];
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
    if (groups?.length) {
      setGroupsAngles(
        isRandomAngles
          ? generateRandomAngles(groups?.length, minDistance)
          : generateEqualAngles(groups?.length)
      );
    }
  }, [groups?.length, isRandomAngles]);

  useEffect(() => {
    if (nodes.length) {
      let index = 0;
      let indexGroups = 0;
      const ids = character?.relations?.map((relation) => relation.id) ?? [];
      const groupsIds = groups?.map((group) => group.id) ?? [];
      setNodes(nodes.map((node) => {
        if (ids.includes(node.id) && angles.length) {
          return {
            ...node,
            position: calculeCirclePosition(centerCoords, index++, charactersRadius, angles),
          };
        } else if (groupsIds.includes(node.id) && groupsAngles.length) {
          return {
            ...node,
            position: calculeCirclePosition(centerCoords, indexGroups++, groupsRadius, groupsAngles),
          };
        }
        return node;
      }));
    }
  }, [angles, groupsAngles, nodes.length, centerCoords, character?.relations?.length, groups])

  useEffect(() => {
    const handleResize = () => {
      setSizes({
        width: Math.round(ref.current.clientWidth),
        height: Math.round(ref.current.clientHeight * 0.9),
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
          id: 'background-circle-relations',
          type: 'circle',
          position: center,
          data: { radius: charactersRadius, color: colors.primary, strokeWidth: 4 },
          style: { zIndex: -1 },
          origin: [0.5, 0.5],
        },
        {
          id: 'background-circle-groups',
          type: 'circle',
          position: center,
          data: { radius: groupsRadius, color: colors.secondary, strokeWidth: 2 },
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
            position: calculeCirclePosition(center, index, charactersRadius, angles),
            type: 'character',
            origin: [0.5, 0.5],
          })) ?? []
        ),
        ...(
          groups?.map((group, index) => ({
            id: group.id,
            data: { group },
            type: 'characterGroup',
            position: calculeCirclePosition(center, index, groupsRadius, groupsAngles),
            origin: [0.5, 0.5],
          })) ?? []
        ),
      ]);
    }
  }, [character, sizes, angles, groupsAngles]);

  useEffect(() => {
    if (nodes.length && character?.id) {
      setEdges([
        ...(
          character?.relations?.map((relation) => ([
            {
              id: `${character.id}_${relation.id}`,
              source: character.id,
              target: relation.id,
              data: { character: relation },
              type: 'relation',
            },
            ...relation.groups.map((group) => ({
              id: `${relation.id}_${group.id}`,
              source: relation.id,
              target: group.id,
              data: { group },
              type: 'groupRelation',
            })),
          ])).flat() ?? []
        ),
        ...character?.groups?.map((group) => ({
          id: `${character.id}_${group.id}`,
          source: character.id,
          target: group.id,
          data: { group },
          type: 'groupRelation',
        })),
      ]);
    }
  }, [nodes, character?.id]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const character = await getCharacterContext(id, date.timestamp);
      if (character) {
        setCharacter(character);
        const allGroups = [
          ...character.relations?.map((relation) => relation.groups).flat(),
          ...character.groups,
        ];
        setGroups(
          Array.from(
            allGroups?.reduce((acc, group) => {
              if (!acc.has(group.id)) {
                acc.set(group.id, group);
              }
              return acc;
            }, new Map())?.values() ?? []
          )
        );
      }
    };
    if (date) {
      fetchCharacter();
    }
  }, [id, date]);

  return (
    <div className="w-full h-[60vh] relative">
      <div className="flex items-center mb-2">
        <Label htmlFor="equal-angles" className="me-2">
          {t("CharacterLink.symmetricalStructure")}
        </Label>
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
        // panOnDrag={false}
        onEdgeMouseEnter={handleHoverEdge}
        onEdgeMouseLeave={handleHoverEdge}
      >
      </ReactFlow>
    </div>
  );
}
