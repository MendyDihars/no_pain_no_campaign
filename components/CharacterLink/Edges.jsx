import Tooltip from '@root/components/ui/Tooltip';
import {
  BaseEdge,
  getStraightPath,
  EdgeLabelRenderer,
} from '@xyflow/react';

export function RelationEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data: { character, isHovered },
}) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: character.relation_color, strokeWidth: 2 }}
        label={character.relation_name}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
            transformOrigin: 'center',
          }}
          className="absolute"
        >
          <Tooltip
            rootProps={{
              open: isHovered,
            }}
            content={character.relation_name}
          >
            <span className="bg-background text-xl rounded-full p-1">
              {character?.relation_icon}
            </span>
          </Tooltip>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export function GroupEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) {
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
      style={{ stroke: 'gray', strokeWidth: 2 }}
    />
  );
}

export const edgeTypes = {
  relation: RelationEdge,
  groupRelation: GroupEdge,
}