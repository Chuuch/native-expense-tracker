import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:8080/api'; // Update with your actual backend URL

// API client with authentication
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiClient.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/login', {
      email,
      password,
    });
  },

  register: async (userData: RegisterData) => {
    return apiClient.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/register', userData);
  },

  refreshToken: async (refreshToken: string) => {
    return apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
  },

  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  verifyEmail: async (code: string) => {
    return apiClient.post('/auth/verify', { code });
  },

  forgotPassword: async (email: string) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    return apiClient.get<User>('/user/profile');
  },

  updateProfile: async (updates: Partial<User>) => {
    return apiClient.put<User>('/user/profile', updates);
  },

  deleteAccount: async () => {
    return apiClient.delete('/user/account');
  },
};

// Transaction API
export const transactionAPI = {
  getTransactions: async (params?: TransactionFilters) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    
    return apiClient.get<PaginatedResponse<Transaction>>(`/transactions?${queryParams}`);
  },

  createTransaction: async (transaction: CreateTransactionData) => {
    return apiClient.post<Transaction>('/transactions', transaction);
  },

  updateTransaction: async (id: string, updates: Partial<Transaction>) => {
    return apiClient.put<Transaction>(`/transactions/${id}`, updates);
  },

  deleteTransaction: async (id: string) => {
    return apiClient.delete(`/transactions/${id}`);
  },
};

// Analytics API
export const analyticsAPI = {
  getSummary: async (period: string) => {
    return apiClient.get<AnalyticsSummary>(`/analytics/summary?period=${period}`);
  },

  getCategoryBreakdown: async (period: string) => {
    return apiClient.get<CategoryBreakdown[]>(`/analytics/categories?period=${period}`);
  },

  getTrends: async (period: string) => {
    return apiClient.get<TrendData[]>(`/analytics/trends?period=${period}`);
  },
};

// Savings Goals API
export const savingsGoalAPI = {
  getGoals: async () => {
    return apiClient.get<SavingsGoal[]>('/savings-goals');
  },

  createGoal: async (goal: CreateSavingsGoalData) => {
    return apiClient.post<SavingsGoal>('/savings-goals', goal);
  },

  updateGoal: async (id: string, updates: Partial<SavingsGoal>) => {
    return apiClient.put<SavingsGoal>(`/savings-goals/${id}`, updates);
  },

  deleteGoal: async (id: string) => {
    return apiClient.delete(`/savings-goals/${id}`);
  },
};

// Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  email: string;
  fullName: string;
  phone?: string;
  password: string;
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionData {
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  date: string;
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AnalyticsSummary {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  transactionCount: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  count: number;
}

export interface TrendData {
  date: string;
  income: number;
  expenses: number;
  net: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavingsGoalData {
  name: string;
  targetAmount: number;
  targetDate: string;
}
