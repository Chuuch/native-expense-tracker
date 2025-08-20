import { Database } from './database.types'
import { supabase } from './supabase'

type Expense = Database['public']['Tables']['expenses']['Row']
type Category = Database['public']['Tables']['categories']['Row']
type Budget = Database['public']['Tables']['budgets']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

// Expense functions
export const getExpenses = async (userId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select(`
      *,
      categories (
        name,
        icon,
        color
      )
    `)
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) throw error
  return data
}

export const addExpense = async (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert(expense)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateExpense = async (id: string, updates: Partial<Expense>) => {
  const { data, error } = await supabase
    .from('expenses')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteExpense = async (id: string) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Category functions
export const getCategories = async (userId: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('name')

  if (error) throw error
  return data
}

export const addCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateCategory = async (id: string, updates: Partial<Category>) => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteCategory = async (id: string) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Budget functions
export const getBudgets = async (userId: string) => {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const addBudget = async (budget: Omit<Budget, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('budgets')
    .insert(budget)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateBudget = async (id: string, updates: Partial<Budget>) => {
  const { data, error } = await supabase
    .from('budgets')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteBudget = async (id: string) => {
  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Profile functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Analytics functions
export const getExpensesByCategory = async (userId: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select(`
      amount,
      categories (
        name,
        color
      )
    `)
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)

  if (error) throw error
  return data
}

export const getMonthlyExpenses = async (userId: string, year: number) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('amount, date')
    .eq('user_id', userId)
    .gte('date', `${year}-01-01`)
    .lte('date', `${year}-12-31`)

  if (error) throw error
  return data
}

export const getTotalExpenses = async (userId: string, startDate?: string, endDate?: string) => {
  let query = supabase
    .from('expenses')
    .select('amount')
    .eq('user_id', userId)

  if (startDate) {
    query = query.gte('date', startDate)
  }
  if (endDate) {
    query = query.lte('date', endDate)
  }

  const { data, error } = await query

  if (error) throw error
  
  const total = data?.reduce((sum, expense) => sum + expense.amount, 0) || 0
  return total
}

export const getTotalIncome = async (userId: string, startDate?: string, endDate?: string) => {
  let query = supabase
    .from('expenses')
    .select('amount')
    .eq('user_id', userId)
    .gt('amount', 0) // Only positive amounts (income)

  if (startDate) {
    query = query.gte('date', startDate)
  }
  if (endDate) {
    query = query.lte('date', endDate)
  }

  const { data, error } = await query

  if (error) throw error
  
  const total = data?.reduce((sum, expense) => sum + expense.amount, 0) || 0
  return total
}
