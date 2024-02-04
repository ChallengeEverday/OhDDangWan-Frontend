"use client"

import { useState } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link as UiLink,
  Button,
  Avatar,
} from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { gnblinks } from "@/app/utils/data/links"
import Logo from "./Logo"
import { MdNightlightRound } from "react-icons/md"
import { MdSunny } from "react-icons/md"
import { useTheme } from "next-themes"
import { useUserInfoStore } from "@/app/utils/store/userInfoStore"
import { GoPlus } from "react-icons/go"

export default function GNB() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* 모바일 UI */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link color="primary" href="/">
            <Logo />
            <p className="hidden">오땡완</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu>
        {gnblinks.map(({ title, href }, index) => {
          const isActive = pathname === href
          return (
            <NavbarMenuItem key={title} isActive={isActive}>
              <Link color={isActive ? "primary" : "foreground"} href={href}>
                {title}
              </Link>
            </NavbarMenuItem>
          )
        })}
        <NavbarMenuItem>
          <Button
            aria-label={
              theme !== "odw-dark" ? "다크 모드 전환" : "라이트 모드 전환"
            }
            variant="light"
            href="/login"
            onClick={() => {
              setTheme(theme === "odw-dark" ? "odw-light" : "odw-dark")
            }}
          >
            {theme !== "odw-dark" ? (
              <>
                <MdNightlightRound size="25" /> 다크 모드
              </>
            ) : (
              <>
                <MdSunny size="25" /> 라이트 모드
              </>
            )}
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>

      {/* 데스크탑 UI */}
      <NavbarContent className="hidden md:flex">
        <NavbarBrand>
          <Link color="primary" href="/">
            <Logo />
            <p className="hidden">오땡완</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {gnblinks.map(({ title, href }) => {
          const isActive = pathname === href
          return (
            <NavbarItem key={title} isActive={isActive}>
              <Link color={isActive ? "primary" : "foreground"} href={href}>
                {title}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>

      {/* 오른쪽 UI */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Button
            isIconOnly
            aria-label={
              theme !== "odw-dark" ? "다크 모드 전환" : "라이트 모드 전환"
            }
            variant="light"
            href="/login"
            onClick={() => {
              setTheme(theme === "odw-dark" ? "odw-light" : "odw-dark")
            }}
          >
            {theme !== "odw-dark" ? (
              <MdNightlightRound size="25" />
            ) : (
              <MdSunny size="25" />
            )}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <GNBUserSelction />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

function GNBUserSelction() {
  const userInfo = useUserInfoStore((state) => state.userInfo)

  if (userInfo) {
    const { nickname, profileImageUrl } = userInfo

    return (
      <div className="flex gap-2 items-center">
        <Button
          as={Link}
          href="/challenges/create"
          variant="flat"
          className="rounded-full w-11 h-11"
          color="primary"
          isIconOnly
        >
          <GoPlus size="25" />
        </Button>
        <Link href="/my">
          <Avatar name={nickname} src={profileImageUrl} />
        </Link>
      </div>
    )
  }

  return (
    <Button as={Link} color="primary" href="/login" variant="flat">
      로그인
    </Button>
  )
}
