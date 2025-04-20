import React from 'react';
import { Trophy } from 'lucide-react';

interface RankIconProps {
  rank: number;
}

const RankIcon: React.FC<RankIconProps> = ({ rank }) => {
  if (rank === 1) {
    return <Trophy className="h-5 w-5 text-[#e2b714]" />;
  } else if (rank === 2) {
    return <Trophy className="h-5 w-5 text-[#95a5a6]" />;
  } else if (rank === 3) {
    return <Trophy className="h-5 w-5 text-[#cd7f32]" />;
  } else {
    return <span className="text-[#646669] font-medium">{rank}</span>;
  }
};

export default RankIcon;