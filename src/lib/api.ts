
export interface AnalysisResult {
    status: 'completed' | 'failed';
    result?: {
        label: string;
        probability: number;
        confidence: string;
        steps?: {
            id: number;
            status: 'completed' | 'skipped' | 'failed';
        }[];
    };
    error?: string;
}

export async function analyzeVideo(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8000/analyze/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                status: 'failed',
                error: errorData.detail || `Upload failed with status ${response.status}`
            };
        }

        const data = await response.json();
        return data as AnalysisResult;

    } catch (error) {
        console.error("API Error:", error);
        return {
            status: 'failed',
            error: error instanceof Error ? error.message : 'Network error occurred'
        };
    }
}
