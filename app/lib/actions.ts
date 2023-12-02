'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const newInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const NewInvoice = newInvoiceSchema.omit({ id: true, date: true });

export const createInvoice = async (formData: FormData) => {
  try {
    const { amount, customerId, status } = NewInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    // Test it out:
    console.log({ amount, customerId, status });

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (err) {
    console.error(err);
  }
};

export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = NewInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    await sql`UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}`;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (err) {
    console.error(err);
  }
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;

    revalidatePath('/dashboard/invoices');
  } catch (err) {
    console.error(err);
  }
}
