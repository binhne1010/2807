import { Check, Lock } from "@phosphor-icons/react";
import type { JourneyStage } from "../../data/journey";
import { MemoryImage } from "../memories/MemoryImage";

type NodeStatus = "locked" | "available" | "active" | "completed";

type MapNodeProps = {
  stage: JourneyStage;
  status: NodeStatus;
  isSelected: boolean;
  position?: { x: number; y: number };
  onSelect: (stage: number) => boolean;
};

const statusLabel: Record<NodeStatus, string> = {
  locked: "Chưa mở",
  available: "Sẵn sàng để đi",
  active: "Đang ở đây",
  completed: "Đã đi qua",
};

export function MapNode({ stage, status, isSelected, onSelect, position = stage.position }: MapNodeProps) {
  const isOpenable = status === "available" || status === "completed";

  return (
    <button
      type="button"
      className={`map-node is-${status}${isSelected ? " is-selected" : ""}`}
      data-stage={stage.order}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      disabled={!isOpenable}
      onClick={() => onSelect(stage.order)}
      aria-label={`Chặng ${stage.order}: ${stage.title}. ${statusLabel[status]}.`}
    >
      {/* Each stage is represented by its own photograph rather than a plain dot. */}
      <span className="node-photo" aria-hidden="true">
        <MemoryImage stage={stage.order} photo={1} alt="" sizes="(max-width: 767px) 84px, 132px" />
        <span className="node-photo-veil" />
        {/* Status is carried by an icon as well as by colour (spec §25). */}
        <span className="node-badge">
          {status === "locked" ? (
            <Lock size={13} weight="fill" />
          ) : status === "completed" ? (
            <Check size={14} weight="bold" />
          ) : (
            stage.order
          )}
        </span>
      </span>
      <span className="node-copy">
        <strong>{stage.title}</strong>
        <small>{status === "locked" ? "Chưa mở" : stage.subtitle}</small>
      </span>
    </button>
  );
}
