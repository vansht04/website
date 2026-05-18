import {motion, useInView} from 'motion/react';
import {useRef} from 'react';
import {cn} from '@/src/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function Section({children, className, id, delay = 0}: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true, amount: 0.1});

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{opacity: 0, y: 20}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
      transition={{
        duration: 1.2, 
        delay, 
        ease: [0.16, 1, 0.3, 1]
      }}
      className={cn("relative py-32 px-6 max-w-7xl mx-auto", className)}
    >
      {children}
    </motion.section>
  );
}
