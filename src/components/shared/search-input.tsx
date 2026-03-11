"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface Props {
  className?: string;
}

function SearchInput({ className }: Props) {
  const [search, setSearch] = useState("");
  const [focuse, setFocuse] = useState(false);

  return (
    <>
      {focuse && <div className="fixed inset-0 bg-black/50 z-20"></div>}

      <div className={cn("flex relative z-20", className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

        <Input
          className="outline-none rounded-md w-full bg-gray-50 pl-11"
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocuse(true)}
          onBlur={() => setFocuse(false)}
        />
      </div>
    </>
  );
}

export default SearchInput;
