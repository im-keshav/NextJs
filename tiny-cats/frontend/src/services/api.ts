import type { Cat, AiRecommendData, McpTestResponse } from '../types/cat';

const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchHealthCheck(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('http://localhost:3000/');
    if (!res.ok) throw new Error('Backend un-reachable');
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Backend disconnected' };
  }
}

export async function getAllCats(): Promise<Cat[]> {
  const res = await fetch(`${API_BASE_URL}/cats`);
  if (!res.ok) throw new Error('Failed to fetch cats');
  const data = await res.json();
  return data.data || [];
}

export async function getCatById(id: string): Promise<Cat> {
  const res = await fetch(`${API_BASE_URL}/cats/${id}`);
  if (!res.ok) throw new Error('Failed to fetch cat details');
  const data = await res.json();
  return data.data;
}

export async function searchCats(query: string): Promise<Cat[]> {
  if (!query.trim()) return getAllCats();
  const res = await fetch(`${API_BASE_URL}/cats/search/all?q=${encodeURIComponent(query)}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to search cats');
  const data = await res.json();
  return data.data || [];
}

export async function recommendCats(kidsFriendly: boolean, apartmentFriendly: boolean): Promise<Cat[]> {
  const res = await fetch(`${API_BASE_URL}/cats/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kidsFriendly, apartmentFriendly }),
  });
  if (!res.ok) throw new Error('Failed to get cat recommendations');
  const data = await res.json();
  return data.data || [];
}

export async function createCat(catPayload: Omit<Cat, '_id' | 'createdAt' | 'updatedAt'>): Promise<Cat> {
  const res = await fetch(`${API_BASE_URL}/cats/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(catPayload),
  });
  if (!res.ok) throw new Error('Failed to create cat');
  const data = await res.json();
  return data.data;
}

export async function askAi(prompt: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/ai/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error('Failed to get AI response');
  const data = await res.json();
  return data.data || 'No response from AI';
}

export async function recommendByAi(kidsFriendly: boolean, apartmentFriendly: boolean): Promise<AiRecommendData> {
  const res = await fetch(`${API_BASE_URL}/ai/recommend/recommendByAi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kidsFriendly, apartmentFriendly }),
  });
  if (!res.ok) throw new Error('Failed to get AI recommendation');
  const data = await res.json();
  
  if (typeof data.data === 'string') {
    try {
      // Clean JSON formatting from Gemini if wrapped in ```json ```
      const cleanedText = data.data.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch {
      return { summary: data.data };
    }
  }
  return data.data || {};
}

export async function testMcp(kidsFriendly: boolean, apartmentFriendly: boolean): Promise<McpTestResponse> {
  const res = await fetch(`${API_BASE_URL}/mcp/test-mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kidsFriendly, apartmentFriendly }),
  });
  if (!res.ok) throw new Error('Failed to trigger MCP tool execution');
  return await res.json();
}
