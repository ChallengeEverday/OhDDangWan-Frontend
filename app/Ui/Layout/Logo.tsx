import Image from "next/image"
import logo from "@/public/logo.svg"

export default function Logo({ size = 100 }) {
  return <Image src={logo} alt="오땡완" width={size} />
}
