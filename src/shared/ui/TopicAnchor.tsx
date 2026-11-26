export interface TopicAnchorProps {
  id: string;
}

export function TopicAnchor({ id }: TopicAnchorProps) {
  return <span id={id} className="topic-anchor" aria-hidden="true" />;
}
