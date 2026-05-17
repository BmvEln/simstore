import { z } from "zod";

export type FormValues = z.infer<typeof formSchema>;
export const formSchema = z.object({
  firstName: z.string().min(2, "Имя должно быть не менее 2 символов"),
  lastName: z.string().min(2, "Фамилия должна быть не менее 2 символов"),
  email: z.string().email("Неверный формат электронной почты"),
  phone: z.string().min(10, "Необходимо заполнить телефон"),
  address: z.string().min(10, "Необходимо заполнить адрес"),
  comment: z.string().optional(),
});
