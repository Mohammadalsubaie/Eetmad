export default function EditRequestPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Request</h1>
      <p>Request ID: {params.id}</p>
      {/* Edit request form will be implemented here */}
    </div>
  );
}
