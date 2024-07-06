import * as z from 'zod'
// const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
// const ACCEPTED_FILE_TYPES = [
//   'video/mp4',
//   'video/avi',
//   'video/quicktime',
//   'video/x-ms-wmv',
//   'video/x-flv',
//   'video/x-matroska',
//   'video/webm',
//   'video/mpeg',
//   'video/3gpp',
//   'application/vnd.rn-realmedia'
// ];
export const corevalueSchema = z.object({
    coreValues: z
      .string()
      .min(3, {
        message: 'Values must be at least 3 characters long',
      })
      .max(20, {
        message: 'Values must not exceed 20 characters',
      })
      .regex(/^[a-zA-Z]+$/, {
        message: 'Values must not contain numbers, spaces, or special characters',
      }),
  });
  
  export const profileSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: 'Name is required',
      })
      .min(3, {
        message: 'Name must be at least 3 characters long',
      })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Name must not contain numbers or special characters',
    }),
      
      profile: z
      .string()
      .min(1, {
        message: 'Position is required',
      })
      .max(20, {
        message: 'Position must not exceed 20 characters',
      }),
      // interview:z
      // .instanceof(File)
      // .refine((file) => {
      //   return file.size <= MAX_UPLOAD_SIZE;
      // }, { message: 'File size must be less than 3MB' })
      // .refine((file) => {
      //   return ACCEPTED_FILE_TYPES.includes(file.type);
      // }, { message: 'File must be a valid video format (e.g., MP4, MPEG)' })
      
  });

