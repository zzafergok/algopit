type MarqueeTickerProps = {
  text?: string;
};

export function MarqueeTicker({ text }: MarqueeTickerProps) {
  const defaultText =
    'SORTING · GRAPH TRAVERSAL · DIJKSTRA · DYNAMIC PROGRAMMING · RECURSION · BIG-O COMPLEXITY · DATA STRUCTURES · SEARCHING · BINARY SEARCH · HEAP · TREES · TIME COMPLEXITY · SPACE COMPLEXITY · BREADTH-FIRST SEARCH · DEPTH-FIRST SEARCH';
  const content = text ?? defaultText;

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div className="marquee-group" key={group}>
            {Array.from({ length: 4 }, (_, item) => (
              <span key={item}>
                {content} <i>·</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
