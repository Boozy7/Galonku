<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class GeminiService
{
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key', '');
        $this->model = config('services.gemini.model', 'gemini-1.5-flash');
    }

    /**
     * Send a generation prompt to Google Gemini API securely from backend.
     *
     * @param string $prompt
     * @param string|null $systemInstruction
     * @return string
     * @throws RuntimeException
     */
    public function generateText(string $prompt, ?string $systemInstruction = null): string
    {
        if (empty($this->apiKey)) {
            Log::warning('GEMINI_API_KEY is not configured in environment.');
            return 'Fitur AI belum dikonfigurasi. Silakan tambahkan GEMINI_API_KEY pada environment server.';
        }

        $endpoint = "{$this->baseUrl}/{$this->model}:generateContent?key={$this->apiKey}";

        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'maxOutputTokens' => 1024,
            ]
        ];

        if ($systemInstruction) {
            $payload['systemInstruction'] = [
                'parts' => [
                    ['text' => $systemInstruction]
                ]
            ];
        }

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->timeout(30)->post($endpoint, $payload);

            if ($response->failed()) {
                Log::error('Gemini API Error: ' . $response->status() . ' - ' . $response->body());
                throw new RuntimeException('Gagal menghubungi layanan Google Gemini AI.');
            }

            $data = $response->json();
            $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (!$text) {
                return 'Tidak ada respons yang dihasilkan oleh model AI.';
            }

            return trim($text);
        } catch (\Exception $e) {
            Log::error('Gemini Service Exception: ' . $e->getMessage());
            throw new RuntimeException('Terjadi kendala saat memproses permintaan AI: ' . $e->getMessage());
        }
    }

    /**
     * AI Water Quality Advisor / Analysis for Complaints or Depot Health.
     *
     * @param string $issueType
     * @param string $description
     * @param array|null $parameters (e.g. TDS, pH, Coliform)
     * @return string
     */
    public function analyzeWaterComplaint(string $issueType, string $description, ?array $parameters = null): string
    {
        $systemInstruction = "Anda adalah Pakar Higiene Sanitasi Air Minum (Sanitarian) dari Dinas Kesehatan. "
            . "Berikan analisis singkat, ramah, dan solutif mengenai keluhan kualitas air isi ulang sesuai standar Permenkes RI. "
            . "Gunakan bahasa Indonesia yang jelas, profesional, dan mudah dipahami warga.";

        $prompt = "Jenis Keluhan: {$issueType}\nDeskripsi: {$description}\n";
        if (!empty($parameters)) {
            $prompt .= "Hasil Parameter Lab (jika ada): " . json_encode($parameters, JSON_UNESCAPED_UNICODE) . "\n";
        }
        $prompt .= "\nBerikan: 1. Penjelasan kemungkinan penyebab, 2. Risiko kesehatan bagi konsumen, 3. Langkah penanganan segera untuk depot dan konsumen.";

        return $this->generateText($prompt, $systemInstruction);
    }
}
