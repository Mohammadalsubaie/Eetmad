export type ProjectStatus =
  | 'draft'
  | 'pending_contract'
  | 'active'
  | 'on_hold'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected';

export interface DeliveryProof {
  id: string;
  filePath: string;
  fileType: string;
  description?: string;
  uploadedAt: string;
}

export interface MilestoneAttachment {
  id: string;
  filePath: string;
  fileType: string;
  uploadedAt: string;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  milestoneNumber: number;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: MilestoneStatus;
  deliverables: string | null;
  attachments: MilestoneAttachment[] | null;
  completedAt: string | null;
  approvedAt: string | null;
  paymentReleased: boolean;
  notes: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  url: string;
  filePath?: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  requestId: string;
  offerId: string;
  clientId: string;
  supplierId: string;
  contractId: string | null;
  totalAmount: number;
  depositAmount: number;
  finalAmount: number;
  status: ProjectStatus;
  startDate: string;
  expectedEndDate: string;
  actualEndDate: string | null;
  deliveryProof: DeliveryProof[];
  deliveryNotes: string;
  approvedByClient: boolean;
  approvalDate: string | null;
  progress: number; // 0-100 percentage
  milestones: ProjectMilestone[];
  createdAt: string;
  updatedAt: string;
}
