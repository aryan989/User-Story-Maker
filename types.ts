export interface UserStory {
  id: string;
  title: string;
  role: string;
  goal: string;
  benefit: string;
  acceptanceCriteria: string[];
  priority: 'High' | 'Medium' | 'Low';
  estimationPoints?: number;
}

export interface BRDData {
  title: string;
  executiveSummary: string;
  scope: {
    inScope: string[];
    outOfScope: string[];
  };
  functionalRequirements: {
    id: string;
    description: string;
    priority: string;
  }[];
  nonFunctionalRequirements: string[];
  risksAndMitigation: {
    risk: string;
    mitigation: string;
  }[];
}

export interface AppState {
  problemStatement: string;
  solutionProposed: string;
  isLoading: boolean;
  activeTab: 'input' | 'stories' | 'brd';
  generatedStories: UserStory[];
  generatedBRD: BRDData | null;
  error: string | null;
}

export enum GeneratorType {
  STORIES = 'STORIES',
  BRD = 'BRD'
}