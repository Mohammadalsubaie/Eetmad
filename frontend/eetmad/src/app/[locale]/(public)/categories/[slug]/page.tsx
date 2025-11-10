export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Category: {params.slug}</h1>
      {/* Category page content will be implemented here */}
    </div>
  );
}
