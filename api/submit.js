export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Corpo da requisição vazio.' });
    }

    const {
      name,
      email,
      phone,
      company,
      role,
      sector,
      overallScore,
      maturityStage,
      lowestDimension,
      scores
    } = data;

    // Validação de campos obrigatórios
    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (name, email, company).' });
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;

    const isPlaceholder = (val) => !val || val.includes('_aqui') || val.includes('seu_id_da_base') || val.includes('sua_tabela') || val.trim() === '';

    if (!apiKey || isPlaceholder(apiKey)) {
      console.warn('Airtable API Key está ausente ou é um placeholder.');
      return res.status(200).json({
        success: true,
        mock: true,
        message: 'Lead recebido com sucesso (Modo Simulação: AIRTABLE_API_KEY não configurada).'
      });
    }

    if (isPlaceholder(baseId) || isPlaceholder(tableName)) {
      console.warn(`Airtable Base ID (${baseId}) ou Table Name (${tableName}) é um placeholder.`);
      return res.status(200).json({
        success: true,
        mock: true,
        message: 'Lead recebido com sucesso (Modo Simulação: Configure AIRTABLE_BASE_ID e AIRTABLE_TABLE_NAME no .env).'
      });
    }

    // Estrutura do payload para o Airtable
    const payload = {
      records: [
        {
          fields: {
            "Nome": name,
            "Email": email,
            "WhatsApp": phone || "",
            "Empresa": company,
            "Cargo": role || "",
            "Setor": sector || "",
            "Pontuacao Geral": Number(overallScore) || 0,
            "Estagio Maturidade": maturityStage || "",
            "Gargalo Critico": lowestDimension || "",
            "Score Estrategia": Number(scores?.revenue) || 0,
            "Score Dados": Number(scores?.data) || 0,
            "Score Operacao": Number(scores?.autonomy) || 0,
            "Score Governanca": Number(scores?.human) || 0,
            "Score Ownership": Number(scores?.governance) || 0
          }
        }
      ]
    };

    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro ao enviar dados para o Airtable:', errorText);
      return res.status(response.status).json({
        success: false,
        error: 'Erro na API do Airtable',
        details: errorText
      });
    }

    const responseData = await response.json();
    return res.status(200).json({
      success: true,
      message: 'Dados enviados para o Airtable com sucesso!',
      data: responseData
    });

  } catch (err) {
    console.error('Erro interno do servidor:', err);
    return res.status(500).json({
      success: false,
      error: 'Erro interno no servidor.',
      details: err.message
    });
  }
}
