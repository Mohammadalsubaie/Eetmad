export default function EditOfferPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Offer</h1>
      <p>Offer ID: {params.id}</p>
      {/* Edit offer form will be implemented here */}
    </div>
  );
}
