export type PlayNote = {
  id: string
  owner_id: string        
  user_id: string        
  name: string
  source_file_url: string
  audio_url: string
  synthesis_style: string
  voice1: string
  voice2: string
  status: string
  duration: number
  requested_at: string
  created_at: string
  original_filename?: string
} 