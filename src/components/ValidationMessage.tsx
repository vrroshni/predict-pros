import { ThumbsUp } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface ValidationMessageProps<T extends z.ZodType<any, any>> {
  form?: UseFormReturn<z.infer<T>>;
  fieldName: keyof z.infer<T>;
}

const ValidationMessage = <T extends z.ZodType<any, any>>({
  form,
  fieldName,
}: ValidationMessageProps<T>) => {
  const fieldError = form?.formState.errors[fieldName];
  return (
    <div className="text-sm font-normal h-5 mt-1  px-3 md:px-6 flex items-center text-green-600">
      {fieldError ? (
        <span className="text-blue-400 ">{"* " + fieldError.message}</span>
      ) : (
        <>
          {form?.formState.isValid && (
            <div className=' flex items-center'>
              <span className="font-medium">Good to go</span>
              <ThumbsUp className="h-4 w-4 ml-2" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ValidationMessage;