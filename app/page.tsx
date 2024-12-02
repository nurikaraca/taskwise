import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";

export default async function Home() {


  return (

    <div className="flex   items-center justify-center   relative  mt-[10rem] ">
      <div className=" absolute top-2">
        <Image
       src="/bg-transparent.png"
       alt='logo'
       width={100}
       height={100}
      />
      </div>
       
   <div className="absolute top-48 ">
    <AnimatedText />
   </div>
      
    </div>
  )
}
