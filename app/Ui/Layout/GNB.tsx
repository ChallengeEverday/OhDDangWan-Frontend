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
  Link,
  Button,
} from "@nextui-org/react"
import { usePathname } from "next/navigation"
import { gnblinks } from "@/app/utils/data/links"
import Logo from "./Logo"
import { MdNightlightRound } from "react-icons/md"
import { MdSunny } from "react-icons/md"
import { useTheme } from "next-themes"

export default function GNB() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* 모바일 UI */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link color="primary" href="/" size="lg">
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
              <Link
                color={isActive ? "primary" : "foreground"}
                href={href}
                size="lg"
              >
                {title}
              </Link>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>

      {/* 데스크탑 UI */}
      <NavbarContent className="hidden sm:flex">
        <NavbarBrand>
          <Link color="primary" href="/" size="lg">
            <Logo />
            <p className="hidden">오땡완</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {gnblinks.map(({ title, href }) => {
          const isActive = pathname === href
          return (
            <NavbarItem key={title} isActive={isActive}>
              <Link
                color={isActive ? "primary" : "foreground"}
                href={href}
                size="lg"
              >
                {title}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>

      {/* 공통 UI */}
      <NavbarContent justify="end">
        <NavbarItem>
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
          <Button as={Link} color="primary" href="/login" variant="flat">
            로그인
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
