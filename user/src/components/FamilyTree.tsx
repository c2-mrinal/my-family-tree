import React from "react";
import Tree from "./Tree/Tree";
interface FamilyTreeProps {
	data: any; 
	type:string;
	 onHover:string;
	 folder: Folder;

  }
  interface Folder {
	name: string;
	children?: Folder[];
  }
  const data: Folder = {
	name: 'Root Folder',
	children: [
	  { name: 'Subfolder 1', children: [{ name: 'File 1.txt' }, { name: 'File 2.txt' }] },
	  { name: 'Subfolder 2' , children: [{ name: 'File 1.txt' }, { name: 'File 2.txt' },{ name: 'File 1.txt' }, { name: 'File 2.txt' },{ name: 'File 1.txt' }, { name: 'File 2.txt' },{ name: 'File 1.txt' }, { name: 'File 2.txt' }]},
	],
  };
function FamilyTree(props: FamilyTreeProps) {
	return <div>
		<Tree name={data.name} children={data.children}/>
	</div>;
}

export default FamilyTree;
