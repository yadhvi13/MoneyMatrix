import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl",
        "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
