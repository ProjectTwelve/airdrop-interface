import React from 'react';
import { motion } from 'framer-motion';
import Tag from '../tag';

export default function GamerStatus() {
  return (
    <motion.div
      initial={{ opacity: 0.65, width: 0 }}
      animate={{ opacity: 1, width: 'auto' }}
      exit={{ opacity: 0, width: 0 }}
      className="flex border-r border-p12-line px-3"
    >
      <Tag type="red" size="large" value="No NFT yet" />
    </motion.div>
  );
}
