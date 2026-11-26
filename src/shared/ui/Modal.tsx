import { useEffect, type ReactNode } from "react";
import { Button } from "./Button";

export interface ModalProps {
  id: string;
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ id, title, open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id={id}
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <h2 id={`${id}-title`}>{title}</h2>
          <Button variant="icon" onClick={onClose} aria-label={`Close ${title}`}>
            &times;
          </Button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
