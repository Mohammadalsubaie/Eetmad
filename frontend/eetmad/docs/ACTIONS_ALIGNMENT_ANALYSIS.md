# Actions Alignment Analysis

This document analyzes the `actions.md` file against the database schema to ensure all actions are properly aligned and identifies any gaps or inconsistencies.

## Overview

The `actions.md` file contains a comprehensive list of actions/operations organized by entity. This analysis verifies:

1. All actions align with database schema capabilities
2. No missing critical actions
3. Actions reference correct entity relationships
4. Type definitions support all actions

---

## 1. User Actions Analysis

### ✅ Covered Actions (from actions.md)

- registerUser
- loginUser
- logoutUser
- updateProfile
- changePassword
- resetPassword
- uploadAvatar
- deleteAvatar
- verifyEmail
- verifyPhone
- updateNotificationPreferences
- updateAddress
- deactivateAccount
- reactivateAccount
- deleteAccount
- getUserProfile
- getUserByEmail
- getUserByPhone
- getUserStatistics
- getWalletBalance

### ✅ Database Schema Support

All actions are supported by the `User` table fields:

- `passwordHash` → supports password operations
- `isEmailVerified`, `isPhoneVerified` → supports verification
- `avatar` → supports avatar operations
- `status` → supports deactivate/reactivate
- `notificationPreferences` → JSON field supports preferences
- `address` → JSON field supports address updates
- `walletBalance` → supports wallet balance queries
- `lastLoginAt` → supports login tracking

### ⚠️ Additional Actions to Consider

Based on database schema, consider adding:

- `updateUserStatus` (Admin) - Update user status (active/inactive/suspended/banned)
- `getUserByNationalId` - Search by national ID
- `getUsersByStatus` - Filter users by status
- `getUserLoginHistory` - Track login history (requires AuditLog)
- `updateCompanyInfo` - Update companyName, commercialRegister, taxNumber
- `updatePersonalInfo` - Update dateOfBirth, nationalId

### 📝 Type Requirements

- User interface must support all fields referenced by actions
- Need `UserStatus` enum type
- Need `NotificationPreferences` interface
- Need `UserAddress` interface

---

## 2. SupplierProfile Actions Analysis

### ✅ Covered Actions

- createSupplierProfile
- updateSupplierProfile
- addPortfolioItem
- removePortfolioItem
- addCertification
- removeCertification
- updateWorkingHours
- updateServiceDescription
- requestVerification
- cancelVerification
- getSupplierProfile
- getSupplierStatistics
- searchSuppliers
- getTopRatedSuppliers
- getSuppliersByCategory

### ✅ Database Schema Support

All actions supported by `SupplierProfile` table:

- `categories` (JSON) → supports category management
- `serviceDescription` → supports service description updates
- `portfolio` (JSON) → supports portfolio items
- `certifications` (JSON) → supports certifications
- `workingHours` (JSON) → supports working hours
- `isVerified`, `verificationDate`, `verificationNotes` → supports verification

### ⚠️ Additional Actions to Consider

- `updateSupplierCategories` - Update categories array (already mentioned in actions.md under SupplierCategory)
- `setPrimaryCategory` - Set primary category (requires SupplierCategory table)
- `getSupplierResponseTime` - Get average response time
- `getSupplierAcceptanceRate` - Get acceptance rate
- `getSupplierOnTimeDelivery` - Get on-time delivery rate
- `updateSupplierMetrics` - Update responseTime, acceptanceRate, onTimeDelivery

### 📝 Type Requirements

- SupplierProfile interface must include all fields
- Need `SupplierCategory` interface
- Portfolio and Certifications need proper type definitions
- WorkingHours needs structured type

---

## 3. Category Actions Analysis

### ✅ Covered Actions

- createCategory
- updateCategory
- deleteCategory
- activateCategory
- deactivateCategory
- reorderCategories
- getAllCategories
- getCategoryById
- getParentCategories
- getSubCategories
- getActiveCategoriesTree

### ✅ Database Schema Support

All actions supported by `Category` table:

- `parentId` → supports hierarchical structure
- `isActive` → supports activate/deactivate
- `sortOrder` → supports reordering
- `nameAr`, `nameEn` → supports bilingual names

### ✅ Complete

No additional actions needed. All CRUD operations and hierarchical queries are covered.

### 📝 Type Requirements

- Category interface with parent/children relationships
- CategoryTree interface for hierarchical display

---

## 4. SupplierCategory Actions Analysis

### ✅ Covered Actions

- assignCategoryToSupplier
- removeCategoryFromSupplier
- setPrimaryCategory
- updateSupplierCategories
- getSupplierCategories
- getSuppliersInCategory

### ✅ Database Schema Support

All actions supported by `SupplierCategory` table:

- `supplierId`, `categoryId` → supports assignment
- `isPrimary` → supports primary category setting

### ✅ Complete

All junction table operations are covered.

### 📝 Type Requirements

- SupplierCategory interface
- Methods to handle category assignments

---

## 5. Request Actions Analysis

### ✅ Covered Actions

- createRequest
- updateRequest
- deleteRequest
- publishRequest
- closeRequest
- cancelRequest
- extendDeadline
- uploadRequestAttachment
- deleteRequestAttachment
- selectOffer
- unselectOffer
- getRequestById
- getMyRequests
- searchRequests
- getRequestsByCategory
- getActiveRequests
- getRequestOffers
- incrementRequestViews

### ✅ Database Schema Support

All actions supported by `Request` table:

- `status` → supports publish/close/cancel
- `deadline` → supports extendDeadline
- `attachments` (JSON) → supports attachment management
- `selectedOfferId` → supports select/unselect offer
- `viewsCount` → supports view increment
- `offersCount` → supports offer counting
- `publishedAt`, `closedAt` → supports publish/close tracking

### ⚠️ Additional Actions to Consider

- `getRequestByNumber` - Get by requestNumber (unique identifier)
- `duplicateRequest` - Clone a request
- `archiveRequest` - Archive old requests
- `getRequestStatistics` - Get detailed statistics

### 📝 Type Requirements

- Request interface with all fields
- RequestAttachment interface
- RequestLocation interface
- RequestStatus enum (includes 'closed')

---

## 6. Offer Actions Analysis

### ✅ Covered Actions

- createOffer
- updateOffer
- withdrawOffer
- uploadOfferAttachment
- deleteOfferAttachment
- acceptOffer
- rejectOffer
- addClientNotes
- addAdminNotes
- flagOffer
- getOfferById
- getMyOffers
- getOffersByRequest
- compareOffers
- getOfferStatistics

### ✅ Database Schema Support

All actions supported by `Offer` table:

- `status` → supports accept/reject/withdraw
- `attachments` (JSON) → supports attachments
- `clientNotes`, `adminNotes` → supports notes
- `acceptedAt` → supports acceptance tracking

### ⚠️ Additional Actions to Consider

- `getOfferByNumber` - Get by offerNumber (unique identifier)
- `updateOfferStatus` - Generic status update
- `getOfferWarranty` - Get warranty details
- `extendOfferValidity` - Extend offer expiration

### 📝 Type Requirements

- Offer interface with all fields including offerNumber
- OfferAttachment interface
- OfferStatus enum

---

## 7. Project Actions Analysis

### ✅ Covered Actions

- createProject
- updateProjectStatus
- startProject
- completeProject
- cancelProject
- pauseProject
- resumeProject
- updateProgress
- uploadDeliveryProof
- approveDelivery
- rejectDelivery
- requestRevision
- addDeliveryNotes
- getProjectById
- getMyProjects
- getProjectsByStatus
- getActiveProjects
- getCompletedProjects
- getProjectTimeline
- getProjectStatistics

### ✅ Database Schema Support

All actions supported by `Project` table:

- `status` → supports all status changes
- `progress` → supports progress updates
- `deliveryProof` (JSON) → supports delivery proof
- `deliveryNotes` → supports delivery notes
- `approvedByClient`, `approvalDate` → supports approval
- `startDate`, `expectedEndDate`, `actualEndDate` → supports timeline

### ⚠️ Additional Actions to Consider

- `getProjectByNumber` - Get by projectNumber (unique identifier)
- `getProjectContract` - Get associated contract
- `getProjectPayments` - Get payment history
- `getProjectMilestones` - Get all milestones (separate entity)
- `getProjectFiles` - Get project files (if separate from milestones)

### 📝 Type Requirements

- Project interface with all fields
- ProjectStatus enum
- DeliveryProof interface
- ProjectMilestone interface (separate)

---

## 8. Contract Actions Analysis

### ✅ Covered Actions

- generateContract
- updateContract
- signContract
- signContractByClient
- signContractBySupplier
- cancelContract
- createContractVersion
- addCustomClause
- removeCustomClause
- getContractById
- getContractByProject
- getContractVersions
- downloadContract
- getContractStatus

### ✅ Database Schema Support

All actions supported by `Contract` table:

- `contractText`, `termsAndConditions` → supports contract content
- `clientSignature`, `supplierSignature` → supports signing
- `clientSignedAt`, `supplierSignedAt` → supports signature tracking
- `status` → supports status management
- `version` → supports versioning
- `customClauses` (JSON) → supports custom clauses

### ⚠️ Additional Actions to Consider

- `getContractByNumber` - Get by contractNumber (unique identifier)
- `requestContractRevision` - Request contract changes
- `approveContractRevision` - Approve revision
- `rejectContractRevision` - Reject revision
- `sendContractForSignature` - Send to signatories
- `remindContractSignature` - Send reminder

### 📝 Type Requirements

- Contract interface (MISSING - needs creation)
- ContractStatus enum
- ContractSignature interface

---

## 9. ProjectMilestone Actions Analysis

### ✅ Covered Actions

- createMilestone
- updateMilestone
- deleteMilestone
- completeMilestone
- approveMilestone
- rejectMilestone
- releaseMilestonePayment
- reorderMilestones
- uploadMilestoneAttachment
- getMilestoneById
- getProjectMilestones
- getPendingMilestones
- getCompletedMilestones
- getMilestoneProgress

### ✅ Database Schema Support

All actions supported by `ProjectMilestone` table:

- `status` → supports complete/approve/reject
- `milestoneNumber`, `sortOrder` → supports ordering
- `attachments` (JSON) → supports attachments
- `completedAt`, `approvedAt` → supports completion tracking
- `paymentReleased` → supports payment release tracking

### ✅ Complete

All milestone operations are covered.

### 📝 Type Requirements

- ProjectMilestone interface (needs update)
- MilestoneStatus enum
- MilestoneAttachment interface

---

## 10. Payment Actions Analysis

### ✅ Covered Actions

- initiatePayment
- processPayment
- confirmPayment
- cancelPayment
- refundPayment
- partialRefund
- releasePaymentToSupplier
- calculatePlatformFee
- getPaymentById
- getProjectPayments
- getMyPayments
- getPaymentHistory
- getPaymentStatistics
- getPendingPayments
- getFailedPayments

### ✅ Database Schema Support

All actions supported by `Payment` table:

- `paymentType`, `paymentStage`, `paymentMethod` → supports payment flow
- `status` → supports all payment states
- `platformFee`, `netAmount` → supports fee calculation
- `gatewayResponse` (JSON) → supports gateway integration
- `refundAmount`, `refundedAt` → supports refunds

### ⚠️ Additional Actions to Consider

- `getPaymentByTransactionId` - Get by transactionId (unique identifier)
- `retryPayment` - Retry failed payment
- `getPaymentReceipt` - Generate receipt
- `exportPaymentHistory` - Export payment history
- `getPaymentByMilestone` - Get payments for specific milestone

### 📝 Type Requirements

- Payment interface (needs major update)
- PaymentType, PaymentStage, PaymentMethod, PaymentStatus enums
- PaymentGatewayTransaction interface (separate entity)
- Refund interface (separate entity)

---

## 11. PaymentGatewayTransaction Actions Analysis

### ✅ Covered Actions

- createGatewayTransaction
- updateGatewayStatus
- handleWebhook
- retryFailedTransaction
- verifyTransaction
- getGatewayTransactionById
- getTransactionsByPayment
- getFailedTransactions
- getTransactionsByGateway

### ✅ Database Schema Support

All actions supported by `PaymentGatewayTransaction` table:

- `gatewayName`, `gatewayTransactionId` → supports gateway operations
- `status` → supports status tracking
- `requestPayload`, `responsePayload`, `webhookData` (JSON) → supports webhook handling
- `expiresAt` → supports expiration

### ✅ Complete

All gateway transaction operations are covered.

### 📝 Type Requirements

- PaymentGatewayTransaction interface (MISSING - needs creation)
- GatewayTransactionStatus enum

---

## 12. WalletTransaction Actions Analysis

### ✅ Covered Actions

- addFundsToWallet
- withdrawFromWallet
- transferFunds
- freezeFunds
- unfreezeFunds
- refundToWallet
- getWalletBalance
- getWalletTransactions
- getWalletStatement
- exportWalletStatement

### ✅ Database Schema Support

All actions supported by `WalletTransaction` table:

- `type` → supports different transaction types
- `referenceType`, `referenceId` → supports transaction references
- `balanceBefore`, `balanceAfter` → supports balance tracking
- `status` → supports transaction status

### ⚠️ Note on Freeze/Unfreeze

Database schema doesn't explicitly show frozen balance fields in User table. May need:

- Add `frozenBalance` field to User table, OR
- Track frozen amounts in WalletTransaction with special type

### 📝 Type Requirements

- WalletTransaction interface (needs creation/update)
- WalletTransactionType, WalletTransactionReferenceType, WalletTransactionStatus enums

---

## 13. VerificationDocument Actions Analysis

### ✅ Covered Actions

- uploadDocument
- updateDocument
- deleteDocument
- resubmitDocument
- reviewDocument
- approveDocument
- rejectDocument
- requestMoreInfo
- getDocumentById
- getUserDocuments
- getPendingDocuments
- getApprovedDocuments
- getExpiringSoonDocuments

### ✅ Database Schema Support

All actions supported by `VerificationDocument` table:

- `documentType` → supports different document types
- `documentUrl`, `backDocumentUrl` → supports document upload
- `status` → supports review workflow
- `reviewedBy`, `reviewedAt`, `reviewNotes` → supports review process
- `expiryDate` → supports expiration tracking
- `rejectionReason` → supports rejection

### ✅ Complete

All verification document operations are covered.

### 📝 Type Requirements

- VerificationDocument interface (MISSING - needs creation)
- DocumentType, DocumentStatus enums

---

## 14. Review Actions Analysis

### ✅ Covered Actions

- createReview
- updateReview
- deleteReview
- respondToReview
- markReviewAsHelpful
- markReviewAsNotHelpful
- reportReview
- verifyReview
- hideReview
- getReviewById
- getProjectReviews
- getUserReviews
- getSupplierReviews
- getAverageRating
- getReviewStatistics
- getTopRatedProjects

### ✅ Database Schema Support

All actions supported by `Review` table:

- `reviewType` → supports client-to-supplier and supplier-to-client
- `rating`, `qualityRating`, `communicationRating`, `timelinessRating`, `professionalismRating` → supports ratings
- `status` → supports review status (pending/published/hidden)
- `isVerified` → supports verification
- `response`, `respondedAt` → supports responses
- `helpfulCount`, `notHelpfulCount` → supports helpfulness

### ✅ Complete

All review operations are covered.

### 📝 Type Requirements

- Review interface (needs update)
- ReviewType, ReviewStatus enums
- Sub-rating fields need to be added

---

## 15. Conversation & Message Actions Analysis

### ✅ Covered Actions

- createConversation
- closeConversation
- archiveConversation
- unarchiveConversation
- muteConversation
- unmuteConversation
- sendMessage
- editMessage
- deleteMessage
- markAsRead
- markAllAsRead
- uploadMessageAttachment
- deleteMessageAttachment
- sendSystemMessage
- getConversationById
- getMyConversations
- getConversationMessages
- searchMessages
- getUnreadMessagesCount

### ✅ Database Schema Support

All actions supported by `Conversation` and `Message` tables:

- `requestId`, `offerId`, `projectId` → supports context-based conversations
- `participants` (JSON) → supports participant management
- `status` → supports archive/close (may need to map to status)
- `lastMessageId`, `lastMessageAt` → supports conversation tracking
- `messageType` → supports different message types
- `isRead`, `readAt` → supports read tracking
- `isSystemMessage` → supports system messages
- `attachments` (JSON) → supports attachments

### ⚠️ Additional Actions to Consider

- `getConversationsByRequest` - Get conversations for a request
- `getConversationsByOffer` - Get conversations for an offer
- `getConversationsByProject` - Get conversations for a project
- `addParticipant` - Add participant to conversation
- `removeParticipant` - Remove participant from conversation
- `getConversationParticipants` - Get all participants

### 📝 Type Requirements

- Conversation interface (needs update)
- Message interface (needs update)
- ConversationStatus enum
- MessageType enum
- Attachment interface

---

## 16. Notification Actions Analysis

### ✅ Covered Actions

- createNotification
- sendNotification
- markNotificationAsRead
- markAllNotificationsAsRead
- deleteNotification
- deleteAllNotifications
- getMyNotifications
- getUnreadNotifications
- getUnreadCount
- getNotificationsByType

### ✅ Database Schema Support

All actions supported by `Notification` table:

- `type` → supports different notification types
- `referenceType`, `referenceId` → supports notification context
- `actionUrl` → supports action links
- `isRead`, `readAt` → supports read tracking
- `channels` (JSON) → supports multi-channel delivery
- `sentVia` (JSON) → supports delivery tracking

### ⚠️ Additional Actions to Consider

- `getNotificationsByReference` - Get notifications for specific entity
- `markNotificationsAsReadByType` - Mark all notifications of type as read
- `getNotificationPreferences` - Get user notification preferences (from User table)
- `updateNotificationPreferences` - Update preferences (already in User actions)

### 📝 Type Requirements

- Notification interface (needs update)
- NotificationType enum
- NotificationChannels interface
- NotificationSentVia interface

---

## 17. Dispute Actions Analysis

### ✅ Covered Actions

- raiseDispute
- updateDispute
- resolveDispute
- closeDispute
- escalateDispute
- assignDisputeToAdmin
- uploadDisputeEvidence
- addDisputeMessage
- addInternalNote
- getDisputeById
- getMyDisputes
- getPendingDisputes
- getResolvedDisputes
- getDisputeMessages
- getDisputeStatistics

### ✅ Database Schema Support

All actions supported by `Dispute` and `DisputeMessage` tables:

- `disputeNumber` → supports unique identification
- `category` → supports dispute categorization
- `status` → supports dispute workflow
- `priority` → supports prioritization
- `evidence` (JSON) → supports evidence upload
- `resolution`, `resolvedBy`, `resolvedAt` → supports resolution
- `assignedTo` → supports admin assignment
- `isInternal` → supports internal notes

### ⚠️ Additional Actions to Consider

- `getDisputeByNumber` - Get by disputeNumber (unique identifier)
- `getDisputesByProject` - Get disputes for a project
- `getDisputesByPriority` - Filter by priority
- `requestDisputeInfo` - Request additional information
- `getDisputeTimeline` - Get dispute history

### 📝 Type Requirements

- Dispute interface (MISSING - needs creation)
- DisputeMessage interface (MISSING - needs creation)
- DisputeCategory, DisputeStatus, DisputePriority enums

---

## 18. OTPVerification Actions Analysis

### ✅ Covered Actions

- generateOTP
- sendOTP
- verifyOTP
- resendOTP
- expireOTP
- checkOTPValidity
- getOTPAttempts

### ✅ Database Schema Support

All actions supported by `OTPVerification` table:

- `otpCode` → supports OTP generation
- `purpose` → supports different OTP purposes
- `channel` → supports email/SMS
- `isUsed`, `usedAt` → supports usage tracking
- `expiresAt` → supports expiration
- `attemptCount`, `maxAttempts` → supports attempt limiting

### ✅ Complete

All OTP operations are covered.

### 📝 Type Requirements

- OTPVerification interface (MISSING - needs creation)
- OTPPurpose, OTPChannel enums

---

## 19. AuditLog Actions Analysis

### ✅ Covered Actions

- logAction
- logUserAction
- logSystemAction
- logSecurityEvent
- getAuditLogs
- getUserAuditLogs
- getAuditLogsByEntity
- getAuditLogsByAction
- searchAuditLogs
- exportAuditLogs

### ✅ Database Schema Support

All actions supported by `AuditLog` table:

- `userId` → supports user action logging
- `action`, `entityType`, `entityId` → supports action tracking
- `changes` (JSON) → supports change tracking
- `metadata` (JSON) → supports additional data
- `ipAddress`, `userAgent` → supports security tracking

### ✅ Complete

All audit log operations are covered.

### 📝 Type Requirements

- AuditLog interface (MISSING - needs creation)

---

## 20. ContentPage Actions Analysis

### ✅ Covered Actions

- createPage
- updatePage
- deletePage
- publishPage
- unpublishPage
- reorderPages
- getPageById
- getPageBySlug
- getAllPages
- getPublishedPages
- getPagesByType

### ✅ Database Schema Support

All actions supported by `ContentPage` table:

- `slug` → supports URL-friendly identifiers
- `titleAr`, `titleEn`, `contentAr`, `contentEn` → supports bilingual content
- `pageType` → supports different page types
- `status` → supports publish/unpublish
- `displayOrder` → supports reordering
- `isPublished`, `publishedAt` → supports publishing
- `metaDescription`, `metaKeywords` → supports SEO

### ✅ Complete

All content page operations are covered.

### 📝 Type Requirements

- ContentPage interface (MISSING - needs creation)
- PageType, PageStatus enums

---

## 21. FAQ Actions Analysis

### ✅ Covered Actions

- createFAQ
- updateFAQ
- deleteFAQ
- publishFAQ
- unpublishFAQ
- reorderFAQs
- markFAQAsHelpful
- markFAQAsNotHelpful
- incrementFAQViews
- getFAQById
- getAllFAQs
- getFAQsByCategory
- searchFAQs
- getPopularFAQs

### ✅ Database Schema Support

All actions supported by `FAQ` table:

- `questionAr`, `questionEn`, `answerAr`, `answerEn` → supports bilingual FAQ
- `categoryId` → supports categorization
- `displayOrder` → supports reordering
- `isPublished` → supports publish/unpublish
- `viewCount`, `helpfulCount`, `notHelpfulCount` → supports interaction tracking

### ✅ Complete

All FAQ operations are covered.

### 📝 Type Requirements

- FAQ interface (MISSING - needs creation)

---

## 22. SystemSetting Actions Analysis

### ✅ Covered Actions

- createSetting
- updateSetting
- deleteSetting
- resetSettingToDefault
- bulkUpdateSettings
- getSettingByKey
- getAllSettings
- getPublicSettings
- getSettingsByCategory

### ✅ Database Schema Support

All actions supported by `SystemSetting` table:

- `settingKey`, `settingValue` → supports key-value storage
- `dataType` → supports type validation
- `category` → supports categorization
- `isPublic` → supports public/private settings
- `isEditable` → supports edit permissions

### ✅ Complete

All system setting operations are covered.

### 📝 Type Requirements

- SystemSetting interface (MISSING - needs creation)
- SettingDataType enum

---

## 23. PlatformCommission Actions Analysis

### ✅ Covered Actions

- createCommissionRule
- updateCommissionRule
- deleteCommissionRule
- activateCommissionRule
- deactivateCommissionRule
- calculateCommission
- applyCommission
- getCommissionById
- getAllCommissions
- getActiveCommissions
- getCommissionByCategory
- getCommissionStatistics

### ✅ Database Schema Support

All actions supported by `PlatformCommission` table:

- `categoryId`, `userType` → supports rule targeting
- `minAmount`, `maxAmount` → supports amount ranges
- `commissionType`, `commissionValue` → supports commission calculation
- `isActive` → supports activation
- `effectiveFrom`, `effectiveTo` → supports time-based rules

### ✅ Complete

All commission operations are covered.

### 📝 Type Requirements

- PlatformCommission interface (MISSING - needs creation)
- CommissionType enum

---

## 24. Refund Actions Analysis

### ✅ Covered Actions

- requestRefund
- processRefund
- approveRefund
- rejectRefund
- cancelRefund
- completeRefund
- getRefundById
- getMyRefunds
- getPendingRefunds
- getApprovedRefunds
- getRefundStatistics

### ✅ Database Schema Support

All actions supported by `Refund` table:

- `refundNumber` → supports unique identification
- `paymentId` → supports payment reference
- `requestedBy`, `approvedBy` → supports workflow
- `amount`, `reason` → supports refund details
- `status` → supports refund workflow
- `refundMethod` → supports refund method
- `gatewayRefundId` → supports gateway integration
- `processedAt`, `rejectionReason` → supports processing

### ⚠️ Additional Actions to Consider

- `getRefundByNumber` - Get by refundNumber (unique identifier)
- `getRefundsByPayment` - Get refunds for a payment

### 📝 Type Requirements

- Refund interface (MISSING - needs creation)
- RefundStatus, RefundMethod enums

---

## 25. SavedSearch Actions Analysis

### ✅ Covered Actions

- saveSearch
- updateSavedSearch
- deleteSavedSearch
- enableNotifications
- disableNotifications
- executeSavedSearch
- getSavedSearchById
- getMySavedSearches
- getSearchResults

### ✅ Database Schema Support

All actions supported by `SavedSearch` table:

- `searchName` → supports named searches
- `filters` (JSON) → supports search filters
- `notifyOnMatch` → supports notification preferences
- `lastNotifiedAt` → supports notification tracking

### ✅ Complete

All saved search operations are covered.

### 📝 Type Requirements

- SavedSearch interface (MISSING - needs creation)

---

## 26. Bookmark Actions Analysis

### ✅ Covered Actions

- addBookmark
- removeBookmark
- updateBookmarkNotes
- clearAllBookmarks
- getMyBookmarks
- getBookmarksByType
- checkIsBookmarked

### ✅ Database Schema Support

All actions supported by `Bookmark` table:

- `referenceType`, `referenceId` → supports bookmarking different entities
- `notes` → supports bookmark notes

### ✅ Complete

All bookmark operations are covered.

### 📝 Type Requirements

- Bookmark interface (MISSING - needs creation)
- BookmarkReferenceType enum

---

## 27. Report Actions Analysis

### ✅ Covered Actions

- submitReport
- updateReport
- reviewReport
- resolveReport
- dismissReport
- takeActionOnReport
- getReportById
- getMyReports
- getPendingReports
- getResolvedReports
- getReportsByType
- getReportStatistics

### ✅ Database Schema Support

All actions supported by `Report` table:

- `reportedEntityType`, `reportedEntityId` → supports reporting different entities
- `reportedUserId` → supports user reporting
- `reason` → supports reporting reasons
- `description`, `evidence` (JSON) → supports report details
- `status` → supports report workflow
- `reviewedBy`, `reviewedAt`, `actionTaken` → supports review process

### ✅ Complete

All report operations are covered.

### 📝 Type Requirements

- Report interface (MISSING - needs creation)
- ReportEntityType, ReportReason, ReportStatus enums

---

## 28. PromotionCampaign Actions Analysis

### ✅ Covered Actions

- createPromotion
- updatePromotion
- deletePromotion
- activatePromotion
- deactivatePromotion
- extendPromotion
- applyPromoCode
- validatePromoCode
- removePromoCode
- getPromotionById
- getAllPromotions
- getActivePromotions
- getPromotionByCode
- getPromotionStatistics

### ✅ Database Schema Support

All actions supported by `PromotionCampaign` table:

- `campaignCode` → supports promo code lookup
- `nameAr`, `nameEn` → supports bilingual names
- `discountType`, `discountValue` → supports discount calculation
- `minPurchaseAmount`, `maxDiscountAmount` → supports discount limits
- `usageLimit`, `usageCount` → supports usage tracking
- `userType`, `categoryId` → supports targeting
- `startDate`, `endDate`, `isActive` → supports activation

### ⚠️ Additional Actions to Consider

- `getPromotionUsage` - Get usage details (requires PromotionUsage table)
- `getUserPromotionHistory` - Get user's promotion usage
- `checkPromotionEligibility` - Check if user/category is eligible

### 📝 Type Requirements

- PromotionCampaign interface (MISSING - needs creation)
- PromotionUsage interface (MISSING - needs creation)
- DiscountType enum

---

## 29. Subscription Actions Analysis

### ✅ Covered Actions

- createSubscription
- updateSubscription
- cancelSubscription
- renewSubscription
- upgradeSubscription
- downgradeSubscription
- pauseSubscription
- resumeSubscription
- getSubscriptionById
- getMySubscription
- getSubscriptionHistory
- getActiveSubscriptions
- getExpiringSubscriptions
- getSubscriptionStatistics

### ✅ Database Schema Support

All actions supported by `Subscription` table:

- `planName`, `planType` → supports plan management
- `features` (JSON) → supports feature sets
- `price`, `billingCycle` → supports pricing
- `status` → supports subscription lifecycle
- `startDate`, `endDate` → supports time tracking
- `autoRenew` → supports auto-renewal
- `paymentMethod`, `lastPaymentDate`, `nextPaymentDate` → supports payment tracking
- `cancelledAt`, `cancellationReason` → supports cancellation

### ✅ Complete

All subscription operations are covered.

### 📝 Type Requirements

- Subscription interface (MISSING - needs creation)
- SubscriptionPlanType, BillingCycle, SubscriptionStatus enums

---

## 30. Dashboard & Reports Actions Analysis

### ✅ Covered Actions (Admin)

- getOverviewStatistics
- getRevenueReport
- getUserGrowthReport
- getProjectsReport
- getPaymentsReport
- getDisputesReport
- getPerformanceMetrics
- getTopSuppliers
- getTopClients
- getCategoryPerformance
- exportReport

### ✅ Covered Actions (User)

- getMyDashboard
- getMyEarnings
- getMySpending
- getMyProjectsStatistics
- getMyPerformanceMetrics

### ✅ Database Schema Support

These actions aggregate data from multiple tables:

- User, Project, Payment, Review, Dispute tables
- Statistics calculated from existing data
- No additional schema requirements

### ⚠️ Performance Considerations

- These actions may require database views or materialized views
- Consider caching for frequently accessed statistics
- May need dedicated statistics tables for performance

### 📝 Type Requirements

- Dashboard statistics interfaces (MISSING - needs creation)
- Report interfaces (MISSING - needs creation)

---

## 31. Real-time & Notifications Actions Analysis

### ✅ Covered Actions

- subscribeToNotifications
- unsubscribeFromNotifications
- sendPushNotification
- sendEmailNotification
- sendSMSNotification

### ✅ Database Schema Support

- Notification table supports notification storage
- User.notificationPreferences supports preferences
- Real-time functionality requires WebSocket/SSE implementation
- External services required for push/email/SMS

### ⚠️ Implementation Notes

- These are system-level actions, not directly database operations
- Require integration with notification services
- WebSocket/SSE for real-time updates

### 📝 Type Requirements

- Notification subscription interfaces
- Real-time event types

---

## 32. Security & Authentication Actions Analysis

### ✅ Covered Actions

- enable2FA
- disable2FA
- verify2FACode
- generateBackupCodes
- suspendUser
- unsuspendUser
- banUser
- unbanUser
- logoutAllDevices
- revokeAccessToken

### ⚠️ Database Schema Gaps

- `User.status` supports suspend/ban (inactive/suspended/banned)
- 2FA fields not explicitly in User table - may need:
  - `twoFactorEnabled` (boolean)
  - `twoFactorSecret` (string)
  - `backupCodes` (JSON array)
- Device/session tracking not in User table - may need:
  - `Sessions` table for device management
  - `AccessToken` table for token revocation

### 📝 Type Requirements

- 2FA interfaces (if implemented)
- Session/Device interfaces (if implemented)

---

## Summary of Gaps and Recommendations

### 🔴 Critical Missing Types

1. Contract types (completely missing)
2. Dispute types (completely missing)
3. VerificationDocument types (completely missing)
4. OTPVerification types (completely missing)
5. AuditLog types (completely missing)
6. ContentPage types (completely missing)
7. FAQ types (completely missing)
8. SystemSetting types (completely missing)
9. PlatformCommission types (completely missing)
10. Refund types (completely missing)
11. SavedSearch types (completely missing)
12. Bookmark types (completely missing)
13. Report types (completely missing)
14. PromotionCampaign types (completely missing)
15. Subscription types (completely missing)

### 🟡 Types Needing Major Updates

1. User types (missing many fields)
2. Payment types (very basic, needs major expansion)
3. WalletTransaction types (missing)
4. PaymentGatewayTransaction types (missing)
5. Review types (missing sub-ratings and many fields)
6. Message/Conversation types (missing many fields)
7. Notification types (missing many fields)
8. Project types (missing many fields)
9. Request types (missing many fields)
10. Offer types (missing many fields)

### 🟢 Minor Updates Needed

1. SupplierProfile types (needs structure updates)
2. Category types (needs creation but straightforward)
3. ProjectMilestone types (needs field additions)

### 📋 Action Alignment Status

- ✅ **Actions.md is comprehensive** - covers all major operations
- ✅ **Actions align with database schema** - no major misalignments
- ⚠️ **Some actions reference fields not yet in types** - types need to be created/updated
- ⚠️ **Some database features not fully utilized** - consider additional actions

### 🎯 Priority Recommendations

1. **Phase 1**: Create missing critical types (Contract, Dispute, Payment-related)
2. **Phase 2**: Update core types (User, Request, Offer, Project)
3. **Phase 3**: Create supporting types (Verification, OTP, Audit, Content)
4. **Phase 4**: Create extended types (Promotion, Subscription, etc.)

---

## Conclusion

The `actions.md` file is well-aligned with the database schema and provides comprehensive coverage of all required operations. The main gap is in TypeScript type definitions, which need to be created or updated to support all these actions.

**Next Steps:**

1. Use `TYPE_UPDATES_REQUIRED.md` to update/create types
2. Use `actions.md` as reference for API endpoint implementation
3. Ensure types support all actions listed in `actions.md`
4. Update API client files to match actions structure
