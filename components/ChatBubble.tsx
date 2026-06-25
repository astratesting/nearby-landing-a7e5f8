export default function ChatBubble({
  side,
  senderName,
  body,
  time,
}: {
  side: 'left' | 'right';
  senderName: string;
  body: string;
  time: string;
}) {
  return (
    <div className={`flex flex-col ${side === 'right' ? 'items-end' : 'items-start'} mb-3`}>
      <span className="text-[10px] uppercase tracking-wider text-stone mb-1">{senderName}</span>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-sm text-sm leading-relaxed ${
          side === 'right'
            ? 'bg-charcoal text-ivory rounded-br-none'
            : 'bg-cream border border-mist text-charcoal rounded-bl-none'
        }`}
      >
        {body}
      </div>
      <span className="text-[10px] text-stone mt-1">{time}</span>
    </div>
  );
}
