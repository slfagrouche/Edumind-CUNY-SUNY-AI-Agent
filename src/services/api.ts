import { AIResponse } from '../utils/types';

const API_BASE_URL = 'https://slfagrouche-ai-suny-agent.hf.space';

/**
 * Query the AI Assistant with a general question
 */
export async function queryAIAssistant(question: string, userId: string | null = 'anonymous'): Promise<AIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        query: question,
        user_id: userId
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error querying AI Assistant:', error);
    throw error;
  }
}

/**
 * Query for professor-specific information
 */
export async function queryProfessor(
  firstName: string,
  lastName: string,
  collegeName: string,
  question: string,
  userId: string | null = 'anonymous'
): Promise<AIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/professor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        college_name: collegeName,
        question: question,
        user_id: userId
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in professor query:', error);
    throw error;
  }
}