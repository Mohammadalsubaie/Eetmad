export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Supplier Profile</h1>
      <p>Supplier ID: {params.id}</p>
      {/* Supplier profile will be implemented here */}
    </div>
  );
}
