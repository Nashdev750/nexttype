"use client"
import React from 'react';
import { Trophy, Timer, Target, Keyboard, BarChart2, Activity, Hash, Image, Copy, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { formatTimeSpent } from '@/constants/utils';
import Tooltip from './Tooltip';

function StatCard({ icon: Icon, label, value, subValue }: { icon: React.ElementType; label: string; value: string; subValue?: string }) {
  return (
    <div className="bg-zinc-900/50 rounded-xl p-4 flex flex-col gap-2 hover:bg-zinc-800/50 transition-colors">
      <div className="flex items-center gap-2 text-zinc-400">
        <Icon size={18} />
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-mono text-amber-500">{value}</span>
        {subValue && <span className="text-xs text-zinc-500">{subValue}</span>}
      </div>
    </div>
  );
}

function Profile() {
  const { profile } = useAuth() 
  const [showCopiedTooltip, setShowCopiedTooltip] = React.useState(false);

  const copyProfileUrl = () => {
    const profileUrl = `${window.location.origin}/profile/${profile.user.publicId}`;
    navigator.clipboard.writeText(profileUrl);
    setShowCopiedTooltip(true);
    setTimeout(() => setShowCopiedTooltip(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#323437] text-[#fff] p-4 md:p-8">
      <div className="max-w-[850px] mx-auto">
        {/* Profile Header */}
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <span className="text-2xl font-bold">
            <img 
                src={profile.user.profileImage.replace("profile/","")} 
                alt={`${profile.user.nickname}'s avatar`}
                className="object-cover w-20 h-20 rounded-full"
              />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{profile?.user?.nickname}</h1>
              <Tooltip
                trigger={
                  <button
                    onClick={copyProfileUrl}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                }
                content={showCopiedTooltip ? "Copied!" : "Copy profile URL"}
              />
              <Tooltip
                trigger={
                  <button className="p-1.5 text-zinc-400 hover:text-zinc-200">
                    <Info size={16} />
                  </button>
                }
                content="Your email address is private and only visible to you. Share your profile URL safely with others!"
              />
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500">
                joined {formatDistanceToNow(new Date(profile?.user?.createdAt), { addSuffix: true })}
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800">
                tests completed: {profile.user?.typingStats?.testsCompleted}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard 
            icon={Trophy}
            label="highest wpm"
            value={profile.user?.typingStats?.highestWpm}
            subValue={`${profile.user?.typingStats?.highestWpmRecord.time} seconds`}
          />
          <StatCard 
            icon={Timer}
            label="average wpm"
            value={profile.user?.typingStats?.averageWpm}
            subValue="last 10 tests"
          />
          <StatCard 
            icon={Target}
            label="accuracy"
            value={`${profile.user?.typingStats?.averageAccuracy}%`}
            subValue="lifetime"
          />
          <StatCard 
            icon={Keyboard}
            label="tests started"
            value={profile.user?.typingStats?.testsStarted}
          />
          <StatCard 
            icon={BarChart2}
            label="tests completed"
            value={profile.user?.typingStats?.testsCompleted}
          />
          <StatCard 
            icon={Activity}
            label="time typing"
            value={formatTimeSpent(profile.user?.typingStats?.totalTimeTyping)}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-[#323437] rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Hash size={20} />
            Recent Tests
          </h2>
          <div className="space-y-4">
            {profile.user?.typingStats?.recentTests.sort((a, b) => 
              new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
            ).map((data, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-mono text-amber-500">{data.wpm}</span>
                  <div className="text-sm">
                    <div className="text-zinc-300">{data.testType} {data?.time}</div>
                    <div className="text-zinc-500">accuracy: {data.accuracy}%</div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-zinc-400">{formatDistanceToNow(new Date(data.completedAt), { addSuffix: true })}</div>
                  <div className="text-zinc-600">raw: {data.rawWpm}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;