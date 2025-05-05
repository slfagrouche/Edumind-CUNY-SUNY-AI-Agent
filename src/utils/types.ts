export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  agentType?: string;
  sources?: any;
}

export interface AIResponse {
  response: string;
  agent_type: string;
  sources?: {
    knowledge_base?: Array<{
      metadata: {
        source: string;
        page?: number;
        [key: string]: any;
      };
      [key: string]: any;
    }>;
    search?: Array<{
      title?: string;
      url?: string;
      [key: string]: any;
    }>;
    professor_db?: {
      professor_info?: {
        name?: string;
        department?: string;
        rating?: number | string;
        office_hours?: string;
        expertise?: string;
        courses?: string[];
        [key: string]: any;
      };
      [key: string]: any;
    };
    [key: string]: any;
  };
}