import styles from "./page.module.css";
import FamilyTree from "../components/FamilyTree"

export default function Home() {
  return (
    <main >
     <FamilyTree
     data = {{data:"yes"}}
     type="circle"
     onHover="show"
     />
    </main>
  );
}
