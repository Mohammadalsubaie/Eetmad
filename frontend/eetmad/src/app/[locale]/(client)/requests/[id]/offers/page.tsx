export default function RequestOffersPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Request Offers</h1>
      <p>Request ID: {params.id}</p>
      {/* Offers list will be implemented here */}
    </div>
  );
}
