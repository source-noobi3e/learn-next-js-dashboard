import { updateInvoice } from '@/app/lib/actions';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/form';

interface EditInvoicePageProps {
  params: { id: string };
}

const EditInvoicePage = async ({ params: { id } }: EditInvoicePageProps) => {
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  const updateInvoiceWithId = updateInvoice.bind(null, id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        invoice={invoice}
        customers={customers}
        action={updateInvoiceWithId}
        btnTitle="edit Invoice"
      />
    </main>
  );
};

export default EditInvoicePage;
