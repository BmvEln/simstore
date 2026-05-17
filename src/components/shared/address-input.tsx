"use client";

import React from "react";

import { AddressSuggestions } from "react-dadata";

import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange: (value: string) => void;
}

function AddressInput({ onChange }: Props) {
  return (
    <AddressSuggestions
      token={process.env.NEXT_PUBLIC_API_DADATA!}
      onChange={(data) => onChange(data?.value || "")}
    />
  );
}

export default AddressInput;
