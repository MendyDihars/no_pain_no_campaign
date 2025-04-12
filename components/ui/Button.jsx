import { cn } from '@root/lib/utils';
import { motion } from 'framer-motion';

export default function Button({ children, className, type = 'button', ...props }) {
  return (
    <motion.button
      {...props}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className={cn(
        'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
