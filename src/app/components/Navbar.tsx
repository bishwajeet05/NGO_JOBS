"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Briefcase, CalendarDays, Coins as HandCoins, Newspaper, LogIn, UserPlus, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { name: "Jobs", path: "/jobs", icon: <CalendarDays className="h-4 w-4 mr-2" /> },
  { name: "Grants", path: "/grants", icon: <HandCoins className="h-4 w-4 mr-2" /> },
  { name: "News", path: "/news", icon: <Newspaper className="h-4 w-4 mr-2" /> },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  let router;
  try {
    router = useRouter();
  } catch (error) {
    console.log("NextRouter is not mounted:", (error as Error).message);
  }

  // Fallback pathname when router is not available
  const pathname = router?.pathname || "/";

  // Handle scroll event to toggle transparency
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-10 w-full bg-gradient-to-r from-blue-600 to-green-500 shadow-md backdrop-blur py-3 px-3 xs:px-4 sm:px-6 lg:px-8",
        isScrolled ? "bg-opacity-50" : "bg-opacity-100"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo-icon.svg" alt="NGO Hiring Logo" className="h-8 w-8" />
          <span className="text-xl font-bold gradient-text">NGO Hiring</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link href={item.path} passHref legacyBehavior>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === item.path ? "bg-accent/80 text-accent-foreground" : ""
                    )}
                  >
                    {item.icon} {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/post-job">Post a Job/Event</Link>
          </Button>
          <Button asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/register">
              <UserPlus className="mr-2 h-4 w-4" /> Register
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/logo-icon.svg" alt="NGO Hiring Logo" className="h-8 w-8" />
                  <span className="text-xl font-bold gradient-text">NGO Hiring</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={cn(
                      "flex items-center py-2 px-3 rounded-md text-lg font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.path ? "bg-accent text-accent-foreground" : ""
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon} {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <Button variant="outline" className="w-full mb-2" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/post-job">Post a Job/Event</Link>
                  </Button>
                  <Button className="w-full mb-2" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </Link>
                  </Button>
                  <Button variant="secondary" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" /> Register
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;