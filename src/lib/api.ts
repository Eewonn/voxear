export interface AnalysisResult {
    status: "completed" | "failed";
    result?: {
        label: "real" | "fake";
        probability: number;
        confidence: "high" | "medium" | "low";
    };
    error?: string;
}

const API_BASE_URL = "http://localhost:8000";

export async function analyzeVideo(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${API_BASE_URL}/analyze/`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: "Unknown error" }));
            throw new Error(errorData.detail || "Analysis failed");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return {
            status: "failed",
            error: error instanceof Error ? error.message : "Network error",
        };
    }
}
