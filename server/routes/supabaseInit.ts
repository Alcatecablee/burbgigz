import { Router } from 'express'
import { initializeSupabaseSchema, createSampleData } from '../utils/initSupabaseSchema'

const router = Router()

// Initialize database schema endpoint
router.post('/init-schema', async (req, res) => {
  try {
    const result = await initializeSupabaseSchema()
    
    if (!result.success) {
      return res.status(500).json({ 
        error: 'Failed to initialize schema',
        details: result.error 
      })
    }
    
    res.json({ 
      message: 'Database schema initialized successfully',
      success: true 
    })
  } catch (error) {
    console.error('Schema initialization error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create sample data endpoint
router.post('/init-data', async (req, res) => {
  try {
    const result = await createSampleData()
    
    if (!result.success) {
      return res.status(500).json({ 
        error: 'Failed to create sample data',
        details: result.error 
      })
    }
    
    res.json({ 
      message: 'Sample data created successfully',
      success: true 
    })
  } catch (error) {
    console.error('Sample data creation error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router