"use client"
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('./../../../components/pages/brain/SmallScreenBrain'),
  { ssr: false }
)
// import Brain from "@/components/pages/brain/SmallScreenBrain";
export default function Page(){
  return <DynamicComponentWithNoSSR/>
}