import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'http://localhost:8080/api/v1'; 

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
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        errorMessage = response.statusText || errorMessage;
      }
      
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      (error as any).statusText = response.statusText;
      throw error;
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

  async post<T>(endpoint: string, data?: any, skipAuth: boolean = false): Promise<T> {
  const headers = skipAuth ? {} : await this.getAuthHeaders();
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

export const authAPI = {
  login: async (email: string, password: string) => {
    return apiClient.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/login', {
      email,
      password,
    }, true);
  },

  register: async (userData: RegisterData) => {
    return apiClient.post<{ message: string; user: User }>('/auth/register', userData, true);
  },

  refreshToken: async (refreshToken: string) => {
    return apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken }, true);
  },

  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  verifyEmail: async (code: string) => {
    return apiClient.post('/auth/verify-email', { code }, true);
  },

  resendVerification: async (email: string) => {
    return apiClient.post('/auth/resend-verification', { email }, true);
  },

  forgotPassword: async (email: string) => {
    return apiClient.post('/auth/forgot-password', { email }, true);
  },

  resetPassword: async (token: string, newPassword: string) => {
    return apiClient.post('/auth/reset-password', { token, newPassword }, true);
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    return apiClient.get<User>('/api/auth/profile');
  },

  updateProfile: async (updates: Partial<User>) => {
    return apiClient.put<User>('/api/auth/profile', updates);
  },

  deleteAccount: async () => {
    return apiClient.delete('/api/user/account');
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
    
    return apiClient.get<PaginatedResponse<Transaction>>(`/api/transactions?${queryParams}`);
  },

  createTransaction: async (transaction: CreateTransactionData) => {
    return apiClient.post<Transaction>('/api/transactions', transaction);
  },

  updateTransaction: async (id: string, updates: Partial<Transaction>) => {
    return apiClient.put<Transaction>(`/api/transactions/${id}`, updates);
  },

  deleteTransaction: async (id: string) => {
    return apiClient.delete(`/api/transactions/${id}`);
  },
};

// Analytics API
export const analyticsAPI = {
  getSummary: async (period: string) => {
    return apiClient.get<AnalyticsSummary>(`/api/analytics/summary?period=${period}`);
  },

  getCategoryBreakdown: async (period: string) => {
    return apiClient.get<CategoryBreakdown[]>(`/api/analytics/categories?period=${period}`);
  },

  getTrends: async (period: string) => {
    return apiClient.get<TrendData[]>(`/api/analytics/trends?period=${period}`);
  },
};

// Savings Goals API
export const savingsGoalAPI = {
  getGoals: async () => {
    return apiClient.get<SavingsGoal[]>('/api/savings-goals');
  },

  createGoal: async (goal: CreateSavingsGoalData) => {
    return apiClient.post<SavingsGoal>('/api/savings-goals', goal);
  },

  updateGoal: async (id: string, updates: Partial<SavingsGoal>) => {
    return apiClient.put<SavingsGoal>(`/api/savings-goals/${id}`, updates);
  },

  deleteGoal: async (id: string) => {
    return apiClient.delete(`/api/savings-goals/${id}`);
  },
};

// Types
export interface User {
  id: string;
  email: string;
  username: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  email: string;
  username: string;
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
