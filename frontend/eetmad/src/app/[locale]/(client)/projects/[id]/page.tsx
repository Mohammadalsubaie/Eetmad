'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const isSupplier = user?.userType === 'supplier';
  const isClient = user?.userType === 'client';

  return (
    <div>
      <h1>Project Details</h1>
      <p>Project ID: {params.id}</p>
      {isSupplier && (
        <p className="text-sm text-muted-foreground">
          Viewing project as supplier - bid and offer management will be available here
        </p>
      )}
      {isClient && (
        <p className="text-sm text-muted-foreground">
          Viewing project as client - project management will be available here
        </p>
      )}
      {/* Project details will be implemented here with role-based rendering */}
    </div>
  );
}
