"use client"
// import ChatInterface from "@/components/pages/chat/Chat";
import dynamic from 'next/dynamic'
const ChatInterface = dynamic(
  () => import('./../../../components/pages/brain/SmallScreenBrain'),
  { ssr: false }
)
const page =()=>{
  return <ChatInterface/>
}
export default page;