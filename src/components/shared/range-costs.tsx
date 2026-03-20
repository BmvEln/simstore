"use client";

import React, { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const MAX_PRICE = 5000;

type PriceRange = { from?: number; to?: number };

type RangeCosts = {
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
};

function RangeCosts({ priceRange, setPriceRange }: RangeCosts) {
  const onChangePrice = useCallback(
    (fieldName: keyof PriceRange, value: number) =>
      setPriceRange({
        ...priceRange,
        [fieldName]: value,
      }),
    [],
  );

  return (
    <div>
      <p className="font-bold mb-3">Цена от и до</p>

      <div className="flex gap-3 mb-5">
        <Input
          type="number"
          placeholder="0"
          value={priceRange.from}
          min={0}
          max={MAX_PRICE}
          onChange={(e) => onChangePrice("from", parseInt(e.target.value) || 0)}
        />
        <Input
          type="number"
          min={100}
          max={MAX_PRICE}
          placeholder="5000"
          value={priceRange.to}
          onChange={(e) =>
            onChangePrice("to", parseInt(e.target.value) || 5000)
          }
        />
      </div>

      <Slider
        defaultValue={[priceRange.from, priceRange.to]}
        value={[priceRange.from || 0, priceRange.to || 5000]}
        min={0}
        max={MAX_PRICE}
        step={100}
        className="w-full"
        onValueChange={([from, to]) =>
          setPriceRange({
            from,
            to,
          })
        }
      />
    </div>
  );
}

export default RangeCosts;
