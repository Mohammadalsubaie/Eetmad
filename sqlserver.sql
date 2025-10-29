-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/TrTZ9i
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


SET XACT_ABORT ON

BEGIN TRANSACTION QUICKDBD

CREATE TABLE [User] (
    [id] uuid  NOT NULL ,
    [userType] enum  NOT NULL ,
    [email] string  NOT NULL ,
    [phone] string  NOT NULL ,
    [passwordHash] string  NOT NULL ,
    [isEmailVerified] boolean  NOT NULL ,
    [isPhoneVerified] boolean  NOT NULL ,
    [status] enum  NOT NULL ,
    [fullName] string  NOT NULL ,
    [avatar] string  NOT NULL ,
    [dateOfBirth] date  NULL ,
    [nationalId] string  NULL ,
    [companyName] string  NULL ,
    [commercialRegister] string  NULL ,
    [taxNumber] string  NULL ,
    [averageRating] decimal  NOT NULL ,
    [totalReviews] int  NOT NULL ,
    [completedProjects] int  NOT NULL ,
    [walletBalance] decimal  NOT NULL ,
    [address] json  NOT NULL ,
    [notificationPreferences] json  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    [lastLoginAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [SupplierProfile] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [categories] json  NOT NULL ,
    [serviceDescription] text  NOT NULL ,
    [portfolio] json  NOT NULL ,
    [certifications] json  NOT NULL ,
    [workingHours] json  NOT NULL ,
    [responseTime] int  NOT NULL ,
    [acceptanceRate] decimal  NOT NULL ,
    [onTimeDelivery] decimal  NOT NULL ,
    [isVerified] boolean  NOT NULL ,
    [verificationDate] timestamp  NULL ,
    [verificationNotes] text  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_SupplierProfile] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Category] (
    [id] uuid  NOT NULL ,
    [nameAr] string  NOT NULL ,
    [nameEn] string  NOT NULL ,
    [parentId] uuid  NULL ,
    [icon] string  NOT NULL ,
    [description] text  NOT NULL ,
    [isActive] boolean  NOT NULL ,
    [sortOrder] int  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [SupplierCategory] (
    [id] uuid  NOT NULL ,
    [supplierId] uuid  NOT NULL ,
    [categoryId] uuid  NOT NULL ,
    [isPrimary] boolean  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_SupplierCategory] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Request] (
    [id] uuid  NOT NULL ,
    [requestNumber] string  NOT NULL ,
    [clientId] uuid  NOT NULL ,
    [title] string  NOT NULL ,
    [description] text  NOT NULL ,
    [categoryId] uuid  NOT NULL ,
    [budgetMin] decimal  NULL ,
    [budgetMax] decimal  NULL ,
    [expectedDuration] int  NOT NULL ,
    [deadline] date  NOT NULL ,
    [preferredStartDate] date  NULL ,
    [attachments] json  NOT NULL ,
    [status] enum  NOT NULL ,
    [selectedOfferId] uuid  NULL ,
    [viewsCount] int  NOT NULL ,
    [offersCount] int  NOT NULL ,
    [requiresOnSiteVisit] boolean  NOT NULL ,
    [location] json  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    [publishedAt] timestamp  NULL ,
    [closedAt] timestamp  NULL ,
    CONSTRAINT [PK_Request] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Offer] (
    [id] uuid  NOT NULL ,
    [offerNumber] string  NOT NULL ,
    [requestId] uuid  NOT NULL ,
    [supplierId] uuid  NOT NULL ,
    [proposedPrice] decimal  NOT NULL ,
    [estimatedDuration] int  NOT NULL ,
    [startDate] date  NOT NULL ,
    [technicalProposal] text  NOT NULL ,
    [deliverables] text  NOT NULL ,
    [paymentTerms] text  NOT NULL ,
    [attachments] json  NOT NULL ,
    [status] enum  NOT NULL ,
    [warrantyPeriod] int  NULL ,
    [warrantyDetails] text  NULL ,
    [clientNotes] text  NULL ,
    [adminNotes] text  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    [acceptedAt] timestamp  NULL ,
    CONSTRAINT [PK_Offer] PRIMARY KEY CLUSTERED (
        [id] ASC
    ),
    CONSTRAINT [UK_Offer_offerNumber] UNIQUE (
        [offerNumber]
    )
)

CREATE TABLE [Project] (
    [id] uuid  NOT NULL ,
    [projectNumber] string  NOT NULL ,
    [requestId] uuid  NOT NULL ,
    [offerId] uuid  NOT NULL ,
    [clientId] uuid  NOT NULL ,
    [supplierId] uuid  NOT NULL ,
    [contractId] uuid  NULL ,
    [totalAmount] decimal  NOT NULL ,
    [depositAmount] decimal  NOT NULL ,
    [finalAmount] decimal  NOT NULL ,
    [status] enum  NOT NULL ,
    [startDate] date  NOT NULL ,
    [expectedEndDate] date  NOT NULL ,
    [actualEndDate] date  NULL ,
    [deliveryProof] json  NOT NULL ,
    [deliveryNotes] text  NOT NULL ,
    [approvedByClient] boolean  NOT NULL ,
    [approvalDate] timestamp  NULL ,
    [progress] int  NOT NULL ,
    [milestones] json  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED (
        [id] ASC
    ),
    CONSTRAINT [UK_Project_projectNumber] UNIQUE (
        [projectNumber]
    )
)

CREATE TABLE [Contract] (
    [id] uuid  NOT NULL ,
    [contractNumber] string  NOT NULL ,
    [projectId] uuid  NOT NULL ,
    [contractText] text  NOT NULL ,
    [termsAndConditions] text  NOT NULL ,
    [paymentTerms] text  NOT NULL ,
    [deliverables] text  NOT NULL ,
    [warrantyTerms] text  NULL ,
    [clientSignature] string  NULL ,
    [supplierSignature] string  NULL ,
    [clientSignedAt] timestamp  NULL ,
    [supplierSignedAt] timestamp  NULL ,
    [status] enum  NOT NULL ,
    [version] int  NOT NULL ,
    [templateUsed] string  NULL ,
    [customClauses] json  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Contract] PRIMARY KEY CLUSTERED (
        [id] ASC
    ),
    CONSTRAINT [UK_Contract_contractNumber] UNIQUE (
        [contractNumber]
    )
)

CREATE TABLE [ProjectMilestone] (
    [id] uuid  NOT NULL ,
    [projectId] uuid  NOT NULL ,
    [milestoneNumber] int  NOT NULL ,
    [title] string  NOT NULL ,
    [description] text  NOT NULL ,
    [amount] decimal  NOT NULL ,
    [dueDate] date  NOT NULL ,
    [status] enum  NOT NULL ,
    [deliverables] text  NULL ,
    [attachments] json  NULL ,
    [completedAt] timestamp  NULL ,
    [approvedAt] timestamp  NULL ,
    [paymentReleased] boolean  NOT NULL ,
    [notes] text  NULL ,
    [sortOrder] int  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_ProjectMilestone] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Payment] (
    [id] uuid  NOT NULL ,
    [transactionId] string  NOT NULL ,
    [projectId] uuid  NOT NULL ,
    [milestoneId] uuid  NULL ,
    [payerId] uuid  NOT NULL ,
    [receiverId] uuid  NOT NULL ,
    [amount] decimal  NOT NULL ,
    [currency] string  NOT NULL ,
    [paymentType] enum  NOT NULL ,
    [paymentStage] enum  NOT NULL ,
    [paymentMethod] enum  NOT NULL ,
    [paymentGateway] string  NOT NULL ,
    [status] enum  NOT NULL ,
    [platformFee] decimal  NOT NULL ,
    [netAmount] decimal  NOT NULL ,
    [gatewayResponse] json  NOT NULL ,
    [ipAddress] string  NOT NULL ,
    [userAgent] string  NOT NULL ,
    [notes] text  NULL ,
    [failureReason] text  NULL ,
    [refundAmount] decimal  NULL ,
    [refundedAt] timestamp  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    [completedAt] timestamp  NULL ,
    CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED (
        [id] ASC
    ),
    CONSTRAINT [UK_Payment_transactionId] UNIQUE (
        [transactionId]
    )
)

CREATE TABLE [PaymentGatewayTransaction] (
    [id] uuid  NOT NULL ,
    [paymentId] uuid  NOT NULL ,
    [gatewayName] string  NOT NULL ,
    [gatewayTransactionId] string  NOT NULL ,
    [gatewayOrderId] string  NOT NULL ,
    [amount] decimal  NOT NULL ,
    [currency] string  NOT NULL ,
    [status] enum  NOT NULL ,
    [requestPayload] json  NOT NULL ,
    [responsePayload] json  NOT NULL ,
    [webhookData] json  NULL ,
    [cardType] string  NULL ,
    [cardLastFour] string  NULL ,
    [customerEmail] string  NULL ,
    [customerPhone] string  NULL ,
    [successUrl] string  NULL ,
    [failureUrl] string  NULL ,
    [callbackUrl] string  NULL ,
    [expiresAt] timestamp  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_PaymentGatewayTransaction] PRIMARY KEY CLUSTERED (
        [id] ASC
    ),
    CONSTRAINT [UK_PaymentGatewayTransaction_gatewayTransactionId] UNIQUE (
        [gatewayTransactionId]
    )
)

CREATE TABLE [WalletTransaction] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [amount] decimal  NOT NULL ,
    [type] enum  NOT NULL ,
    [referenceType] enum  NOT NULL ,
    [referenceId] uuid  NOT NULL ,
    [balanceBefore] decimal  NOT NULL ,
    [balanceAfter] decimal  NOT NULL ,
    [description] text  NOT NULL ,
    [status] enum  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_WalletTransaction] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [VerificationDocument] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [documentType] enum  NOT NULL ,
    [documentNumber] string  NULL ,
    [documentUrl] string  NOT NULL ,
    [backDocumentUrl] string  NULL ,
    [status] enum  NOT NULL ,
    [submittedAt] timestamp  NOT NULL ,
    [reviewedAt] timestamp  NULL ,
    [reviewedBy] uuid  NULL ,
    [reviewNotes] text  NULL ,
    [expiryDate] date  NULL ,
    [rejectionReason] text  NULL ,
    [metadata] json  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_VerificationDocument] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Review] (
    [id] uuid  NOT NULL ,
    [projectId] uuid  NOT NULL ,
    [reviewerId] uuid  NOT NULL ,
    [reviewedId] uuid  NOT NULL ,
    [rating] int  NOT NULL ,
    [reviewType] enum  NOT NULL ,
    [title] string  NOT NULL ,
    [comment] text  NOT NULL ,
    [qualityRating] int  NULL ,
    [communicationRating] int  NULL ,
    [timelinessRating] int  NULL ,
    [professionalismRating] int  NULL ,
    [status] enum  NOT NULL ,
    [isVerified] boolean  NOT NULL ,
    [response] text  NULL ,
    [respondedAt] timestamp  NULL ,
    [helpfulCount] int  NOT NULL ,
    [notHelpfulCount] int  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Review] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Conversation] (
    [id] uuid  NOT NULL ,
    [requestId] uuid  NULL ,
    [offerId] uuid  NULL ,
    [projectId] uuid  NULL ,
    [participants] json  NOT NULL ,
    [lastMessageId] uuid  NULL ,
    [lastMessageAt] timestamp  NOT NULL ,
    [status] enum  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Conversation] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Message] (
    [id] uuid  NOT NULL ,
    [conversationId] uuid  NOT NULL ,
    [senderId] uuid  NOT NULL ,
    [content] text  NOT NULL ,
    [messageType] enum  NOT NULL ,
    [attachments] json  NOT NULL ,
    [isRead] boolean  NOT NULL ,
    [readAt] timestamp  NULL ,
    [isSystemMessage] boolean  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Notification] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [title] string  NOT NULL ,
    [body] text  NOT NULL ,
    [type] enum  NOT NULL ,
    [referenceType] string  NULL ,
    [referenceId] uuid  NULL ,
    [actionUrl] string  NULL ,
    [isRead] boolean  NOT NULL ,
    [readAt] timestamp  NULL ,
    [channels] json  NOT NULL ,
    [sentVia] json  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Dispute] (
    [id] uuid  NOT NULL ,
    [disputeNumber] string  NOT NULL ,
    [projectId] uuid  NOT NULL ,
    [raisedBy] uuid  NOT NULL ,
    [against] uuid  NOT NULL ,
    [subject] string  NOT NULL ,
    [description] text  NOT NULL ,
    [category] enum  NOT NULL ,
    [evidence] json  NOT NULL ,
    [status] enum  NOT NULL ,
    [resolution] text  NULL ,
    [resolvedBy] uuid  NULL ,
    [resolvedAt] timestamp  NULL ,
    [assignedTo] uuid  NULL ,
    [priority] enum  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Dispute] PRIMARY KEY CLUSTERED (
        [id] ASC
    ),
    CONSTRAINT [UK_Dispute_disputeNumber] UNIQUE (
        [disputeNumber]
    )
)

CREATE TABLE [DisputeMessage] (
    [id] uuid  NOT NULL ,
    [disputeId] uuid  NOT NULL ,
    [senderId] uuid  NOT NULL ,
    [messageType] enum  NOT NULL ,
    [content] text  NOT NULL ,
    [attachments] json  NULL ,
    [isInternal] boolean  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_DisputeMessage] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [OTPVerification] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [otpCode] string  NOT NULL ,
    [purpose] enum  NOT NULL ,
    [channel] enum  NOT NULL ,
    [isUsed] boolean  NOT NULL ,
    [expiresAt] timestamp  NOT NULL ,
    [attemptCount] int  NOT NULL ,
    [maxAttempts] int  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [usedAt] timestamp  NULL ,
    CONSTRAINT [PK_OTPVerification] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [AuditLog] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NULL ,
    [action] string  NOT NULL ,
    [entityType] string  NOT NULL ,
    [entityId] uuid  NULL ,
    [changes] json  NOT NULL ,
    [metadata] json  NOT NULL ,
    [ipAddress] string  NOT NULL ,
    [userAgent] string  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_AuditLog] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [ContentPage] (
    [id] uuid  NOT NULL ,
    [slug] string  NOT NULL ,
    [titleAr] string  NOT NULL ,
    [titleEn] string  NOT NULL ,
    [contentAr] text  NOT NULL ,
    [contentEn] text  NOT NULL ,
    [pageType] enum  NOT NULL ,
    [status] enum  NOT NULL ,
    [metaDescription] text  NULL ,
    [metaKeywords] string  NULL ,
    [displayOrder] int  NOT NULL ,
    [isPublished] boolean  NOT NULL ,
    [publishedAt] timestamp  NULL ,
    [createdBy] uuid  NOT NULL ,
    [updatedBy] uuid  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_ContentPage] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [FAQ] (
    [id] uuid  NOT NULL ,
    [questionAr] string  NOT NULL ,
    [questionEn] string  NOT NULL ,
    [answerAr] text  NOT NULL ,
    [answerEn] text  NOT NULL ,
    [categoryId] uuid  NULL ,
    [displayOrder] int  NOT NULL ,
    [isPublished] boolean  NOT NULL ,
    [viewCount] int  NOT NULL ,
    [helpfulCount] int  NOT NULL ,
    [notHelpfulCount] int  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_FAQ] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [SystemSetting] (
    [id] uuid  NOT NULL ,
    [settingKey] string  NOT NULL ,
    [settingValue] text  NOT NULL ,
    [dataType] enum  NOT NULL ,
    [category] string  NOT NULL ,
    [description] text  NULL ,
    [isPublic] boolean  NOT NULL ,
    [isEditable] boolean  NOT NULL ,
    [updatedBy] uuid  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_SystemSetting] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [PlatformCommission] (
    [id] uuid  NOT NULL ,
    [categoryId] uuid  NULL ,
    [userType] enum  NULL ,
    [minAmount] decimal  NULL ,
    [maxAmount] decimal  NULL ,
    [commissionType] enum  NOT NULL ,
    [commissionValue] decimal  NOT NULL ,
    [isActive] boolean  NOT NULL ,
    [effectiveFrom] date  NOT NULL ,
    [effectiveTo] date  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_PlatformCommission] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Refund] (
    [id] uuid  NOT NULL ,
    [refundNumber] string  NOT NULL ,
    [paymentId] uuid  NOT NULL ,
    [requestedBy] uuid  NOT NULL ,
    [approvedBy] uuid  NULL ,
    [amount] decimal  NOT NULL ,
    [reason] text  NOT NULL ,
    [status] enum  NOT NULL ,
    [refundMethod] enum  NOT NULL ,
    [gatewayRefundId] string  NULL ,
    [processedAt] timestamp  NULL ,
    [rejectionReason] text  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Refund] PRIMARY KEY CLUSTERED (
        [id] ASC
    ),
    CONSTRAINT [UK_Refund_refundNumber] UNIQUE (
        [refundNumber]
    )
)

CREATE TABLE [SavedSearch] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [searchName] string  NOT NULL ,
    [filters] json  NOT NULL ,
    [notifyOnMatch] boolean  NOT NULL ,
    [lastNotifiedAt] timestamp  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_SavedSearch] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Bookmark] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [referenceType] enum  NOT NULL ,
    [referenceId] uuid  NOT NULL ,
    [notes] text  NULL ,
    [createdAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Bookmark] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Report] (
    [id] uuid  NOT NULL ,
    [reportedBy] uuid  NOT NULL ,
    [reportedEntityType] enum  NOT NULL ,
    [reportedEntityId] uuid  NOT NULL ,
    [reportedUserId] uuid  NULL ,
    [reason] enum  NOT NULL ,
    [description] text  NOT NULL ,
    [evidence] json  NULL ,
    [status] enum  NOT NULL ,
    [reviewedBy] uuid  NULL ,
    [reviewedAt] timestamp  NULL ,
    [actionTaken] text  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Report] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [PromotionCampaign] (
    [id] uuid  NOT NULL ,
    [campaignCode] string  NOT NULL ,
    [nameAr] string  NOT NULL ,
    [nameEn] string  NOT NULL ,
    [discountType] enum  NOT NULL ,
    [discountValue] decimal  NOT NULL ,
    [minPurchaseAmount] decimal  NULL ,
    [maxDiscountAmount] decimal  NULL ,
    [usageLimit] int  NULL ,
    [usageCount] int  NOT NULL ,
    [userType] enum  NULL ,
    [categoryId] uuid  NULL ,
    [startDate] timestamp  NOT NULL ,
    [endDate] timestamp  NOT NULL ,
    [isActive] boolean  NOT NULL ,
    [createdBy] uuid  NOT NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_PromotionCampaign] PRIMARY KEY CLUSTERED (
        [id] ASC
    ),
    CONSTRAINT [UK_PromotionCampaign_campaignCode] UNIQUE (
        [campaignCode]
    )
)

CREATE TABLE [PromotionUsage] (
    [id] uuid  NOT NULL ,
    [promotionId] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [projectId] uuid  NULL ,
    [discountAmount] decimal  NOT NULL ,
    [usedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_PromotionUsage] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Subscription] (
    [id] uuid  NOT NULL ,
    [userId] uuid  NOT NULL ,
    [planName] string  NOT NULL ,
    [planType] enum  NOT NULL ,
    [features] json  NOT NULL ,
    [price] decimal  NOT NULL ,
    [billingCycle] enum  NOT NULL ,
    [status] enum  NOT NULL ,
    [startDate] date  NOT NULL ,
    [endDate] date  NOT NULL ,
    [autoRenew] boolean  NOT NULL ,
    [paymentMethod] string  NULL ,
    [lastPaymentDate] timestamp  NULL ,
    [nextPaymentDate] timestamp  NULL ,
    [cancelledAt] timestamp  NULL ,
    [cancellationReason] text  NULL ,
    [createdAt] timestamp  NOT NULL ,
    [updatedAt] timestamp  NOT NULL ,
    CONSTRAINT [PK_Subscription] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

ALTER TABLE [SupplierProfile] WITH CHECK ADD CONSTRAINT [FK_SupplierProfile_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [SupplierProfile] CHECK CONSTRAINT [FK_SupplierProfile_userId]

ALTER TABLE [Category] WITH CHECK ADD CONSTRAINT [FK_Category_parentId] FOREIGN KEY([parentId])
REFERENCES [Category] ([id])

ALTER TABLE [Category] CHECK CONSTRAINT [FK_Category_parentId]

ALTER TABLE [SupplierCategory] WITH CHECK ADD CONSTRAINT [FK_SupplierCategory_supplierId] FOREIGN KEY([supplierId])
REFERENCES [User] ([id])

ALTER TABLE [SupplierCategory] CHECK CONSTRAINT [FK_SupplierCategory_supplierId]

ALTER TABLE [SupplierCategory] WITH CHECK ADD CONSTRAINT [FK_SupplierCategory_categoryId] FOREIGN KEY([categoryId])
REFERENCES [Category] ([id])

ALTER TABLE [SupplierCategory] CHECK CONSTRAINT [FK_SupplierCategory_categoryId]

ALTER TABLE [Request] WITH CHECK ADD CONSTRAINT [FK_Request_clientId] FOREIGN KEY([clientId])
REFERENCES [User] ([id])

ALTER TABLE [Request] CHECK CONSTRAINT [FK_Request_clientId]

ALTER TABLE [Request] WITH CHECK ADD CONSTRAINT [FK_Request_categoryId] FOREIGN KEY([categoryId])
REFERENCES [Category] ([id])

ALTER TABLE [Request] CHECK CONSTRAINT [FK_Request_categoryId]

ALTER TABLE [Request] WITH CHECK ADD CONSTRAINT [FK_Request_selectedOfferId] FOREIGN KEY([selectedOfferId])
REFERENCES [Offer] ([id])

ALTER TABLE [Request] CHECK CONSTRAINT [FK_Request_selectedOfferId]

ALTER TABLE [Offer] WITH CHECK ADD CONSTRAINT [FK_Offer_requestId] FOREIGN KEY([requestId])
REFERENCES [Request] ([id])

ALTER TABLE [Offer] CHECK CONSTRAINT [FK_Offer_requestId]

ALTER TABLE [Offer] WITH CHECK ADD CONSTRAINT [FK_Offer_supplierId] FOREIGN KEY([supplierId])
REFERENCES [User] ([id])

ALTER TABLE [Offer] CHECK CONSTRAINT [FK_Offer_supplierId]

ALTER TABLE [Project] WITH CHECK ADD CONSTRAINT [FK_Project_requestId] FOREIGN KEY([requestId])
REFERENCES [Request] ([id])

ALTER TABLE [Project] CHECK CONSTRAINT [FK_Project_requestId]

ALTER TABLE [Project] WITH CHECK ADD CONSTRAINT [FK_Project_offerId] FOREIGN KEY([offerId])
REFERENCES [Offer] ([id])

ALTER TABLE [Project] CHECK CONSTRAINT [FK_Project_offerId]

ALTER TABLE [Project] WITH CHECK ADD CONSTRAINT [FK_Project_clientId] FOREIGN KEY([clientId])
REFERENCES [User] ([id])

ALTER TABLE [Project] CHECK CONSTRAINT [FK_Project_clientId]

ALTER TABLE [Project] WITH CHECK ADD CONSTRAINT [FK_Project_supplierId] FOREIGN KEY([supplierId])
REFERENCES [User] ([id])

ALTER TABLE [Project] CHECK CONSTRAINT [FK_Project_supplierId]

ALTER TABLE [Project] WITH CHECK ADD CONSTRAINT [FK_Project_contractId] FOREIGN KEY([contractId])
REFERENCES [Contract] ([id])

ALTER TABLE [Project] CHECK CONSTRAINT [FK_Project_contractId]

ALTER TABLE [Contract] WITH CHECK ADD CONSTRAINT [FK_Contract_projectId] FOREIGN KEY([projectId])
REFERENCES [Project] ([id])

ALTER TABLE [Contract] CHECK CONSTRAINT [FK_Contract_projectId]

ALTER TABLE [ProjectMilestone] WITH CHECK ADD CONSTRAINT [FK_ProjectMilestone_projectId] FOREIGN KEY([projectId])
REFERENCES [Project] ([id])

ALTER TABLE [ProjectMilestone] CHECK CONSTRAINT [FK_ProjectMilestone_projectId]

ALTER TABLE [Payment] WITH CHECK ADD CONSTRAINT [FK_Payment_projectId] FOREIGN KEY([projectId])
REFERENCES [Project] ([id])

ALTER TABLE [Payment] CHECK CONSTRAINT [FK_Payment_projectId]

ALTER TABLE [Payment] WITH CHECK ADD CONSTRAINT [FK_Payment_milestoneId] FOREIGN KEY([milestoneId])
REFERENCES [ProjectMilestone] ([id])

ALTER TABLE [Payment] CHECK CONSTRAINT [FK_Payment_milestoneId]

ALTER TABLE [Payment] WITH CHECK ADD CONSTRAINT [FK_Payment_payerId] FOREIGN KEY([payerId])
REFERENCES [User] ([id])

ALTER TABLE [Payment] CHECK CONSTRAINT [FK_Payment_payerId]

ALTER TABLE [Payment] WITH CHECK ADD CONSTRAINT [FK_Payment_receiverId] FOREIGN KEY([receiverId])
REFERENCES [User] ([id])

ALTER TABLE [Payment] CHECK CONSTRAINT [FK_Payment_receiverId]

ALTER TABLE [PaymentGatewayTransaction] WITH CHECK ADD CONSTRAINT [FK_PaymentGatewayTransaction_paymentId] FOREIGN KEY([paymentId])
REFERENCES [Payment] ([id])

ALTER TABLE [PaymentGatewayTransaction] CHECK CONSTRAINT [FK_PaymentGatewayTransaction_paymentId]

ALTER TABLE [WalletTransaction] WITH CHECK ADD CONSTRAINT [FK_WalletTransaction_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [WalletTransaction] CHECK CONSTRAINT [FK_WalletTransaction_userId]

ALTER TABLE [VerificationDocument] WITH CHECK ADD CONSTRAINT [FK_VerificationDocument_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [VerificationDocument] CHECK CONSTRAINT [FK_VerificationDocument_userId]

ALTER TABLE [VerificationDocument] WITH CHECK ADD CONSTRAINT [FK_VerificationDocument_reviewedBy] FOREIGN KEY([reviewedBy])
REFERENCES [User] ([id])

ALTER TABLE [VerificationDocument] CHECK CONSTRAINT [FK_VerificationDocument_reviewedBy]

ALTER TABLE [Review] WITH CHECK ADD CONSTRAINT [FK_Review_projectId] FOREIGN KEY([projectId])
REFERENCES [Project] ([id])

ALTER TABLE [Review] CHECK CONSTRAINT [FK_Review_projectId]

ALTER TABLE [Review] WITH CHECK ADD CONSTRAINT [FK_Review_reviewerId] FOREIGN KEY([reviewerId])
REFERENCES [User] ([id])

ALTER TABLE [Review] CHECK CONSTRAINT [FK_Review_reviewerId]

ALTER TABLE [Review] WITH CHECK ADD CONSTRAINT [FK_Review_reviewedId] FOREIGN KEY([reviewedId])
REFERENCES [User] ([id])

ALTER TABLE [Review] CHECK CONSTRAINT [FK_Review_reviewedId]

ALTER TABLE [Conversation] WITH CHECK ADD CONSTRAINT [FK_Conversation_requestId] FOREIGN KEY([requestId])
REFERENCES [Request] ([id])

ALTER TABLE [Conversation] CHECK CONSTRAINT [FK_Conversation_requestId]

ALTER TABLE [Conversation] WITH CHECK ADD CONSTRAINT [FK_Conversation_offerId] FOREIGN KEY([offerId])
REFERENCES [Offer] ([id])

ALTER TABLE [Conversation] CHECK CONSTRAINT [FK_Conversation_offerId]

ALTER TABLE [Conversation] WITH CHECK ADD CONSTRAINT [FK_Conversation_projectId] FOREIGN KEY([projectId])
REFERENCES [Project] ([id])

ALTER TABLE [Conversation] CHECK CONSTRAINT [FK_Conversation_projectId]

ALTER TABLE [Conversation] WITH CHECK ADD CONSTRAINT [FK_Conversation_lastMessageId] FOREIGN KEY([lastMessageId])
REFERENCES [Message] ([id])

ALTER TABLE [Conversation] CHECK CONSTRAINT [FK_Conversation_lastMessageId]

ALTER TABLE [Message] WITH CHECK ADD CONSTRAINT [FK_Message_conversationId] FOREIGN KEY([conversationId])
REFERENCES [Conversation] ([id])

ALTER TABLE [Message] CHECK CONSTRAINT [FK_Message_conversationId]

ALTER TABLE [Message] WITH CHECK ADD CONSTRAINT [FK_Message_senderId] FOREIGN KEY([senderId])
REFERENCES [User] ([id])

ALTER TABLE [Message] CHECK CONSTRAINT [FK_Message_senderId]

ALTER TABLE [Notification] WITH CHECK ADD CONSTRAINT [FK_Notification_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [Notification] CHECK CONSTRAINT [FK_Notification_userId]

ALTER TABLE [Dispute] WITH CHECK ADD CONSTRAINT [FK_Dispute_projectId] FOREIGN KEY([projectId])
REFERENCES [Project] ([id])

ALTER TABLE [Dispute] CHECK CONSTRAINT [FK_Dispute_projectId]

ALTER TABLE [Dispute] WITH CHECK ADD CONSTRAINT [FK_Dispute_raisedBy] FOREIGN KEY([raisedBy])
REFERENCES [User] ([id])

ALTER TABLE [Dispute] CHECK CONSTRAINT [FK_Dispute_raisedBy]

ALTER TABLE [Dispute] WITH CHECK ADD CONSTRAINT [FK_Dispute_against] FOREIGN KEY([against])
REFERENCES [User] ([id])

ALTER TABLE [Dispute] CHECK CONSTRAINT [FK_Dispute_against]

ALTER TABLE [Dispute] WITH CHECK ADD CONSTRAINT [FK_Dispute_resolvedBy] FOREIGN KEY([resolvedBy])
REFERENCES [User] ([id])

ALTER TABLE [Dispute] CHECK CONSTRAINT [FK_Dispute_resolvedBy]

ALTER TABLE [Dispute] WITH CHECK ADD CONSTRAINT [FK_Dispute_assignedTo] FOREIGN KEY([assignedTo])
REFERENCES [User] ([id])

ALTER TABLE [Dispute] CHECK CONSTRAINT [FK_Dispute_assignedTo]

ALTER TABLE [DisputeMessage] WITH CHECK ADD CONSTRAINT [FK_DisputeMessage_disputeId] FOREIGN KEY([disputeId])
REFERENCES [Dispute] ([id])

ALTER TABLE [DisputeMessage] CHECK CONSTRAINT [FK_DisputeMessage_disputeId]

ALTER TABLE [DisputeMessage] WITH CHECK ADD CONSTRAINT [FK_DisputeMessage_senderId] FOREIGN KEY([senderId])
REFERENCES [User] ([id])

ALTER TABLE [DisputeMessage] CHECK CONSTRAINT [FK_DisputeMessage_senderId]

ALTER TABLE [OTPVerification] WITH CHECK ADD CONSTRAINT [FK_OTPVerification_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [OTPVerification] CHECK CONSTRAINT [FK_OTPVerification_userId]

ALTER TABLE [AuditLog] WITH CHECK ADD CONSTRAINT [FK_AuditLog_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [AuditLog] CHECK CONSTRAINT [FK_AuditLog_userId]

ALTER TABLE [ContentPage] WITH CHECK ADD CONSTRAINT [FK_ContentPage_createdBy] FOREIGN KEY([createdBy])
REFERENCES [User] ([id])

ALTER TABLE [ContentPage] CHECK CONSTRAINT [FK_ContentPage_createdBy]

ALTER TABLE [ContentPage] WITH CHECK ADD CONSTRAINT [FK_ContentPage_updatedBy] FOREIGN KEY([updatedBy])
REFERENCES [User] ([id])

ALTER TABLE [ContentPage] CHECK CONSTRAINT [FK_ContentPage_updatedBy]

ALTER TABLE [FAQ] WITH CHECK ADD CONSTRAINT [FK_FAQ_categoryId] FOREIGN KEY([categoryId])
REFERENCES [Category] ([id])

ALTER TABLE [FAQ] CHECK CONSTRAINT [FK_FAQ_categoryId]

ALTER TABLE [SystemSetting] WITH CHECK ADD CONSTRAINT [FK_SystemSetting_updatedBy] FOREIGN KEY([updatedBy])
REFERENCES [User] ([id])

ALTER TABLE [SystemSetting] CHECK CONSTRAINT [FK_SystemSetting_updatedBy]

ALTER TABLE [PlatformCommission] WITH CHECK ADD CONSTRAINT [FK_PlatformCommission_categoryId] FOREIGN KEY([categoryId])
REFERENCES [Category] ([id])

ALTER TABLE [PlatformCommission] CHECK CONSTRAINT [FK_PlatformCommission_categoryId]

ALTER TABLE [Refund] WITH CHECK ADD CONSTRAINT [FK_Refund_paymentId] FOREIGN KEY([paymentId])
REFERENCES [Payment] ([id])

ALTER TABLE [Refund] CHECK CONSTRAINT [FK_Refund_paymentId]

ALTER TABLE [Refund] WITH CHECK ADD CONSTRAINT [FK_Refund_requestedBy] FOREIGN KEY([requestedBy])
REFERENCES [User] ([id])

ALTER TABLE [Refund] CHECK CONSTRAINT [FK_Refund_requestedBy]

ALTER TABLE [Refund] WITH CHECK ADD CONSTRAINT [FK_Refund_approvedBy] FOREIGN KEY([approvedBy])
REFERENCES [User] ([id])

ALTER TABLE [Refund] CHECK CONSTRAINT [FK_Refund_approvedBy]

ALTER TABLE [SavedSearch] WITH CHECK ADD CONSTRAINT [FK_SavedSearch_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [SavedSearch] CHECK CONSTRAINT [FK_SavedSearch_userId]

ALTER TABLE [Bookmark] WITH CHECK ADD CONSTRAINT [FK_Bookmark_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [Bookmark] CHECK CONSTRAINT [FK_Bookmark_userId]

ALTER TABLE [Report] WITH CHECK ADD CONSTRAINT [FK_Report_reportedBy] FOREIGN KEY([reportedBy])
REFERENCES [User] ([id])

ALTER TABLE [Report] CHECK CONSTRAINT [FK_Report_reportedBy]

ALTER TABLE [Report] WITH CHECK ADD CONSTRAINT [FK_Report_reportedUserId] FOREIGN KEY([reportedUserId])
REFERENCES [User] ([id])

ALTER TABLE [Report] CHECK CONSTRAINT [FK_Report_reportedUserId]

ALTER TABLE [Report] WITH CHECK ADD CONSTRAINT [FK_Report_reviewedBy] FOREIGN KEY([reviewedBy])
REFERENCES [User] ([id])

ALTER TABLE [Report] CHECK CONSTRAINT [FK_Report_reviewedBy]

ALTER TABLE [PromotionCampaign] WITH CHECK ADD CONSTRAINT [FK_PromotionCampaign_categoryId] FOREIGN KEY([categoryId])
REFERENCES [Category] ([id])

ALTER TABLE [PromotionCampaign] CHECK CONSTRAINT [FK_PromotionCampaign_categoryId]

ALTER TABLE [PromotionCampaign] WITH CHECK ADD CONSTRAINT [FK_PromotionCampaign_createdBy] FOREIGN KEY([createdBy])
REFERENCES [User] ([id])

ALTER TABLE [PromotionCampaign] CHECK CONSTRAINT [FK_PromotionCampaign_createdBy]

ALTER TABLE [PromotionUsage] WITH CHECK ADD CONSTRAINT [FK_PromotionUsage_promotionId] FOREIGN KEY([promotionId])
REFERENCES [PromotionCampaign] ([id])

ALTER TABLE [PromotionUsage] CHECK CONSTRAINT [FK_PromotionUsage_promotionId]

ALTER TABLE [PromotionUsage] WITH CHECK ADD CONSTRAINT [FK_PromotionUsage_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [PromotionUsage] CHECK CONSTRAINT [FK_PromotionUsage_userId]

ALTER TABLE [PromotionUsage] WITH CHECK ADD CONSTRAINT [FK_PromotionUsage_projectId] FOREIGN KEY([projectId])
REFERENCES [Project] ([id])

ALTER TABLE [PromotionUsage] CHECK CONSTRAINT [FK_PromotionUsage_projectId]

ALTER TABLE [Subscription] WITH CHECK ADD CONSTRAINT [FK_Subscription_userId] FOREIGN KEY([userId])
REFERENCES [User] ([id])

ALTER TABLE [Subscription] CHECK CONSTRAINT [FK_Subscription_userId]

CREATE INDEX [idx_User_status]
ON [User] ([status])

CREATE INDEX [idx_Category_sortOrder]
ON [Category] ([sortOrder])

CREATE INDEX [idx_SupplierCategory_supplierId]
ON [SupplierCategory] ([supplierId])

CREATE INDEX [idx_SupplierCategory_categoryId]
ON [SupplierCategory] ([categoryId])

CREATE INDEX [idx_Request_clientId]
ON [Request] ([clientId])

CREATE INDEX [idx_Request_categoryId]
ON [Request] ([categoryId])

CREATE INDEX [idx_Request_deadline]
ON [Request] ([deadline])

CREATE INDEX [idx_Request_status]
ON [Request] ([status])

CREATE INDEX [idx_Request_createdAt]
ON [Request] ([createdAt])

CREATE INDEX [idx_Offer_requestId]
ON [Offer] ([requestId])

CREATE INDEX [idx_Offer_supplierId]
ON [Offer] ([supplierId])

CREATE INDEX [idx_Offer_status]
ON [Offer] ([status])

CREATE INDEX [idx_Project_clientId]
ON [Project] ([clientId])

CREATE INDEX [idx_Project_supplierId]
ON [Project] ([supplierId])

CREATE INDEX [idx_Project_status]
ON [Project] ([status])

CREATE INDEX [idx_Contract_projectId]
ON [Contract] ([projectId])

CREATE INDEX [idx_ProjectMilestone_projectId]
ON [ProjectMilestone] ([projectId])

CREATE INDEX [idx_Payment_projectId]
ON [Payment] ([projectId])

CREATE INDEX [idx_Payment_status]
ON [Payment] ([status])

CREATE INDEX [idx_Payment_createdAt]
ON [Payment] ([createdAt])

CREATE INDEX [idx_PaymentGatewayTransaction_paymentId]
ON [PaymentGatewayTransaction] ([paymentId])

CREATE INDEX [idx_PaymentGatewayTransaction_status]
ON [PaymentGatewayTransaction] ([status])

CREATE INDEX [idx_WalletTransaction_userId]
ON [WalletTransaction] ([userId])

CREATE INDEX [idx_WalletTransaction_createdAt]
ON [WalletTransaction] ([createdAt])

CREATE INDEX [idx_VerificationDocument_userId]
ON [VerificationDocument] ([userId])

CREATE INDEX [idx_VerificationDocument_status]
ON [VerificationDocument] ([status])

CREATE INDEX [idx_Review_reviewedId]
ON [Review] ([reviewedId])

CREATE INDEX [idx_Message_conversationId]
ON [Message] ([conversationId])

CREATE INDEX [idx_Notification_userId]
ON [Notification] ([userId])

CREATE INDEX [idx_Notification_isRead]
ON [Notification] ([isRead])

CREATE INDEX [idx_Notification_createdAt]
ON [Notification] ([createdAt])

CREATE INDEX [idx_DisputeMessage_disputeId]
ON [DisputeMessage] ([disputeId])

CREATE INDEX [idx_OTPVerification_expiresAt]
ON [OTPVerification] ([expiresAt])

CREATE INDEX [idx_AuditLog_action]
ON [AuditLog] ([action])

CREATE INDEX [idx_AuditLog_createdAt]
ON [AuditLog] ([createdAt])

CREATE INDEX [idx_Refund_status]
ON [Refund] ([status])

CREATE INDEX [idx_SavedSearch_userId]
ON [SavedSearch] ([userId])

CREATE INDEX [idx_Bookmark_userId]
ON [Bookmark] ([userId])

CREATE INDEX [idx_Report_status]
ON [Report] ([status])

CREATE INDEX [idx_PromotionUsage_promotionId]
ON [PromotionUsage] ([promotionId])

CREATE INDEX [idx_PromotionUsage_userId]
ON [PromotionUsage] ([userId])

CREATE INDEX [idx_Subscription_userId]
ON [Subscription] ([userId])

CREATE INDEX [idx_Subscription_status]
ON [Subscription] ([status])

COMMIT TRANSACTION QUICKDBD