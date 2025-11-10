export default function DisputeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Dispute Details</h1>
      <p>Dispute ID: {params.id}</p>
      {/* Dispute details will be implemented here */}
    </div>
  );
}
