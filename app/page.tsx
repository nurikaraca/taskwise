import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";

export default async function Home() {


  return (

    <div className="flex items-center justify-center  h-full relative">
      <div className=" absolute top-20">
        <Image
       src="/bg-transparent.png"
       alt='logo'
       width={300}
       height={300}
      />
      </div>
       
   <div className="absolute bottom-7">
    <AnimatedText />
   </div>
      
    </div>
  )
}
