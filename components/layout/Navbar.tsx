'use client'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Menu } from "lucide-react";
import AuthButton from "./auth-button";
import UserMenu from "./user-menu";
import { useState } from "react";  // Import useState
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);  // State to control the sheet

  // Function to close the sheet
  const closeSheet = () => setIsOpen(false);

  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 sticky top-0 z-10 bg-white dark:bg-gray-950">
      
      {/* Mobile Navigation Menu */}
      <div className="flex w-full lg:w-0 items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>GoTogether | By WebnD</SheetTitle>
            </SheetHeader>

            <div className="grid gap-2 py-6">
              <Link href="/" className="flex w-full items-center py-2 text-base" prefetch={false} onClick={closeSheet}>
                Home
              </Link>
              <Link href="/share" className="flex w-full items-center py-2 text-base" prefetch={false} onClick={closeSheet}>
                Share
              </Link>
              <Link href="/history" className="flex w-full items-center py-2 text-base" prefetch={false} onClick={closeSheet}>
                History
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-3 lg:hidden">
          {session ? <UserMenu /> : <AuthButton />}
          <ModeToggle />
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      <Link href="/" className="mr-6 hidden lg:flex items-center justify-center" prefetch={false}>
      <MapPin className="h-6 w-6 text-primary m-6" />
        <span className="text-lg font-bold">GoTogether | Developed by WebnD</span>
        <span className="sr-only"><MapPin className="h-6 w-6 text-primary" />GoTogether | Developed by WebnD</span>
      </Link>

      <nav className="ml-auto hidden lg:flex gap-6 lg:items-center">
        <Link href="/" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50" prefetch={false}>
          Home
        </Link>
        <Link href="/share" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50" prefetch={false}>
          Share
        </Link>
        <Link href="/history" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50" prefetch={false}>
          History
        </Link>

        {session ? <UserMenu /> : <AuthButton />}
        <ModeToggle />
      </nav>
    </header>
  );
}
