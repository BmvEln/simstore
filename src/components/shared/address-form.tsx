import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import AddressInput from "@/components/shared/address-input";

interface Props {
  className?: string;
}

function AddressForm({ className }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="address"
      render={({ field, formState }) => (
        <div>
          <AddressInput onChange={field.onChange} />
          {formState.errors.address?.message && (
            <div className="text-red-500 text-sm mt-2">
              {formState.errors.address.message}
            </div>
          )}
        </div>
      )}
    />
  );
}

export default AddressForm;
