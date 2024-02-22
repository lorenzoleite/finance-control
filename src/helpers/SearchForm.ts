import * as z from 'zod';

export const searchFormSchema = z.object({
  query: z.string()
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;
