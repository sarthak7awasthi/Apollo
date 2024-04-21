import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Scenario } from "../components/Scenario";
import { ChatInterface } from "../components/ChatInterface";

const style = {
  flex: 3, // Takes up 30% of the container
  padding: '20px',
  border: '1px solid #ccc',
  boxSizing: 'border-box' // Includes padding and border in the element's total width and height
};

function Avatar() {
  return (
    <>
    <div style={style}>
      <Loader />
      <Leva collapsed hidden/>
      {/* <ChatInterface /> */}
      <Canvas shadows camera={{ position: [0, 0, 0], fov: 10 }}>
        <Scenario />
      </Canvas>
      </div>
    </>
  );
}

export default Avatar;
