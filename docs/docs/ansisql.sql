-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/TrTZ9i
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "User" (
    "id" uuid  NOT NULL ,
    "userType" enum  NOT NULL ,
    "email" string  NOT NULL ,
    "phone" string  NOT NULL ,
    "passwordHash" string  NOT NULL ,
    "isEmailVerified" boolean  NOT NULL ,
    "isPhoneVerified" boolean  NOT NULL ,
    "status" enum  NOT NULL ,
    "fullName" string  NOT NULL ,
    "avatar" string  NOT NULL ,
    "dateOfBirth" date  NULL ,
    "nationalId" string  NULL ,
    "companyName" string  NULL ,
    "commercialRegister" string  NULL ,
    "taxNumber" string  NULL ,
    "averageRating" decimal  NOT NULL ,
    "totalReviews" int  NOT NULL ,
    "completedProjects" int  NOT NULL ,
    "walletBalance" decimal  NOT NULL ,
    "address" json  NOT NULL ,
    "notificationPreferences" json  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    "lastLoginAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "SupplierProfile" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "categories" json  NOT NULL ,
    "serviceDescription" text  NOT NULL ,
    "portfolio" json  NOT NULL ,
    "certifications" json  NOT NULL ,
    "workingHours" json  NOT NULL ,
    "responseTime" int  NOT NULL ,
    "acceptanceRate" decimal  NOT NULL ,
    "onTimeDelivery" decimal  NOT NULL ,
    "isVerified" boolean  NOT NULL ,
    "verificationDate" timestamp  NULL ,
    "verificationNotes" text  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_SupplierProfile" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Category" (
    "id" uuid  NOT NULL ,
    "nameAr" string  NOT NULL ,
    "nameEn" string  NOT NULL ,
    "parentId" uuid  NULL ,
    "icon" string  NOT NULL ,
    "description" text  NOT NULL ,
    "isActive" boolean  NOT NULL ,
    "sortOrder" int  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Category" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "SupplierCategory" (
    "id" uuid  NOT NULL ,
    "supplierId" uuid  NOT NULL ,
    "categoryId" uuid  NOT NULL ,
    "isPrimary" boolean  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_SupplierCategory" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Request" (
    "id" uuid  NOT NULL ,
    "requestNumber" string  NOT NULL ,
    "clientId" uuid  NOT NULL ,
    "title" string  NOT NULL ,
    "description" text  NOT NULL ,
    "categoryId" uuid  NOT NULL ,
    "budgetMin" decimal  NULL ,
    "budgetMax" decimal  NULL ,
    "expectedDuration" int  NOT NULL ,
    "deadline" date  NOT NULL ,
    "preferredStartDate" date  NULL ,
    "attachments" json  NOT NULL ,
    "status" enum  NOT NULL ,
    "selectedOfferId" uuid  NULL ,
    "viewsCount" int  NOT NULL ,
    "offersCount" int  NOT NULL ,
    "requiresOnSiteVisit" boolean  NOT NULL ,
    "location" json  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    "publishedAt" timestamp  NULL ,
    "closedAt" timestamp  NULL ,
    CONSTRAINT "pk_Request" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Offer" (
    "id" uuid  NOT NULL ,
    "offerNumber" string  NOT NULL ,
    "requestId" uuid  NOT NULL ,
    "supplierId" uuid  NOT NULL ,
    "proposedPrice" decimal  NOT NULL ,
    "estimatedDuration" int  NOT NULL ,
    "startDate" date  NOT NULL ,
    "technicalProposal" text  NOT NULL ,
    "deliverables" text  NOT NULL ,
    "paymentTerms" text  NOT NULL ,
    "attachments" json  NOT NULL ,
    "status" enum  NOT NULL ,
    "warrantyPeriod" int  NULL ,
    "warrantyDetails" text  NULL ,
    "clientNotes" text  NULL ,
    "adminNotes" text  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    "acceptedAt" timestamp  NULL ,
    CONSTRAINT "pk_Offer" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "uk_Offer_offerNumber" UNIQUE (
        "offerNumber"
    )
)

GO

CREATE TABLE "Project" (
    "id" uuid  NOT NULL ,
    "projectNumber" string  NOT NULL ,
    "requestId" uuid  NOT NULL ,
    "offerId" uuid  NOT NULL ,
    "clientId" uuid  NOT NULL ,
    "supplierId" uuid  NOT NULL ,
    "contractId" uuid  NULL ,
    "totalAmount" decimal  NOT NULL ,
    "depositAmount" decimal  NOT NULL ,
    "finalAmount" decimal  NOT NULL ,
    "status" enum  NOT NULL ,
    "startDate" date  NOT NULL ,
    "expectedEndDate" date  NOT NULL ,
    "actualEndDate" date  NULL ,
    "deliveryProof" json  NOT NULL ,
    "deliveryNotes" text  NOT NULL ,
    "approvedByClient" boolean  NOT NULL ,
    "approvalDate" timestamp  NULL ,
    "progress" int  NOT NULL ,
    "milestones" json  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Project" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "uk_Project_projectNumber" UNIQUE (
        "projectNumber"
    )
)

GO

CREATE TABLE "Contract" (
    "id" uuid  NOT NULL ,
    "contractNumber" string  NOT NULL ,
    "projectId" uuid  NOT NULL ,
    "contractText" text  NOT NULL ,
    "termsAndConditions" text  NOT NULL ,
    "paymentTerms" text  NOT NULL ,
    "deliverables" text  NOT NULL ,
    "warrantyTerms" text  NULL ,
    "clientSignature" string  NULL ,
    "supplierSignature" string  NULL ,
    "clientSignedAt" timestamp  NULL ,
    "supplierSignedAt" timestamp  NULL ,
    "status" enum  NOT NULL ,
    "version" int  NOT NULL ,
    "templateUsed" string  NULL ,
    "customClauses" json  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Contract" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "uk_Contract_contractNumber" UNIQUE (
        "contractNumber"
    )
)

GO

CREATE TABLE "ProjectMilestone" (
    "id" uuid  NOT NULL ,
    "projectId" uuid  NOT NULL ,
    "milestoneNumber" int  NOT NULL ,
    "title" string  NOT NULL ,
    "description" text  NOT NULL ,
    "amount" decimal  NOT NULL ,
    "dueDate" date  NOT NULL ,
    "status" enum  NOT NULL ,
    "deliverables" text  NULL ,
    "attachments" json  NULL ,
    "completedAt" timestamp  NULL ,
    "approvedAt" timestamp  NULL ,
    "paymentReleased" boolean  NOT NULL ,
    "notes" text  NULL ,
    "sortOrder" int  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_ProjectMilestone" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Payment" (
    "id" uuid  NOT NULL ,
    "transactionId" string  NOT NULL ,
    "projectId" uuid  NOT NULL ,
    "milestoneId" uuid  NULL ,
    "payerId" uuid  NOT NULL ,
    "receiverId" uuid  NOT NULL ,
    "amount" decimal  NOT NULL ,
    "currency" string  NOT NULL ,
    "paymentType" enum  NOT NULL ,
    "paymentStage" enum  NOT NULL ,
    "paymentMethod" enum  NOT NULL ,
    "paymentGateway" string  NOT NULL ,
    "status" enum  NOT NULL ,
    "platformFee" decimal  NOT NULL ,
    "netAmount" decimal  NOT NULL ,
    "gatewayResponse" json  NOT NULL ,
    "ipAddress" string  NOT NULL ,
    "userAgent" string  NOT NULL ,
    "notes" text  NULL ,
    "failureReason" text  NULL ,
    "refundAmount" decimal  NULL ,
    "refundedAt" timestamp  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    "completedAt" timestamp  NULL ,
    CONSTRAINT "pk_Payment" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "uk_Payment_transactionId" UNIQUE (
        "transactionId"
    )
)

GO

CREATE TABLE "PaymentGatewayTransaction" (
    "id" uuid  NOT NULL ,
    "paymentId" uuid  NOT NULL ,
    "gatewayName" string  NOT NULL ,
    "gatewayTransactionId" string  NOT NULL ,
    "gatewayOrderId" string  NOT NULL ,
    "amount" decimal  NOT NULL ,
    "currency" string  NOT NULL ,
    "status" enum  NOT NULL ,
    "requestPayload" json  NOT NULL ,
    "responsePayload" json  NOT NULL ,
    "webhookData" json  NULL ,
    "cardType" string  NULL ,
    "cardLastFour" string  NULL ,
    "customerEmail" string  NULL ,
    "customerPhone" string  NULL ,
    "successUrl" string  NULL ,
    "failureUrl" string  NULL ,
    "callbackUrl" string  NULL ,
    "expiresAt" timestamp  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_PaymentGatewayTransaction" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "uk_PaymentGatewayTransaction_gatewayTransactionId" UNIQUE (
        "gatewayTransactionId"
    )
)

GO

CREATE TABLE "WalletTransaction" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "amount" decimal  NOT NULL ,
    "type" enum  NOT NULL ,
    "referenceType" enum  NOT NULL ,
    "referenceId" uuid  NOT NULL ,
    "balanceBefore" decimal  NOT NULL ,
    "balanceAfter" decimal  NOT NULL ,
    "description" text  NOT NULL ,
    "status" enum  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_WalletTransaction" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "VerificationDocument" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "documentType" enum  NOT NULL ,
    "documentNumber" string  NULL ,
    "documentUrl" string  NOT NULL ,
    "backDocumentUrl" string  NULL ,
    "status" enum  NOT NULL ,
    "submittedAt" timestamp  NOT NULL ,
    "reviewedAt" timestamp  NULL ,
    "reviewedBy" uuid  NULL ,
    "reviewNotes" text  NULL ,
    "expiryDate" date  NULL ,
    "rejectionReason" text  NULL ,
    "metadata" json  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_VerificationDocument" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Review" (
    "id" uuid  NOT NULL ,
    "projectId" uuid  NOT NULL ,
    "reviewerId" uuid  NOT NULL ,
    "reviewedId" uuid  NOT NULL ,
    "rating" int  NOT NULL ,
    "reviewType" enum  NOT NULL ,
    "title" string  NOT NULL ,
    "comment" text  NOT NULL ,
    "qualityRating" int  NULL ,
    "communicationRating" int  NULL ,
    "timelinessRating" int  NULL ,
    "professionalismRating" int  NULL ,
    "status" enum  NOT NULL ,
    "isVerified" boolean  NOT NULL ,
    "response" text  NULL ,
    "respondedAt" timestamp  NULL ,
    "helpfulCount" int  NOT NULL ,
    "notHelpfulCount" int  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Review" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Conversation" (
    "id" uuid  NOT NULL ,
    "requestId" uuid  NULL ,
    "offerId" uuid  NULL ,
    "projectId" uuid  NULL ,
    "participants" json  NOT NULL ,
    "lastMessageId" uuid  NULL ,
    "lastMessageAt" timestamp  NOT NULL ,
    "status" enum  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Conversation" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Message" (
    "id" uuid  NOT NULL ,
    "conversationId" uuid  NOT NULL ,
    "senderId" uuid  NOT NULL ,
    "content" text  NOT NULL ,
    "messageType" enum  NOT NULL ,
    "attachments" json  NOT NULL ,
    "isRead" boolean  NOT NULL ,
    "readAt" timestamp  NULL ,
    "isSystemMessage" boolean  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Message" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Notification" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "title" string  NOT NULL ,
    "body" text  NOT NULL ,
    "type" enum  NOT NULL ,
    "referenceType" string  NULL ,
    "referenceId" uuid  NULL ,
    "actionUrl" string  NULL ,
    "isRead" boolean  NOT NULL ,
    "readAt" timestamp  NULL ,
    "channels" json  NOT NULL ,
    "sentVia" json  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Notification" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Dispute" (
    "id" uuid  NOT NULL ,
    "disputeNumber" string  NOT NULL ,
    "projectId" uuid  NOT NULL ,
    "raisedBy" uuid  NOT NULL ,
    "against" uuid  NOT NULL ,
    "subject" string  NOT NULL ,
    "description" text  NOT NULL ,
    "category" enum  NOT NULL ,
    "evidence" json  NOT NULL ,
    "status" enum  NOT NULL ,
    "resolution" text  NULL ,
    "resolvedBy" uuid  NULL ,
    "resolvedAt" timestamp  NULL ,
    "assignedTo" uuid  NULL ,
    "priority" enum  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Dispute" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "uk_Dispute_disputeNumber" UNIQUE (
        "disputeNumber"
    )
)

GO

CREATE TABLE "DisputeMessage" (
    "id" uuid  NOT NULL ,
    "disputeId" uuid  NOT NULL ,
    "senderId" uuid  NOT NULL ,
    "messageType" enum  NOT NULL ,
    "content" text  NOT NULL ,
    "attachments" json  NULL ,
    "isInternal" boolean  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_DisputeMessage" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "OTPVerification" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "otpCode" string  NOT NULL ,
    "purpose" enum  NOT NULL ,
    "channel" enum  NOT NULL ,
    "isUsed" boolean  NOT NULL ,
    "expiresAt" timestamp  NOT NULL ,
    "attemptCount" int  NOT NULL ,
    "maxAttempts" int  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "usedAt" timestamp  NULL ,
    CONSTRAINT "pk_OTPVerification" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "AuditLog" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NULL ,
    "action" string  NOT NULL ,
    "entityType" string  NOT NULL ,
    "entityId" uuid  NULL ,
    "changes" json  NOT NULL ,
    "metadata" json  NOT NULL ,
    "ipAddress" string  NOT NULL ,
    "userAgent" string  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_AuditLog" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "ContentPage" (
    "id" uuid  NOT NULL ,
    "slug" string  NOT NULL ,
    "titleAr" string  NOT NULL ,
    "titleEn" string  NOT NULL ,
    "contentAr" text  NOT NULL ,
    "contentEn" text  NOT NULL ,
    "pageType" enum  NOT NULL ,
    "status" enum  NOT NULL ,
    "metaDescription" text  NULL ,
    "metaKeywords" string  NULL ,
    "displayOrder" int  NOT NULL ,
    "isPublished" boolean  NOT NULL ,
    "publishedAt" timestamp  NULL ,
    "createdBy" uuid  NOT NULL ,
    "updatedBy" uuid  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_ContentPage" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "FAQ" (
    "id" uuid  NOT NULL ,
    "questionAr" string  NOT NULL ,
    "questionEn" string  NOT NULL ,
    "answerAr" text  NOT NULL ,
    "answerEn" text  NOT NULL ,
    "categoryId" uuid  NULL ,
    "displayOrder" int  NOT NULL ,
    "isPublished" boolean  NOT NULL ,
    "viewCount" int  NOT NULL ,
    "helpfulCount" int  NOT NULL ,
    "notHelpfulCount" int  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_FAQ" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "SystemSetting" (
    "id" uuid  NOT NULL ,
    "settingKey" string  NOT NULL ,
    "settingValue" text  NOT NULL ,
    "dataType" enum  NOT NULL ,
    "category" string  NOT NULL ,
    "description" text  NULL ,
    "isPublic" boolean  NOT NULL ,
    "isEditable" boolean  NOT NULL ,
    "updatedBy" uuid  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_SystemSetting" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "PlatformCommission" (
    "id" uuid  NOT NULL ,
    "categoryId" uuid  NULL ,
    "userType" enum  NULL ,
    "minAmount" decimal  NULL ,
    "maxAmount" decimal  NULL ,
    "commissionType" enum  NOT NULL ,
    "commissionValue" decimal  NOT NULL ,
    "isActive" boolean  NOT NULL ,
    "effectiveFrom" date  NOT NULL ,
    "effectiveTo" date  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_PlatformCommission" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Refund" (
    "id" uuid  NOT NULL ,
    "refundNumber" string  NOT NULL ,
    "paymentId" uuid  NOT NULL ,
    "requestedBy" uuid  NOT NULL ,
    "approvedBy" uuid  NULL ,
    "amount" decimal  NOT NULL ,
    "reason" text  NOT NULL ,
    "status" enum  NOT NULL ,
    "refundMethod" enum  NOT NULL ,
    "gatewayRefundId" string  NULL ,
    "processedAt" timestamp  NULL ,
    "rejectionReason" text  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Refund" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "uk_Refund_refundNumber" UNIQUE (
        "refundNumber"
    )
)

GO

CREATE TABLE "SavedSearch" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "searchName" string  NOT NULL ,
    "filters" json  NOT NULL ,
    "notifyOnMatch" boolean  NOT NULL ,
    "lastNotifiedAt" timestamp  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_SavedSearch" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Bookmark" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "referenceType" enum  NOT NULL ,
    "referenceId" uuid  NOT NULL ,
    "notes" text  NULL ,
    "createdAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Bookmark" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Report" (
    "id" uuid  NOT NULL ,
    "reportedBy" uuid  NOT NULL ,
    "reportedEntityType" enum  NOT NULL ,
    "reportedEntityId" uuid  NOT NULL ,
    "reportedUserId" uuid  NULL ,
    "reason" enum  NOT NULL ,
    "description" text  NOT NULL ,
    "evidence" json  NULL ,
    "status" enum  NOT NULL ,
    "reviewedBy" uuid  NULL ,
    "reviewedAt" timestamp  NULL ,
    "actionTaken" text  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Report" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "PromotionCampaign" (
    "id" uuid  NOT NULL ,
    "campaignCode" string  NOT NULL ,
    "nameAr" string  NOT NULL ,
    "nameEn" string  NOT NULL ,
    "discountType" enum  NOT NULL ,
    "discountValue" decimal  NOT NULL ,
    "minPurchaseAmount" decimal  NULL ,
    "maxDiscountAmount" decimal  NULL ,
    "usageLimit" int  NULL ,
    "usageCount" int  NOT NULL ,
    "userType" enum  NULL ,
    "categoryId" uuid  NULL ,
    "startDate" timestamp  NOT NULL ,
    "endDate" timestamp  NOT NULL ,
    "isActive" boolean  NOT NULL ,
    "createdBy" uuid  NOT NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_PromotionCampaign" PRIMARY KEY (
        "id"
    ),
    CONSTRAINT "uk_PromotionCampaign_campaignCode" UNIQUE (
        "campaignCode"
    )
)

GO

CREATE TABLE "PromotionUsage" (
    "id" uuid  NOT NULL ,
    "promotionId" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "projectId" uuid  NULL ,
    "discountAmount" decimal  NOT NULL ,
    "usedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_PromotionUsage" PRIMARY KEY (
        "id"
    )
)

GO

CREATE TABLE "Subscription" (
    "id" uuid  NOT NULL ,
    "userId" uuid  NOT NULL ,
    "planName" string  NOT NULL ,
    "planType" enum  NOT NULL ,
    "features" json  NOT NULL ,
    "price" decimal  NOT NULL ,
    "billingCycle" enum  NOT NULL ,
    "status" enum  NOT NULL ,
    "startDate" date  NOT NULL ,
    "endDate" date  NOT NULL ,
    "autoRenew" boolean  NOT NULL ,
    "paymentMethod" string  NULL ,
    "lastPaymentDate" timestamp  NULL ,
    "nextPaymentDate" timestamp  NULL ,
    "cancelledAt" timestamp  NULL ,
    "cancellationReason" text  NULL ,
    "createdAt" timestamp  NOT NULL ,
    "updatedAt" timestamp  NOT NULL ,
    CONSTRAINT "pk_Subscription" PRIMARY KEY (
        "id"
    )
)

GO

ALTER TABLE "SupplierProfile" ADD CONSTRAINT "fk_SupplierProfile_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Category" ADD CONSTRAINT "fk_Category_parentId" FOREIGN KEY("parentId")
REFERENCES "Category" ("id")
GO

ALTER TABLE "SupplierCategory" ADD CONSTRAINT "fk_SupplierCategory_supplierId" FOREIGN KEY("supplierId")
REFERENCES "User" ("id")
GO

ALTER TABLE "SupplierCategory" ADD CONSTRAINT "fk_SupplierCategory_categoryId" FOREIGN KEY("categoryId")
REFERENCES "Category" ("id")
GO

ALTER TABLE "Request" ADD CONSTRAINT "fk_Request_clientId" FOREIGN KEY("clientId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Request" ADD CONSTRAINT "fk_Request_categoryId" FOREIGN KEY("categoryId")
REFERENCES "Category" ("id")
GO

ALTER TABLE "Request" ADD CONSTRAINT "fk_Request_selectedOfferId" FOREIGN KEY("selectedOfferId")
REFERENCES "Offer" ("id")
GO

ALTER TABLE "Offer" ADD CONSTRAINT "fk_Offer_requestId" FOREIGN KEY("requestId")
REFERENCES "Request" ("id")
GO

ALTER TABLE "Offer" ADD CONSTRAINT "fk_Offer_supplierId" FOREIGN KEY("supplierId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Project" ADD CONSTRAINT "fk_Project_requestId" FOREIGN KEY("requestId")
REFERENCES "Request" ("id")
GO

ALTER TABLE "Project" ADD CONSTRAINT "fk_Project_offerId" FOREIGN KEY("offerId")
REFERENCES "Offer" ("id")
GO

ALTER TABLE "Project" ADD CONSTRAINT "fk_Project_clientId" FOREIGN KEY("clientId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Project" ADD CONSTRAINT "fk_Project_supplierId" FOREIGN KEY("supplierId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Project" ADD CONSTRAINT "fk_Project_contractId" FOREIGN KEY("contractId")
REFERENCES "Contract" ("id")
GO

ALTER TABLE "Contract" ADD CONSTRAINT "fk_Contract_projectId" FOREIGN KEY("projectId")
REFERENCES "Project" ("id")
GO

ALTER TABLE "ProjectMilestone" ADD CONSTRAINT "fk_ProjectMilestone_projectId" FOREIGN KEY("projectId")
REFERENCES "Project" ("id")
GO

ALTER TABLE "Payment" ADD CONSTRAINT "fk_Payment_projectId" FOREIGN KEY("projectId")
REFERENCES "Project" ("id")
GO

ALTER TABLE "Payment" ADD CONSTRAINT "fk_Payment_milestoneId" FOREIGN KEY("milestoneId")
REFERENCES "ProjectMilestone" ("id")
GO

ALTER TABLE "Payment" ADD CONSTRAINT "fk_Payment_payerId" FOREIGN KEY("payerId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Payment" ADD CONSTRAINT "fk_Payment_receiverId" FOREIGN KEY("receiverId")
REFERENCES "User" ("id")
GO

ALTER TABLE "PaymentGatewayTransaction" ADD CONSTRAINT "fk_PaymentGatewayTransaction_paymentId" FOREIGN KEY("paymentId")
REFERENCES "Payment" ("id")
GO

ALTER TABLE "WalletTransaction" ADD CONSTRAINT "fk_WalletTransaction_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "VerificationDocument" ADD CONSTRAINT "fk_VerificationDocument_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "VerificationDocument" ADD CONSTRAINT "fk_VerificationDocument_reviewedBy" FOREIGN KEY("reviewedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "Review" ADD CONSTRAINT "fk_Review_projectId" FOREIGN KEY("projectId")
REFERENCES "Project" ("id")
GO

ALTER TABLE "Review" ADD CONSTRAINT "fk_Review_reviewerId" FOREIGN KEY("reviewerId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Review" ADD CONSTRAINT "fk_Review_reviewedId" FOREIGN KEY("reviewedId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Conversation" ADD CONSTRAINT "fk_Conversation_requestId" FOREIGN KEY("requestId")
REFERENCES "Request" ("id")
GO

ALTER TABLE "Conversation" ADD CONSTRAINT "fk_Conversation_offerId" FOREIGN KEY("offerId")
REFERENCES "Offer" ("id")
GO

ALTER TABLE "Conversation" ADD CONSTRAINT "fk_Conversation_projectId" FOREIGN KEY("projectId")
REFERENCES "Project" ("id")
GO

ALTER TABLE "Conversation" ADD CONSTRAINT "fk_Conversation_lastMessageId" FOREIGN KEY("lastMessageId")
REFERENCES "Message" ("id")
GO

ALTER TABLE "Message" ADD CONSTRAINT "fk_Message_conversationId" FOREIGN KEY("conversationId")
REFERENCES "Conversation" ("id")
GO

ALTER TABLE "Message" ADD CONSTRAINT "fk_Message_senderId" FOREIGN KEY("senderId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Notification" ADD CONSTRAINT "fk_Notification_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Dispute" ADD CONSTRAINT "fk_Dispute_projectId" FOREIGN KEY("projectId")
REFERENCES "Project" ("id")
GO

ALTER TABLE "Dispute" ADD CONSTRAINT "fk_Dispute_raisedBy" FOREIGN KEY("raisedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "Dispute" ADD CONSTRAINT "fk_Dispute_against" FOREIGN KEY("against")
REFERENCES "User" ("id")
GO

ALTER TABLE "Dispute" ADD CONSTRAINT "fk_Dispute_resolvedBy" FOREIGN KEY("resolvedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "Dispute" ADD CONSTRAINT "fk_Dispute_assignedTo" FOREIGN KEY("assignedTo")
REFERENCES "User" ("id")
GO

ALTER TABLE "DisputeMessage" ADD CONSTRAINT "fk_DisputeMessage_disputeId" FOREIGN KEY("disputeId")
REFERENCES "Dispute" ("id")
GO

ALTER TABLE "DisputeMessage" ADD CONSTRAINT "fk_DisputeMessage_senderId" FOREIGN KEY("senderId")
REFERENCES "User" ("id")
GO

ALTER TABLE "OTPVerification" ADD CONSTRAINT "fk_OTPVerification_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "AuditLog" ADD CONSTRAINT "fk_AuditLog_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "ContentPage" ADD CONSTRAINT "fk_ContentPage_createdBy" FOREIGN KEY("createdBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "ContentPage" ADD CONSTRAINT "fk_ContentPage_updatedBy" FOREIGN KEY("updatedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "FAQ" ADD CONSTRAINT "fk_FAQ_categoryId" FOREIGN KEY("categoryId")
REFERENCES "Category" ("id")
GO

ALTER TABLE "SystemSetting" ADD CONSTRAINT "fk_SystemSetting_updatedBy" FOREIGN KEY("updatedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "PlatformCommission" ADD CONSTRAINT "fk_PlatformCommission_categoryId" FOREIGN KEY("categoryId")
REFERENCES "Category" ("id")
GO

ALTER TABLE "Refund" ADD CONSTRAINT "fk_Refund_paymentId" FOREIGN KEY("paymentId")
REFERENCES "Payment" ("id")
GO

ALTER TABLE "Refund" ADD CONSTRAINT "fk_Refund_requestedBy" FOREIGN KEY("requestedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "Refund" ADD CONSTRAINT "fk_Refund_approvedBy" FOREIGN KEY("approvedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "SavedSearch" ADD CONSTRAINT "fk_SavedSearch_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Bookmark" ADD CONSTRAINT "fk_Bookmark_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Report" ADD CONSTRAINT "fk_Report_reportedBy" FOREIGN KEY("reportedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "Report" ADD CONSTRAINT "fk_Report_reportedUserId" FOREIGN KEY("reportedUserId")
REFERENCES "User" ("id")
GO

ALTER TABLE "Report" ADD CONSTRAINT "fk_Report_reviewedBy" FOREIGN KEY("reviewedBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "PromotionCampaign" ADD CONSTRAINT "fk_PromotionCampaign_categoryId" FOREIGN KEY("categoryId")
REFERENCES "Category" ("id")
GO

ALTER TABLE "PromotionCampaign" ADD CONSTRAINT "fk_PromotionCampaign_createdBy" FOREIGN KEY("createdBy")
REFERENCES "User" ("id")
GO

ALTER TABLE "PromotionUsage" ADD CONSTRAINT "fk_PromotionUsage_promotionId" FOREIGN KEY("promotionId")
REFERENCES "PromotionCampaign" ("id")
GO

ALTER TABLE "PromotionUsage" ADD CONSTRAINT "fk_PromotionUsage_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

ALTER TABLE "PromotionUsage" ADD CONSTRAINT "fk_PromotionUsage_projectId" FOREIGN KEY("projectId")
REFERENCES "Project" ("id")
GO

ALTER TABLE "Subscription" ADD CONSTRAINT "fk_Subscription_userId" FOREIGN KEY("userId")
REFERENCES "User" ("id")
GO

CREATE INDEX "idx_User_status"
ON "User" ("status")
GO

CREATE INDEX "idx_Category_sortOrder"
ON "Category" ("sortOrder")
GO

CREATE INDEX "idx_SupplierCategory_supplierId"
ON "SupplierCategory" ("supplierId")
GO

CREATE INDEX "idx_SupplierCategory_categoryId"
ON "SupplierCategory" ("categoryId")
GO

CREATE INDEX "idx_Request_clientId"
ON "Request" ("clientId")
GO

CREATE INDEX "idx_Request_categoryId"
ON "Request" ("categoryId")
GO

CREATE INDEX "idx_Request_deadline"
ON "Request" ("deadline")
GO

CREATE INDEX "idx_Request_status"
ON "Request" ("status")
GO

CREATE INDEX "idx_Request_createdAt"
ON "Request" ("createdAt")
GO

CREATE INDEX "idx_Offer_requestId"
ON "Offer" ("requestId")
GO

CREATE INDEX "idx_Offer_supplierId"
ON "Offer" ("supplierId")
GO

CREATE INDEX "idx_Offer_status"
ON "Offer" ("status")
GO

CREATE INDEX "idx_Project_clientId"
ON "Project" ("clientId")
GO

CREATE INDEX "idx_Project_supplierId"
ON "Project" ("supplierId")
GO

CREATE INDEX "idx_Project_status"
ON "Project" ("status")
GO

CREATE INDEX "idx_Contract_projectId"
ON "Contract" ("projectId")
GO

CREATE INDEX "idx_ProjectMilestone_projectId"
ON "ProjectMilestone" ("projectId")
GO

CREATE INDEX "idx_Payment_projectId"
ON "Payment" ("projectId")
GO

CREATE INDEX "idx_Payment_status"
ON "Payment" ("status")
GO

CREATE INDEX "idx_Payment_createdAt"
ON "Payment" ("createdAt")
GO

CREATE INDEX "idx_PaymentGatewayTransaction_paymentId"
ON "PaymentGatewayTransaction" ("paymentId")
GO

CREATE INDEX "idx_PaymentGatewayTransaction_status"
ON "PaymentGatewayTransaction" ("status")
GO

CREATE INDEX "idx_WalletTransaction_userId"
ON "WalletTransaction" ("userId")
GO

CREATE INDEX "idx_WalletTransaction_createdAt"
ON "WalletTransaction" ("createdAt")
GO

CREATE INDEX "idx_VerificationDocument_userId"
ON "VerificationDocument" ("userId")
GO

CREATE INDEX "idx_VerificationDocument_status"
ON "VerificationDocument" ("status")
GO

CREATE INDEX "idx_Review_reviewedId"
ON "Review" ("reviewedId")
GO

CREATE INDEX "idx_Message_conversationId"
ON "Message" ("conversationId")
GO

CREATE INDEX "idx_Notification_userId"
ON "Notification" ("userId")
GO

CREATE INDEX "idx_Notification_isRead"
ON "Notification" ("isRead")
GO

CREATE INDEX "idx_Notification_createdAt"
ON "Notification" ("createdAt")
GO

CREATE INDEX "idx_DisputeMessage_disputeId"
ON "DisputeMessage" ("disputeId")
GO

CREATE INDEX "idx_OTPVerification_expiresAt"
ON "OTPVerification" ("expiresAt")
GO

CREATE INDEX "idx_AuditLog_action"
ON "AuditLog" ("action")
GO

CREATE INDEX "idx_AuditLog_createdAt"
ON "AuditLog" ("createdAt")
GO

CREATE INDEX "idx_Refund_status"
ON "Refund" ("status")
GO

CREATE INDEX "idx_SavedSearch_userId"
ON "SavedSearch" ("userId")
GO

CREATE INDEX "idx_Bookmark_userId"
ON "Bookmark" ("userId")
GO

CREATE INDEX "idx_Report_status"
ON "Report" ("status")
GO

CREATE INDEX "idx_PromotionUsage_promotionId"
ON "PromotionUsage" ("promotionId")
GO

CREATE INDEX "idx_PromotionUsage_userId"
ON "PromotionUsage" ("userId")
GO

CREATE INDEX "idx_Subscription_userId"
ON "Subscription" ("userId")
GO

CREATE INDEX "idx_Subscription_status"
ON "Subscription" ("status")
GO

