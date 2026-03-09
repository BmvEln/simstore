import React from "react";

import { cn } from "@/lib/utils";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface Props {
  className?: string;
}

function Logo() {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7L12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}

function Header({ className }: Props) {
  return (
    <header className={cn("", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <div className="flex items-center gap-4">
          <Logo />
          <div>
            <h1 className="text-2xl uppercase font-black">SimStore</h1>
            <p className="text-sm text-gray-400 leading-3">Симулируй это</p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex gap-4">
          <Button className="flex items-center gap-1" variant="outline">
            <User size={16} />
            <span>Войти</span>
          </Button>

          <div>
            <Button className="group relative" variant="outline">
              <b>110 ₽</b>

              <span className="h-full w-[1px] bg-black/50 mx-3" />

              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                <b>6</b>
              </div>

              <ArrowRight
                size={20}
                className="absolute right-5 transition duration-300 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Button>
          </div>
        </div>
      </Container>

      <div className="h-[1px] w-full bg-black/10" />
    </header>
  );
}

export default Header;
