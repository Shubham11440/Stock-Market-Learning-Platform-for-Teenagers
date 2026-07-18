'use client'

import { motion } from 'framer-motion'

const leaderboard = [
  { rank: 1, name: 'Arjun Mehta', handle: '@arjunm', gain: '+14.2%', amount: '₹2,14,300' },
  { rank: 2, name: 'Priya Singh', handle: '@priyaS', gain: '+11.8%', amount: '₹1,98,450' },
  { rank: 3, name: 'Rohan Shah', handle: '@rohanS', gain: '+9.4%', amount: '₹1,76,200' },
  { rank: 4, name: 'Anika Patel', handle: '@anikaP', gain: '+7.1%', amount: '₹1,54,800' },
  { rank: 5, name: 'Dev Sharma', handle: '@devSh', gain: '-2.3%', amount: '₹1,32,100', loss: true },
]

export function LeaderboardShowcase() {
  return (
    <section id="leaderboard" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-text-1 mb-4"
           >
             The top 1% <span className="text-editorial">this week.</span>
           </motion.h2>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-text-2 text-lg"
           >
             Compete nationally on the virtual leaderboard.
           </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="premium-card p-2 md:p-6 shadow-premium-lg"
        >
           <div className="space-y-1">
             {leaderboard.map((user, idx) => (
               <div 
                 key={user.rank}
                 className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-2/50 transition-colors group cursor-default"
               >
                 <div className="flex items-center gap-4">
                   <div className="w-8 text-center">
                     <span className={`font-semibold ${
                       user.rank === 1 ? 'text-gold' : 
                       user.rank === 2 ? 'text-text-3' : 
                       user.rank === 3 ? 'text-orange-400' : 'text-text-3/50'
                     }`}>
                       {user.rank}
                     </span>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center font-semibold text-text-2 group-hover:bg-primary group-hover:text-white transition-colors">
                     {user.name.charAt(0)}
                   </div>
                   <div>
                     <p className="font-semibold text-text-1">{user.name}</p>
                     <p className="text-xs text-text-3">{user.handle}</p>
                   </div>
                 </div>
                 
                 <div className="text-right">
                   <p className="font-mono font-medium text-text-1">{user.amount}</p>
                   <p className={`text-xs font-semibold ${user.loss ? 'text-loss' : 'text-profit'}`}>
                     {user.gain}
                   </p>
                 </div>
               </div>
             ))}
           </div>
        </motion.div>
      </div>
    </section>
  )
}
