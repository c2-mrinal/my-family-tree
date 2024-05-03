'use client'
import React, { useState } from 'react';
import ImageCard from '../Card';
import "./tree.css";

interface Folder {
  name: string;
  children?: Folder[];
}

const Tree: React.FC<Folder> = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => setIsOpen(!isOpen);

  const renderChildren = () => {
    if (!children || !isOpen) return null;

    return children.map((child) => (
      <Tree key={child.name} name={child.name} children={child.children} />
    ));
  };

  return (
    <div >
      <div onClick={toggleFolder}>
        <ImageCard name={name} open={isOpen} />
      </div>
      <div className='display-row'>
      {renderChildren()}
      </div>
    </div>
  );
};

export default Tree;
