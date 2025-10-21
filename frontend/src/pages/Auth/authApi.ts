import http from '@/lib/api';

export async function fetchAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await http.post('/authorize/access_token', {
    client_id: clientId, // bd3f7f213b8980e1014c0616bc74a9217af16d2d
    client_secret: clientSecret, // 4f55873fa97ad24e33f8d85ae11fde1f6f13e0df2b023527b39533ad515320f1df54a92c5076478e06952271dae792f469259e67b5f6208e1f0932fdd0f56e23dda65e47647ab0ee15a8a3e5b00cb9d1caa2fdc89f974ef8908b68f79480f19605a0ef9247f1316b3486996a55ea06f50fdcdce314d3aba2bcd24fbd63f8a5
    grant_type: 'client_credentials',
  });
  return res.data.access_token;
}
