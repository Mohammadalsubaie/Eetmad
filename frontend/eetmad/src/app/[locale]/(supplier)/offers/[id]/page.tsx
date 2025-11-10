export default function OfferDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Offer Details</h1>
      <p>Offer ID: {params.id}</p>
      {/* Offer details will be implemented here */}
    </div>
  );
}
