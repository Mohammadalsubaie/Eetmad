export default function RequestDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Request Details</h1>
      <p>Request ID: {params.id}</p>
      {/* Request details will be implemented here */}
    </div>
  );
}
