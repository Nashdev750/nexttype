import React, { useMemo } from 'react';

interface KeyStroke {
  timestamp: number;
  correct: boolean;
}

interface TypingGraphProps {
  keystrokes: KeyStroke[];
  width?: number;
  height?: number;
  className?: string;
}

const TypingGraph: React.FC<TypingGraphProps> = ({
  keystrokes,
  width = 100,
  height = 40,
  className = '',
}) => {
  const points = useMemo(() => {
    if (!keystrokes || keystrokes.length === 0) return '';
    const keyStrokes = keystrokes
    keyStrokes[0].timestamp = 0

    // Normalize the timestamps
    const firstTimestamp = keyStrokes[0].timestamp;
    const lastTimestamp = keyStrokes[keyStrokes.length - 1].timestamp;
    const timeRange = lastTimestamp;
    // Create points for the polyline
    return keyStrokes.map((stroke, index) => {
      // Calculate x position based on time (normalized to width)
      const x = ((stroke.timestamp - firstTimestamp) / timeRange) * width;
      console.log(x)
      
      // For y position, we'll use a combination of:
      // 1. The time gap between consecutive keystrokes (typing speed)
      // 2. Whether the keystroke was correct
      
      let y = height / 2; // Default to middle
      
      if (index > 0) {
        // Calculate time gap between current and previous keystroke
        const timeDiff = stroke.timestamp - keyStrokes[index - 1].timestamp;
        
        // Normalize the time diff to get a value roughly between 0-1
        // Lower values (faster typing) result in higher points on the graph
        const normalizedSpeed = Math.min(1, Math.max(0, timeDiff / 500));
        
        // Invert the value so faster typing = higher on graph
        y = height - (normalizedSpeed * height * 0.8);
        
        // Adjust y if the keystroke was incorrect
        if (!stroke.correct) {
          y = Math.min(height * 0.9, y + height * 0.2);
        }
      }
      
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }, [keystrokes, width, height]);

  if (!keystrokes || keystrokes.length < 2) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg width={width} height={height} className="text-[#e2b714]">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80"
        />
      </svg>
    </div>
  );
};

export default TypingGraph;