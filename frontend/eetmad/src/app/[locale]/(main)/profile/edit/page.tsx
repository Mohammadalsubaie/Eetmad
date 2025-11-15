// TODO: Implement this page with proper i18n
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function ProfileEditPage() {
  const { user } = useAuth();
  const isSupplier = user?.userType === 'supplier';

  return (
    <div>
      <h1>Edit Profile</h1>
      {isSupplier && (
        <p className="text-sm text-muted-foreground">
          Supplier profile editing - additional supplier-specific fields will be available here
        </p>
      )}
      {/* Profile edit form will be implemented here with role-based fields */}
    </div>
  );
}
