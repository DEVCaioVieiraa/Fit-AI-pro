import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      );
    }

    // Validar se é um PDF
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'O arquivo deve ser um PDF' },
        { status: 400 }
      );
    }

    // Converter PDF para texto usando pdf-parse
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let pdfText = '';
    
    try {
      // Importar pdf-parse dinamicamente
      const pdfParse = (await import('pdf-parse')).default;
      const pdfData = await pdfParse(buffer);
      pdfText = pdfData.text;

      if (!pdfText || pdfText.trim().length === 0) {
        return NextResponse.json(
          { error: 'Não foi possível extrair texto do PDF. O arquivo pode estar vazio ou corrompido.' },
          { status: 400 }
        );
      }
    } catch (pdfError) {
      console.error('Erro ao processar PDF:', pdfError);
      return NextResponse.json(
        { 
          error: 'Erro ao ler o arquivo PDF',
          details: pdfError instanceof Error ? pdfError.message : 'Erro desconhecido ao processar PDF'
        },
        { status: 500 }
      );
    }

    // Verificar se a API key do OpenAI está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API Key do OpenAI não configurada no servidor' },
        { status: 500 }
      );
    }

    // Usar OpenAI para extrair e estruturar os dados da dieta
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um assistente especializado em nutrição. Analise o texto extraído de um PDF de dieta e estruture os dados no formato JSON especificado.

Formato esperado:
{
  "dailyCalories": número total de calorias diárias,
  "protein": gramas de proteína diárias,
  "carbs": gramas de carboidratos diários,
  "fats": gramas de gorduras diárias,
  "meals": [
    {
      "id": "meal-1",
      "name": "Nome da refeição (ex: Café da Manhã)",
      "time": "Horário (ex: 07:00)",
      "calories": número de calorias,
      "protein": gramas de proteína,
      "carbs": gramas de carboidratos,
      "fats": gramas de gorduras,
      "foods": ["lista", "de", "alimentos"]
    }
  ]
}

Se não encontrar valores específicos, faça estimativas razoáveis baseadas nos alimentos listados.
Sempre retorne um JSON válido com pelo menos uma refeição.`
          },
          {
            role: 'user',
            content: `Extraia e estruture os dados desta dieta:\n\n${pdfText}`
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3
      });

      const responseContent = completion.choices[0].message.content;
      
      if (!responseContent) {
        throw new Error('OpenAI retornou resposta vazia');
      }

      const nutritionPlan = JSON.parse(responseContent);

      // Validar estrutura básica do plano nutricional
      if (!nutritionPlan.meals || !Array.isArray(nutritionPlan.meals) || nutritionPlan.meals.length === 0) {
        throw new Error('Plano nutricional inválido: sem refeições encontradas');
      }

      return NextResponse.json({
        success: true,
        nutritionPlan
      });

    } catch (openaiError) {
      console.error('Erro ao processar com OpenAI:', openaiError);
      return NextResponse.json(
        { 
          error: 'Erro ao processar o conteúdo do PDF com IA',
          details: openaiError instanceof Error ? openaiError.message : 'Erro desconhecido ao processar com IA'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erro geral ao processar PDF:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao processar o PDF',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
