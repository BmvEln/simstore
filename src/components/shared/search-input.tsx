"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useDebounce } from "react-use";

import { Product } from "../../../generated/prisma/client";

import { cn } from "@/lib/utils";

import { Search } from "lucide-react";

import { API } from "@/services/api-client";

import { Input } from "@/components/ui/input";

interface Props {
  className?: string;
}

function SearchInput({ className }: Props) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [focus, setFocus] = useState(false);

  const onClickItem = useCallback(() => {
    setSearch("");
    setProducts([]);
  }, []);

  useDebounce(
    async () => {
      try {
        if (search.trim() === "") {
          setProducts([]);
          return;
        }

        const data = await API.products.search(search);
        setProducts(data);
      } catch (error) {
        console.error("Ошибка при поиске продуктов:", error);
      }
    },
    250,
    [search],
  );

  return (
    <>
      {focus && <div className="fixed inset-0 bg-black/50 z-20"></div>}

      <div className={cn("flex relative z-20", className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

        <Input
          className="outline-none rounded-md w-full bg-gray-50 pl-11"
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />

        <div
          className={cn(
            "absolute w-full bg-white rounded-md py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focus && "visible opacity-100 top-12",
          )}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={onClickItem}
              >
                <div className="px-3 py-2 transition-bg duration-100 hover:bg-primary/10 cursor-pointer">
                  {product.name}
                </div>
              </Link>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 select-none">
              Ничего не найдено
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchInput;
