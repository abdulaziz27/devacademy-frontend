import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Helper function to get the token
const getToken = () => localStorage.getItem("accessToken");

// Add a token to request headers
const withAuth = (config = {}) => {
  const token = getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

// User API Functions
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/login`, { email, password });
  const { token, user } = response.data;
  if (token) {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
  return response.data;
};

export const loginAdmin = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/login`, { email, password });
  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/api/register`, { name, email, password });
  const { token, user } = response.data;
  if (token) {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
  return response.data;
};

export const promoteUserToTeacher = async (email) => {
  const response = await axios.post(`${API_URL}/api/promote-teacher`, { email }, withAuth());
  return response.data;
};

export const logoutUser = async () => {
  await axios.post(`${API_URL}/api/logout`, null, withAuth());
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const updateUserProfile = async (name, avatar) => {
  const formData = new FormData();
  formData.append("name", name);
  if (avatar) formData.append("avatar", avatar);
  const response = await axios.post(`${API_URL}/api/profile/update`, formData, withAuth());
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/api/profile`, withAuth());
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/api/users`, withAuth());
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/api/users/${userId}`, withAuth());
  return response.data;
};

// Function to fetch categories
export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/api/categories`, withAuth());
  return response.data;
};

// Courses API Functions
export const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}/api/courses`, withAuth());
  return response.data;
};

export const getCourseDetails = async (slug) => {
  const response = await axios.get(`${API_URL}/api/courses/${slug}`, withAuth());
  return response.data;
};

export const getCoursesByCategory = async (categoryId) => {
  const response = await axios.get(`${API_URL}/api/courses?category=${categoryId}`, withAuth());
  return response.data;
};

export const getPremiumCourses = async () => {
  const response = await axios.get(`${API_URL}/api/courses?is_premium=true`, withAuth());
  return response.data;
};

export const createCourse = async (courseData) => {
  const formData = new FormData();
  Object.keys(courseData).forEach((key) => {
    formData.append(key, courseData[key]);
  });
  const response = await axios.post(`${API_URL}/api/courses`, formData, withAuth());
  return response.data;
};

export const updateCourse = async (slug, courseData) => {
  const formData = new FormData();
  Object.keys(courseData).forEach((key) => {
    formData.append(key, courseData[key]);
  });
  const response = await axios.post(`${API_URL}/api/courses/${slug}/update`, formData, withAuth());
  return response.data;
};

export const deleteCourse = async (slug) => {
  const response = await axios.delete(`${API_URL}/api/courses/${slug}`, withAuth());
  return response.data;
};

export const getFilteredCourses = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}/api/courses?${params}`, withAuth());
  return response.data;
};

// Enrollment API Functions
export const getMyEnrolledCourses = async () => {
  const response = await axios.get(`${API_URL}/api/my-courses`, withAuth());
  return response.data;
};

export const enrollInCourse = async (slug) => {
  const response = await axios.post(`${API_URL}/api/courses/${slug}/enroll`, null, withAuth());
  return response.data;
};

export const enrollInPremiumCourse = async (premiumSlug) => {
  const response = await axios.post(`${API_URL}/api/courses/${premiumSlug}/enroll`, null, withAuth());
  return response.data;
};

export const getCourseProgress = async (courseSlug) => {
  const response = await axios.get(`${API_URL}/api/courses/${courseSlug}/progress`, withAuth());
  return response.data;
};

// Lessons API Functions
export const getLessons = async (courseSlug) => {
  const response = await axios.get(`${API_URL}/api/courses/${courseSlug}/lessons`, withAuth());
  return response.data;
};

export const getLessonDetails = async (courseSlug, lessonId) => {
  const response = await axios.get(`${API_URL}/api/courses/${courseSlug}/lessons/${lessonId}`, withAuth());
  return response.data;
};

export const createLesson = async (courseSlug, lessonData) => {
  const formData = new FormData();
  Object.keys(lessonData).forEach((key) => {
    formData.append(key, lessonData[key]);
  });
  const response = await axios.post(`${API_URL}/api/courses/${courseSlug}/lessons`, formData, withAuth());
  return response.data;
};

export const updateLesson = async (courseSlug, lessonId, lessonData) => {
  const formData = new FormData();
  Object.keys(lessonData).forEach((key) => {
    formData.append(key, lessonData[key]);
  });
  const response = await axios.post(`${API_URL}/api/courses/${courseSlug}/lessons/${lessonId}/update`, formData, withAuth());
  return response.data;
};

export const deleteLesson = async (courseSlug, lessonId) => {
  const response = await axios.delete(`${API_URL}/api/courses/${courseSlug}/lessons/${lessonId}`, withAuth());
  return response.data;
};

export const markLessonComplete = async (lessonId) => {
  const response = await axios.post(`${API_URL}/api/lessons/${lessonId}/complete`, null, withAuth());
  return response.data;
};

// Subscription API Functions
export const getSubscriptionPlans = async () => {
  const response = await axios.get(`${API_URL}/api/subscription/plans`, withAuth());
  return response.data;
};

export const subscribeToPlan = async (planId, paymentType) => {
  const response = await axios.post(`${API_URL}/api/subscription/subscribe/${planId}`, { payment_type: paymentType }, withAuth());
  return response.data;
};

export const handleSubscriptionCallback = async (callbackData) => {
  const response = await axios.post(`${API_URL}/api/subscription/callback`, callbackData, withAuth());
  return response.data;
};

export const getSignatureKey = async (orderId, statusCode, grossAmount) => {
  const response = await axios.post(`${API_URL}/api/test/midtrans-signature`, { order_id: orderId, status_code: statusCode, gross_amount: grossAmount }, withAuth());
  return response.data;
};
