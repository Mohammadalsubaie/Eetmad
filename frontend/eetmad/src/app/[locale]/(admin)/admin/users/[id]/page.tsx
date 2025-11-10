export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {params.id}</p>
      {/* User details will be implemented here */}
    </div>
  );
}
