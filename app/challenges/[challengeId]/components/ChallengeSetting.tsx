"use client"

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import { IoIosSettings } from "react-icons/io";

export default function ChallengeSetting() {
  return (
    <Dropdown>
        <DropdownTrigger>
        <Button
            color="primary"
            variant="flat"
            startContent={<IoIosSettings/>}
        >
            챌린지 관리
        </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="챌린지 관리"
          onAction={(key) => {
            if (key === "modify") console.log("챌린지 수정")
            if (key === "member") console.log("멤버 관리")
          }}
        >
            <DropdownItem key="modify">챌린지 수정</DropdownItem>
            <DropdownItem key="member">멤버 관리</DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}