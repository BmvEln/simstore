import React, { useCallback } from "react";
import Image from "next/image";

import { useFormContext } from "react-hook-form";

import { IMG } from "@/static/img";

import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

function FormTextarea({
  className,
  name,
  label,
  required,
  ...props
}: FormTextareaProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = useCallback(() => {
    setValue(name, "", { shouldValidate: true });
  }, []);

  return (
    <div className={className}>
      {label && (
        <div className="font-medium mb-2">
          {label} {required && "*"}
        </div>
      )}

      <div className="relative">
        <Textarea className="text-md" {...register(name)} {...props} />

        {value && (
          <Image
            className="absolute p-0 bg-transparent right-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            onClick={onClickClear}
            src={IMG.x}
            alt=""
            width={16}
            height={16}
          />
        )}
      </div>

      {errorText && (
        <div className="text-red-500 text-sm mt-2">{errorText}</div>
      )}
    </div>
  );
}

export default FormTextarea;
