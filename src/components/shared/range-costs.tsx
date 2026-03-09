"use client";

import React, { useState } from "react";

import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

function RangeCosts() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  return (
    <div>
      <p className="font-bold mb-3">Цена от и до</p>

      <div className="flex gap-3 mb-5">
        <Input
          type="number"
          placeholder="0"
          value={priceRange[0]}
          min={0}
          max={1000}
          defaultValue={priceRange[0]}
          onChange={(e) =>
            setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
          }
        />
        <Input
          type="number"
          min={100}
          max={1000}
          placeholder="1000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])
          }
        />
      </div>

      <Slider
        defaultValue={priceRange}
        value={priceRange}
        max={1000}
        step={100}
        className="w-full"
        onValueChange={(values) => setPriceRange([values[0], values[1]])}
      />
    </div>
  );
}

export default RangeCosts;
