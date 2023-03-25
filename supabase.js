import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
// Muss drin sein. Sonst gibt es einen URL Fehler, wenn man supabase an anderer Stelle importiert.
import 'react-native-url-polyfill/auto'

const supabaseUrl = "https://ytplawltiqcvsskzrxuo.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGxhd2x0aXFjdnNza3pyeHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2Njc5MDUsImV4cCI6MTk5NTI0MzkwNX0.LSD06Jm6wFtYwlma9X5gmXIGSOjStFdFrWrTz57pp_Q"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})