import React from 'react';
import { User, BarChart2, Keyboard, MessageSquare, BookOpen, Contact, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  showLeaderboard: boolean;
  onLeaderboardToggle: () => void;
}

export const Header: React.FC = () => {
  const {profile} = useAuth()
  const location = usePathname(); // Initialize the router

  return (
    <header className="w-full p-4">
      <div className="max-w-[850px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          
          <Link href="/" className={`flex items-center gap-2 ${location == '/'? 'text-[#e2b714]':''}`}>
          <Keyboard className="w-5 h-5" /> 
          <h1 className="text-[#d1d0c5] text-xl font-bold">MonkeyType</h1>
          </Link>
          <Link href="/leaderboard" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
            ${location == '/leaderboard'?'text-[#e2b714]':''}`}>
          <BarChart2 className="w-4 h-4" />
          leaderboard
          </Link>
          <Link href="/thread" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
            ${location == '/thread'?'text-[#e2b714]':''}`}>
          <MessageSquare className="w-4 h-4" />
          Thread
          </Link>
          <Link href="/privacy-policy" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
            ${location == '/privacy-policy'?'text-[#e2b714]':''}`}>
          <BookOpen className="w-4 h-4"/>
          Terms
          </Link>
          <Link href="/contact" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
            ${location == '/contact'?'text-[#e2b714]':''}`}>
          <Phone className="w-4 h-4"/>
          Contact Us
          </Link>
        </div>
     <Link href="/account" className={`hover:text-[#d1d0c5] transition-colors flex items-center gap-2
     ${location == '/account'?'text-[#e2b714]':''}`}>
     
        <User className="w-4 h-4" />
        <span>{profile?.user?.nickname ? `${profile.user.nickname.length > 8 ? 
            profile.user.nickname.slice(0, 8) + '...' : 
            profile.user.nickname}` : 'Account'}</span>
     </Link>
      </div>
    </header>
  );
};