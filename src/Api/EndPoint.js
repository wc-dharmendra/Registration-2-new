const EndPoint = {
  general: `en/global/setup`,
  createUser: `user/verify`,
  resendOtp: `user/resendOtp`,
  login: "user/login",
  logout: "profile/logout",
  updateUser: `user/update`,
  getUser: (uId) => `/getUser?uid=${uId}`,
  getProfile: `profile/user-profile`,
  updateProfile: `profile/update-profile`,
  updateDetails: `profile/update-details`,
  updatePassword: "profile/update-password",
  forgotPassword: `profile/forgot-password`,
  saveSetPassword: `profile/set-password`,
  setPassword: `profile/forgot-password`,
  verifyToken: (token) => `profile/verify-password/${token}`,
  changePassword: (token) => `profile/change-password/${token}`,
  techSupport: `query/save`,
  feedback: `feedback/save`,
  createEvent: () => `event/create`,
  createEventSetting: `event/setting`,
  updateEvent: (eId) => `event/${eId}`,
  getEvent: "getEvent",
  supportDetail: (eId) => `event/${eId}/support-details`,

  //category-matrix dashboard endpoints
  getCategories: (id) => `event/${id}/category/dashboard`,
  addCategory: (id) => `event/${id}/category/add`,
  updateCategory: (id) => `event/${id}/category/edit`,
  addSubCategory: (id) => `event/${id}/category/addsubcategory`,
  reorderCategory: (id) => `event/${id}/category/displayordering`,
  changeCategoryStatus: (id) => `event/${id}/category/categorystatuschange`,
  reorderSubCategory: (id) => `event/${id}/category/subcategoryordering`,
  changeSubCategoryStatus: (id) =>
    `event/${id}/category/subcategorystatuschange`,
  duplicateSubCategory: (id) => `event/${id}/category/subcategoryduplicate`,
  editSubCategory: (id) => `event/${id}/category/editsubcategory`,
  deleteSubCategory: (id) => `event/${id}/category/subcategorydelete`,

  updateBanner: (id) => `event/${id}/update-banner`,

  //category-form end points
  getCategoryForm: (id) => `event/${id}/category/getcategoryform`,
  saveCategoryForm: (id) => `event/${id}/category/savecategoryforms`,
  deleteQuestion: (id) => `event/${id}/category/deletefield`,

  //CATEGORY SETTINGS END POINT
  saveCategorySettings: (id) => `event/${id}/category/categorysettings`,

  //CATEGORY GUESTS END POINTS
  categoryGuestsList: (eid, cid) => `event/${eid}/category/${cid}/guest`,
  getGuestData: (eid, cid) => `event/${eid}/category/${cid}/getfilter`,
  sendInvite: (eid, cid) => `event/${eid}/category/${cid}/invite`,
  uploadcsv: (eid, cid) => `event/${eid}/category/${cid}/invite/upload`,
  inviteeSampleCsvDownload: (eid, cid) =>
    `event/${eid}/invitee/download/sample/${cid}`,
  acceptInvite: (eid, cid) => `event/${eid}/category/${cid}/invite/accept`,
  rejectInvite: (eid, cid) => `event/${eid}/category/${cid}/invite/decline`,
  downloadGuestsData: (eid, cid) =>
    `event/${eid}/category/${cid}/downloadguest`,

  eventSetting: (eId) => `event/${eId}/settings`,
  eventOverview: (eId) => `event/${eId}`,
  hostVisibility: (eId) => `event/${eId}/host-visibility`,
  downloadTicket: `ticket/download`,
  resendEmail:(eId)=>`event/${eId}/guest/resend/email`,

  // FORM API END-POINTS
  getForm: (eId) => `event/${eId}/form`,
  saveForm: (eId) => `event/${eId}/form`,
  deleteFormQues: (id) => `event/${id}/deleteeventfield`,

  // MEDIA API END-POINTS
  getMedia: `media/get`,
  uploadMedia: `media/create`,
  deleteMedia: `media/delete`,

  // PAYMENT API END-POINT
  getPayment: (eId) => `event/${eId}/payment`,
  updatePayment: (eId) => `event/${eId}/payment/update`,
  addCustomPayment: (eId) => `event/${eId}/payment/add`,
  applyCustomPayment: (eId) => `event/${eId}/payment/apply`,
  deleteCustomPayment: (eId) => `event/${eId}/payment/delete`,

  // INTEGRATION API END-POINT
  getIntegration: (eId) => `event/${eId}/integrations`,
  updateIntegration: (eId) => `event/${eId}/integrations/update`,
  customIntegration: (eId) => `event/${eId}/integrations/custom`,
  applyCustomIntegration: (eId) => `event/${eId}/integrations/apply`,
  deleteCustomIntegration: (eId) => `event/${eId}/integrations/delete`,

  // MORE API END-POINT
  getMore: (eId) => `event/${eId}/more`,
  updateShortUrl: (eId) => `event/${eId}/more/short-url`,

  //BADGE ENDPOINT
  getBadgeCategories: (eid) => `event/${eid}/badge/categories`,
  badgeList: (eid) => `event/${eid}/badge/get`,
  badgeConfigs: (eid) => `event/${eid}/badge/config`,
  createBadge: (eid) => `event/${eid}/badge`,
  downloadBadge: (eid, bid) => `event/${eid}/badge/${bid}/download`,
  deleteBadge: (eid, bid) => `event/${eid}/badge/${bid}`,
  duplicateBadge: (eid, bid) => `event/${eid}/badge/${bid}/duplicate`,

  //EVENT SETTINGS EMAILS
  getEmailSettings: (eid) => `event/${eid}/integrations/email`,
  updateEmailSettings: (eid) => `event/${eid}/integrations/email/update`,
  createEmail: (eid) => `event/${eid}/emailers`,
  getEmail: (eid) => `event/${eid}/emailers`,
  toggleEmail: (eid) => `event/${eid}/emailers/toggle/status`,
  configEmail: (eid) => `event/${eid}/emailers/config`,



  //DISCOUNTS END POINT 
  getDiscounts: (eid) => `event/${eid}/discount/listing`,
  saveDiscount: (eid) => `event/${eid}/discount/addcoupon`,
  getCategoryListing: (eid) => `event/${eid}/discount/categories`,
  editDiscount: (eid) => `event/${eid}/discount/editcoupon`,
  discountStatusUpdate: (eid) => `event/${eid}/discount/couponstatuschange`,
  deleteDiscount: (eid) => `event/${eid}/discount/coupondelete`,
  duplicateDiscount: (eid) => ``,

  // Insight
  getInsight : (eid) => `event/${eid}/insides`,
  totalGuestCsvDownload: (eid) => `event/${eid}/download-total-guest`,
  totalRedeemCsvDownload: (eid) => `event/${eid}/download-total-redeem`,
  totalPrintCsvDownload: (eid) => `event/${eid}/download-total-print`,

};
export default EndPoint;
