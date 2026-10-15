import type { Diagram } from '../projects';

const NODE_W = 150;
const NODE_H = 54;
const COL_GAP = 46;
const ROW_GAP = 22;
const PAD = 6;

function position(col: number, row: number) {
  return { x: PAD + col * (NODE_W + COL_GAP), y: PAD + row * (NODE_H + ROW_GAP) };
}

/** A left-to-right block diagram laid out from column/row positions in the project data. */
export function ArchDiagram({ diagram, color, label }: { diagram: Diagram; color: string; label: string }) {
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  const cols = Math.max(...diagram.nodes.map((node) => node.col)) + 1;
  const rows = Math.max(...diagram.nodes.map((node) => node.row)) + 1;
  const width = PAD * 2 + cols * NODE_W + (cols - 1) * COL_GAP;
  const height = PAD * 2 + rows * NODE_H + (rows - 1) * ROW_GAP;

  return (
    <div className="diagram-scroll">
      <svg
        className="diagram"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={label}
        style={{ ['--accent' as string]: color }}
      >
        <g className="diagram-edges">
          {diagram.edges.map(([fromId, toId]) => {
            const from = byId.get(fromId);
            const to = byId.get(toId);
            if (!from || !to) return null;
            const a = position(from.col, from.row);
            const b = position(to.col, to.row);
            let d: string;
            if (from.col === to.col) {
              // Same column: a vertical link between the boxes.
              const x = a.x + NODE_W / 2;
              const [y1, y2] = from.row < to.row ? [a.y + NODE_H, b.y] : [a.y, b.y + NODE_H];
              d = `M ${x} ${y1} L ${x} ${y2}`;
            } else {
              const [left, right] = from.col < to.col ? [a, b] : [b, a];
              const x1 = left.x + NODE_W;
              const y1 = left.y + NODE_H / 2;
              const x2 = right.x;
              const y2 = right.y + NODE_H / 2;
              const mid = (x1 + x2) / 2;
              d = `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
            }
            return <path key={`${fromId}-${toId}`} d={d} pathLength={1} data-edge />;
          })}
        </g>
        {diagram.nodes.map((node) => {
          const { x, y } = position(node.col, node.row);
          return (
            <g key={node.id} className={`diagram-node${node.accent ? ' is-accent' : ''}`} data-node>
              <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={11} />
              <text x={x + 14} y={node.detail ? y + 23 : y + NODE_H / 2 + 5} className="diagram-label">
                {node.label}
              </text>
              {node.detail && (
                <text x={x + 14} y={y + 40} className="diagram-detail">
                  {node.detail}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
